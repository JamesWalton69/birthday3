import React, { useEffect, useRef } from 'react';
import './airplane.css';

export const SkyEnvironment: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let scrollY = window.scrollY;
    
    // Create random clouds
    const clouds = Array.from({ length: 6 }).map(() => ({
      y: Math.random() * 100,
      x: Math.random() * 100,
      size: 50 + Math.random() * 150,
      speed: 0.05 + Math.random() * 0.1,
    }));

    const updateClouds = () => {
      scrollY = window.scrollY;
      if (containerRef.current) {
        const cloudElements = containerRef.current.children;
        for (let i = 0; i < cloudElements.length; i++) {
          const cloud = clouds[i];
          const el = cloudElements[i] as HTMLElement;
          // Simple parallax relative to scroll
          const translateY = -scrollY * cloud.speed;
          el.style.transform = `translate3d(0, ${translateY}px, 0)`;
        }
      }
      animationFrameId = requestAnimationFrame(updateClouds);
    };

    updateClouds();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="sky-environment" ref={containerRef}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div 
          key={i}
          className="cloud"
          style={{
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
            width: `${50 + Math.random() * 150}px`,
            height: `${50 + Math.random() * 100}px`,
          }}
        />
      ))}
    </div>
  );
};
