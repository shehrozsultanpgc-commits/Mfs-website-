import { useEffect, useCallback } from 'react';

const TIMEOUT_MS = 300000; // 5 minutes

export function useAdminInactivity(onTimeout: () => void) {
  const resetTimer = useCallback(() => {
    localStorage.setItem('adminLastActive', Date.now().toString());
  }, []);

  useEffect(() => {
    resetTimer();

    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    const handleActivity = () => resetTimer();

    events.forEach(event => window.addEventListener(event, handleActivity));

    const intervalId = setInterval(() => {
      const lastActive = parseInt(localStorage.getItem('adminLastActive') || '0', 10);
      if (Date.now() - lastActive >= TIMEOUT_MS) {
        onTimeout();
      }
    }, 10000); // check every 10 seconds

    return () => {
      events.forEach(event => window.removeEventListener(event, handleActivity));
      clearInterval(intervalId);
    };
  }, [onTimeout, resetTimer]);
}
