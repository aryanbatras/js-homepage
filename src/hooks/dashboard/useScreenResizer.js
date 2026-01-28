import { useState, useEffect } from "react";
import styles from "../../pages/dashboard/index.module.sass";

export function useScreenResizer(isAIChatVisible = false, aiChatWidth = 0) {
 const [screenResizer, setScreenResizer] = useState(100);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      const container = document.querySelector(`.${styles.container}`);
      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      
      const availableWidth = isAIChatVisible ? containerWidth - aiChatWidth : containerWidth;
      const mouseX = e.clientX - containerRect.left;
      const newWidthPercent = (mouseX / availableWidth) * 100;
      
      const constrainedWidth = Math.max(0, Math.min(100, newWidthPercent));
      setScreenResizer(constrainedWidth);
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      
      const touch = e.touches[0];
      const container = document.querySelector(`.${styles.container}`);
      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      
      const availableWidth = isAIChatVisible ? containerWidth - aiChatWidth : containerWidth;
      const touchX = touch.clientX - containerRect.left;
      const newWidthPercent = (touchX / availableWidth) * 100;
      
      const constrainedWidth = Math.max(0, Math.min(100, newWidthPercent));
      setScreenResizer(constrainedWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';
      
      document.addEventListener('selectstart', preventSelection);
      
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        iframe.style.pointerEvents = 'none';
      });
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
        document.removeEventListener('selectstart', preventSelection);
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
        
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
          iframe.style.pointerEvents = '';
        });
      };
    }
  }, [isDragging]);
  
  const preventSelection = (e) => {
    e.preventDefault();
    return false;
  };

  return {
    screenResizer,
    setScreenResizer,
    isDragging,
    setIsDragging,
  };
}