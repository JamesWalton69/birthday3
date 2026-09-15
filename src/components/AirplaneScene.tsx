import React, { useEffect, useRef } from 'react';
import './airplane.css';

export const AirplaneScene: React.FC = () => {
  const airplaneRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!airplaneRef.current) return;
      
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      const progress = scrollHeight > 0 ? scrollY / scrollHeight : 0;
      
      const p = Math.max(0, Math.min(1, progress));
      
      // Calculate curve: snake-like path down the screen
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Keep airplane visible within margins
      const marginX = viewportWidth * 0.1;
      const availableWidth = viewportWidth - (2 * marginX);
      
      // Sine wave for X
      const rawX = Math.sin(p * Math.PI * 4); // 2 full waves
      const startX = marginX + (rawX + 1) / 2 * availableWidth; 
      
      // Y is proportional to viewport height (it visually 'moves down' slightly, 
      // but mostly stays centered vertically since it's fixed, we let the background scroll)
      // Actually, since it's fixed, let's keep it near the vertical center, moving slightly based on wave.
      const startY = viewportHeight * 0.4 + (Math.cos(p * Math.PI * 4) * 50);

      // Derivative for rotation
      const dp = 0.01;
      const nextP = Math.min(1, p + dp);
      const nextRawX = Math.sin(nextP * Math.PI * 4);
      const nextX = marginX + (nextRawX + 1) / 2 * availableWidth;
      
      const dx = nextX - startX;
      // Since it's flying 'forward' along the page, positive dY is down.
      // But fixed positioning means we are flying 'up' through the content, relative to scrolling.
      const dy = 50; // Constant forward velocity factor for the angle
      
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) - 90; // -90 because airplane emoji points Right/Up usually
      
      airplaneRef.current.style.transform = `translate3d(${startX}px, ${startY}px, 0) rotate(${angle + 90}deg)`;
    };

    const loop = () => {
      handleScroll();
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="airplane-container">
      <div className="airplane-sprite" ref={airplaneRef}>
        ✈️
        <div className="contrail"></div>
      </div>
    </div>
  );
};
