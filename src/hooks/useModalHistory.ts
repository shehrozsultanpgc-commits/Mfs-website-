import { useEffect, useRef } from 'react';

// Global counter for programmatic history.back() calls from overlay cleanup
let pendingProgrammaticBacks = 0;

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
        if (pendingProgrammaticBacks > 0) {
          pendingProgrammaticBacks--;
          return;
        }
        isClosingViaBackRef.current = true;
        onClose();
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);

        if (!isClosingViaBackRef.current && window.history.state?.isOverlay) {
          pendingProgrammaticBacks++;
          window.history.back();
        }
        isClosingViaBackRef.current = false;
      };
    }
  }, [isOpen, modalName]);
}
