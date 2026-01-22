import { useState, useEffect, useRef } from 'react';
import styles from './index.module.sass';
import { FaPlay, FaPause, FaRedo, FaTimes } from 'react-icons/fa';

export default function Timer({ isVisible, onClose }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  if (!isVisible) return null;

  return (
    <div className={styles.timerOverlay}>
      <div className={styles.timerContainer}>
        <div className={styles.timerHeader}>
          <h3 className={styles.timerTitle}>
            <span className={styles.jsKeyword}>const</span>
            <span className={styles.jsVariable}> problemTimer</span>
            <span className={styles.jsOperator}> =</span>
            <span className={styles.jsFunction}> ()</span>
            <span className={styles.jsOperator}> =&gt;</span>
          </h3>
          <button className={styles.closeButton} onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        <div className={styles.timerDisplay}>
          <div className={styles.timeValue}>
            {formatTime(time)}
          </div>
          <div className={styles.timeLabel}>
            <span className={styles.jsComment}>// milliseconds elapsed</span>
          </div>
        </div>

        <div className={styles.timerControls}>
          <button 
            className={`${styles.controlButton} ${styles.playButton}`}
            onClick={handleStartPause}
          >
            {isRunning ? <FaPause /> : <FaPlay />}
            <span>{isRunning ? 'pause()' : 'start()'}</span>
          </button>
          
          <button 
            className={`${styles.controlButton} ${styles.resetButton}`}
            onClick={handleReset}
          >
            <FaRedo />
            <span>reset()</span>
          </button>
        </div>

        <div className={styles.codePreview}>
          <div className={styles.codeLine}>
            <span className={styles.jsKeyword}>let</span>
            <span className={styles.jsVariable}> startTime</span>
            <span className={styles.jsOperator}> =</span>
            <span className={styles.jsNumber}> {Date.now()}</span>
            <span className={styles.jsPunctuation}>;</span>
          </div>
          <div className={styles.codeLine}>
            <span className={styles.jsKeyword}>let</span>
            <span className={styles.jsVariable}> elapsed</span>
            <span className={styles.jsOperator}> =</span>
            <span className={styles.jsNumber}> {formatTime(time)}</span>
            <span className={styles.jsPunctuation}>;</span>
          </div>
          <div className={styles.codeLine}>
            <span className={styles.jsKeyword}>const</span>
            <span className={styles.jsVariable}> isRunning</span>
            <span className={styles.jsOperator}> =</span>
            <span className={styles.jsBoolean}> {isRunning.toString()}</span>
            <span className={styles.jsPunctuation}>;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
