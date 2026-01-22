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

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'row-resize';
      
      // Prevent text selection in all elements
      document.addEventListener('selectstart', preventSelection);
      
      // Prevent iframe interaction during drag
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
        
        // Restore iframe interaction
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
