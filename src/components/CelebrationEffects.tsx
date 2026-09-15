import React from 'react';
import './interactions.css';

interface BalloonConfig {
  id: number;
  left: string;
  delay: number;
  duration: number;
  emoji: string;
}

interface SparkleConfig {
  id: number;
  left: string;
  top: string;
  delay: number;
  duration: number;
}

interface CelebrationEffectsProps {
  /** Maximum 12 elements total (balloons + sparkles combined) */
  balloonCount?: number;
  sparkleCount?: number;
  theme?: 'rose' | 'gold' | 'blue';
}

/**
 * CelebrationEffects.tsx
 *
 * Floating balloons and sparkle particles.
 * Max 12 elements total (CSS animation only, no JS animation loops).
 */
export const CelebrationEffects: React.FC<CelebrationEffectsProps> = ({
  balloonCount = 5,
  sparkleCount = 7,
  theme = 'rose',
}) => {
  // Total elements must not exceed 12
  const safeBalloons = Math.min(balloonCount, Math.max(0, 12 - sparkleCount));
  const safeSparkles = Math.min(sparkleCount, Math.max(0, 12 - safeBalloons));

  // Balloon emoji based on theme
  const balloonEmojis: Record<string, string[]> = {
    rose: ['🎈', '🎁', '💖', '🎀', '🌸', '🎀'],
    gold: ['⭐', '✨', '🌟', '💫', '🎀', '✨'],
    blue: ['🎈', '🌊', '💙', '🎀', '⭐', '🌊'],
  };

  const emojis = balloonEmojis[theme];

  // Generate balloon configs deterministically
  const balloons: BalloonConfig[] = Array.from({ length: safeBalloons }, (_, i) => ({
    id: i,
    left: `${10 + (i * 16) % 80}%`,
    delay: i * 0.8,
    duration: 4 + (i % 3),
    emoji: emojis[i % emojis.length],
  }));

  // Generate sparkle configs deterministically
  const sparkles: SparkleConfig[] = Array.from({ length: safeSparkles }, (_, i) => ({
    id: i,
    left: `${5 + (i * 14) % 90}%`,
    top: `${10 + (i * 12) % 80}%`,
    delay: i * 0.3,
    duration: 2 + (i % 3),
  }));

  return (
    <div className="celebration-effects" aria-hidden="true">
      {/* Floating Balloons (CSS animation only) */}
      <div className="balloons-layer">
        {balloons.map((balloon) => (
          <div
            key={balloon.id}
            className="floating-balloon"
            style={{
              left: balloon.left,
              animationDelay: `${balloon.delay}s`,
              animationDuration: `${balloon.duration}s`,
            }}
          >
            <span className="balloon-emoji">{balloon.emoji}</span>
          </div>
        ))}
      </div>

      {/* Sparkle Particles (CSS animation only) */}
      <div className="sparkles-layer">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="sparkle-particle"
            style={{
              left: sparkle.left,
              top: sparkle.top,
              animationDelay: `${sparkle.delay}s`,
              animationDuration: `${sparkle.duration}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CelebrationEffects;