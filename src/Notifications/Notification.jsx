import { useState, useEffect } from 'react';

const TYPE_TO_COLORS = {
  SUCCESS: '#2ecc71',
  ERROR: '#e74c3c',
  INFO: '#3498db',
  WARNING: '#f1c40f',
};

const UPDATE_FREQ = 10;
const STEP_SIZE = UPDATE_FREQ / (2 * 1000);

const Notification = ({ type, message, startTime, removeNotification }) => {
  // 2*60*1000/10 = 12000 steps
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) {
      return;
    }

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = Math.min(prevProgress + STEP_SIZE, 1);

        if (newProgress === 1) {
          removeNotification();
        }

        return newProgress;
      });
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [removeNotification, hovered]);

  return (
    <div
      style={{
        width: '200px',
        minWidth: '200px',
        backgroundColor: 'white',
        border: `2px solid ${TYPE_TO_COLORS[type]}`,
        marginBottom: '10px',
        position: 'relative',
      }}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <div style={{ padding: '0.7em 1em' }}>{message}</div>
      <div
        style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
        onClick={removeNotification}
      >
        x
      </div>
      <div
        style={{
          width: `${progress * 100}%`,
          height: '10px',
          backgroundColor: TYPE_TO_COLORS[type],
        }}
      />
    </div>
  );
};

export default Notification