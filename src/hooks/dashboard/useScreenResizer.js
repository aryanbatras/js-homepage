import { useState, useEffect } from "react";
import styles from "../../pages/dashboard/index.module.sass";

export function useScreenResizer() {
 const [screenResizer, setScreenResizer] = useState(30);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      const container = document.querySelector(`.${styles.container}`);
      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      
      const mouseX = e.clientX - containerRect.left;
      const newWidthPercent = (mouseX / containerWidth) * 100;
      
      const constrainedWidth = Math.max(0, Math.min(100, newWidthPercent));
      setScreenResizer(constrainedWidth);
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
      document.body.style.cursor = 'col-resize';
      
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