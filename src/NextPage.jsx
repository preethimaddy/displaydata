import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const NextPage = () => {
  // Function to trigger fireworks
  const fireCrackers = () => {
    const duration = 3 * 1000; // Fireworks duration
    const end = Date.now() + duration;

    const fire = () => {
      confetti({
        particleCount: 100,
        angle: Math.random() * 360,
        spread: 70,
        origin: {
          x: Math.random(), // Random horizontal position
          y: Math.random(), // Random vertical position
        },
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(fire); // Keep triggering until duration ends
      }
    };

    fire();
  };

  // Trigger the fireworks when the component mounts
  useEffect(() => {
    fireCrackers();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1 className="animate__animated animate__bounce">
        You have successfully stored your data!
      </h1>
    </div>
  );
};

export default NextPage;