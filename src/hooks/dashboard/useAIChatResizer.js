import { useState, useEffect } from "react";
import styles from "../../pages/dashboard/index.module.sass";

export function useAIChatResizer() {
  const [aiChatWidth, setAiChatWidth] = useState(400);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      
      const container = document.querySelector(`.${styles.container}`);
      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      
      const newWidth = containerWidth - e.clientX + containerRect.left;
      const minWidth = 300;
      const maxWidth = Math.min(2000, containerWidth * 0.5);
      
      const constrainedWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
      setAiChatWidth(constrainedWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'ew-resize';
      
      document.addEventListener('selectstart', preventSelection);
      
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        iframe.style.pointerEvents = 'none';
      });
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('selectstart', preventSelection);
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
        
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
          iframe.style.pointerEvents = '';
        });
      };
    }
  }, [isResizing]);

  const preventSelection = (e) => {
    e.preventDefault();
    return false;
  };

  const startResizing = () => {
    setIsResizing(true);
  };

  return {
    aiChatWidth,
    setAiChatWidth,
    isResizing,
    startResizing,
  };
}
