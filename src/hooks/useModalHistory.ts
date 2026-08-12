import { useEffect, useRef } from 'react';

/**
 * Custom React hook for robust modal and popup history management across mobile and desktop.
 * Pushes an overlay state into `window.history` when the modal/popup opens.
 * If the user presses the mobile physical/gesture back button, it closes the modal cleanly
 * without navigating away or closing the web app.
 */
export function useModalHistory(
  isOpen: boolean,
  onClose: () => void,
  modalName: string = 'modalOverlay'
) {
  const isClosingViaBackRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      window.history.pushState(
        { isOverlay: true, name: modalName },
        '',
        window.location.hash || '#'
      );

      const handlePopState = () => {
        isClosingViaBackRef.current = true;
        onClose();
      };

      window.addEventListener('popstate', handlePopState, { once: true });

      return () => {
        window.removeEventListener('popstate', handlePopState);

        if (!isClosingViaBackRef.current && window.history.state?.isOverlay) {
          window.history.back();
        }
        isClosingViaBackRef.current = false;
      };
    }
  }, [isOpen, modalName]);
}
