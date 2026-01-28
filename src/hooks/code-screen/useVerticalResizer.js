import { useState, useEffect } from "react";
import styles from "../../components/dashboard/code-screen/index.module.sass";

export function useVerticalResizer() {
  const [verticalResizer, setVerticalResizer] = useState(60);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      const container = document.querySelector(`.${styles.code_screen}`);
      if (!container) return;
      
      const containerRect = container.getBoundingClientRect();
      const containerHeight = containerRect.height;
      
      const mouseY = e.clientY - containerRect.top;
      const newHeightPercent = (mouseY / containerHeight) * 100;
      
      const constrainedHeight = Math.max(0, Math.min(100, newHeightPercent));
      setVerticalResizer(constrainedHeight);
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      
      const touch = e.touches[0];
      const container = document.querySelector(`.${styles.code_screen}`);
      if (!container) return;
      
      const containerRect = container.getBoundingClientRect();
      const containerHeight = containerRect.height;
      
      const touchY = touch.clientY - containerRect.top;
      const newHeightPercent = (touchY / containerHeight) * 100;
      
      const constrainedHeight = Math.max(0, Math.min(100, newHeightPercent));
      setVerticalResizer(constrainedHeight);
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
      document.body.style.cursor = 'row-resize';
      
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
    verticalResizer,
    setVerticalResizer,
    isDragging,
    setIsDragging,
  };
}
