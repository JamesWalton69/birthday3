import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { motion } from 'motion/react';
import { Sparkles, Heart, ChevronDown, Calendar, Cake } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

interface HeroProps {
  onStartExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartExplore }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [balloons, setBalloons] = useState<Array<{ id: number; left: number; delay: number; color: string }>>([]);

  useEffect(() => {
    // Generate floating balloons
    const colors = ['#f43f5e', '#ec4899', '#a855f7', '#3b82f6', '#eab308'];
    const newBalloons = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: Math.random() * 90 + 5,
      delay: Math.random() * 5,
      color: colors[i % colors.length]
    }));
    setBalloons(newBalloons);

    // Anime.js staggered text reveal
    if (titleRef.current) {
      const letters = titleRef.current.querySelectorAll('.hero-letter');
      anime.timeline({ easing: 'easeOutExpo' })
        .add({
          targets: letters,
          opacity: [0, 1],
          translateY: [40, 0],
          rotateZ: [10, 0],
          delay: anime.stagger(60, { start: 300 }),
          duration: 900
        })
        .add({
          targets: '.hero-badge',
          opacity: [0, 1],
          scale: [0.8, 1],
          duration: 600,
          easing: 'easeOutBack'
        }, '-=500')
        .add({
          targets: '.hero-subtitle',
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 700
        }, '-=400')
        .add({
          targets: '.hero-actions',
          opacity: [0, 1],
          scale: [0.95, 1],
          duration: 600
        }, '-=400');
    }
  }, []);

  const recipientName = birthdayData.recipientName;
  const nameLetters = recipientName.split('');

  return (
    <section id="hero" className="section hero-section">
      {/* Floating balloons background */}
      <div className="balloons-container">
        {balloons.map((b) => (
          <motion.div
            key={b.id}
            className="floating-balloon"
            style={{ left: `${b.left}%`, backgroundColor: b.color }}
            animate={{
              y: ['100vh', '-120vh'],
              x: [0, Math.sin(b.id) * 30, 0]
            }}
            transition={{
              duration: 18 + (b.id % 5) * 2,
              repeat: Infinity,
              delay: b.delay,
              ease: 'linear'
            }}
          >
            <div className="balloon-string"></div>
          </motion.div>
        ))}
      </div>

      {/* Decorative radial glows */}
      <div className="hero-glow hero-glow-1"></div>
      <div className="hero-glow hero-glow-2"></div>

      <div className="hero-content">
        <div className="hero-badge opacity-0">
          <Cake size={16} className="badge-icon" />
          <span>Happy Birthday, {birthdayData.nickName}!</span>
          <Sparkles size={14} className="badge-sparkle" />
        </div>

        <h1 ref={titleRef} className="hero-title" aria-label={`Happy Birthday ${recipientName}`}>
          <span className="hero-title-prefix">HAPPY BIRTHDAY</span>
          <span className="hero-name-row">
            {nameLetters.map((letter, idx) => (
              <span key={idx} className="hero-letter opacity-0">
                {letter}
              </span>
            ))}
          </span>
        </h1>

        <p className="hero-subtitle opacity-0">
          {birthdayData.subheadline}
        </p>

        <div className="hero-actions opacity-0">
          <motion.button
            className="btn-primary hero-btn"
            onClick={onStartExplore}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <Heart size={18} fill="currentColor" />
            <span>Unwrap the Magic</span>
          </motion.button>

          <div className="hero-date-tag">
            <Calendar size={15} />
            <span>{birthdayData.birthDate}</span>
          </div>
        </div>
      </div>

      <motion.div
        className="hero-scroll-indicator"
        onClick={onStartExplore}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span>Scroll down</span>
        <ChevronDown size={18} />
      </motion.div>
    </section>
  );
};
