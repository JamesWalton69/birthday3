import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Envelope, Sparkles } from 'lucide-react';
import './interactions.css';

interface LoveLetterProps {
  recipient?: string;
  sender?: string;
  message?: string;
}

/**
 * LoveLetter.tsx — Tactile Envelope Interaction
 *
 * Initial state: a closed envelope centered on screen with subtle pulse animation.
 * On tap: envelope "opens" with a CSS flip/unfold animation.
 * After open: letter content reveals line-by-line with a fade-in stagger.
 * Must feel natural and tactile on mobile touch.
 */
export const LoveLetter: React.FC<LoveLetterProps> = ({
  recipient = 'Sophia',
  sender = 'Your Friend',
  message = 'Wishing you the happiest birthday!',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenTouched, setHasBeenTouched] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTap = () => {
    if (!isOpen) {
      setHasBeenTouched(true);
      setIsOpen(true);
    }
  };

  // Letter lines for stagger reveal
  const lines = [
    `Dear ${recipient},`,
    message,
    'Every moment shared with you is a treasure.',
    'Here is to another year of joy and laughter.',
    `With love, ${sender}`,
  ];

  return (
    <div
      className="love-letter-container"
      ref={containerRef}
      onClick={handleTap}
      role="button"
      tabIndex={0}
      aria-label={isOpen ? 'Open letter' : 'Closed envelope'}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleTap();
        }
      }}
    >
      {/* Envelope wrapper — CSS flip/unfold animation via class toggle */}
      <div className={`envelope-wrapper ${isOpen ? 'is-open' : ''}`}>
        {/* Back of envelope */}
        <div className="envelope-back">
          <div className="envelope-seal">
            <Envelope size={32} color="#ec4899" />
          </div>
          <p className="envelope-hint">Tap to open</p>
        </div>

        {/* Front of envelope (flips open) */}
        <div className="envelope-front">
          <div className="envelope-flap" />
          <div className="envelope-body">
            <div className="envelope-inner">
              {isOpen && (
                <div className="letter-content">
                  {lines.map((line, index) => (
                    <motion.p
                      key={index}
                      className="letter-line"
                      initial={{ opacity: 0, y: 10 }}
                      animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.3 + index * 0.15,
                      }}
                    >
                      {line}
                    </motion.p>
                  ))}

                  {/* Decorative sparkles after reveal */}
                  {hasBeenTouched && isOpen && (
                    <motion.div
                      className="letter-sparkle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      <Sparkles size={16} color="#fbbf24" />
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pulse animation on the closed envelope */}
      {!isOpen && (
        <div className="pulse-ring" aria-hidden="true" />
      )}
    </div>
  );
};

export default LoveLetter;