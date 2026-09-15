import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles, Heart } from 'lucide-react';

/**
 * TactileLetter.tsx
 * 
 * An interactive envelope component where a user taps/clicks an envelope,
 * it opens, and a personal message reveals with elegant animations.
 * 
 * Features:
 * - Click/tap envelope to open
 * - Smooth envelope opening animation
 * - Personal message revelation
 * - Floating sparkles effect
 * - Heart accent animations
 */

interface TactileLetterProps {
  /** Recipient name displayed on the envelope */
  recipient: string;
  /** Sender name displayed in the letter */
  sender: string;
  /** The personal message to reveal */
  message: string;
  /** Optional custom className */
  className?: string;
}

/**
 * TactileLetter - Interactive envelope component
 * 
 * State machine:
 * - 'closed': Initial state, envelope is sealed
 * - 'opening': Animation in progress
 * - 'open': Envelope fully open, message visible
 */
export const TactileLetter: React.FC<TactileLetterProps> = ({
  recipient,
  sender,
  message,
  className,
}) => {
  const [state, setState] = useState<'closed' | 'opening' | 'open'>('closed');
  const [showConfetti, setShowConfetti] = useState(false);

  const handleOpen = () => {
    if (state === 'closed') {
      setState('opening');
      // Trigger confetti after opening animation completes
      setTimeout(() => {
        setState('open');
        setShowConfetti(true);
      }, 800);
    }
  };

  // Confetti animation using canvas
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const confettiParticles: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    velocityY: number;
    velocityX: number;
    rotation: number;
    rotationSpeed: number;
  }> = [];

  React.useEffect(() => {
    if (showConfetti && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d')!;
      const particleCount = 50;
      const colors = ['#f43f5e', '#ec4899', '#f59e0b', '#38bdf8', '#6366f1'];

      // Initialize particles
      for (let i = 0; i < particleCount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        confettiParticles.push({
          x: canvas.width / 2,
          y: canvas.height / 2,
          width: Math.random() * 10 + 5,
          height: Math.random() * 10 + 5,
          color,
          velocityY: Math.random() * 20 + 5,
          velocityX: (Math.random() - 0.5) * 10,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 10,
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confettiParticles.forEach((particle, index) => {
          // Update position
          particle.y += particle.velocityY;
          particle.x += particle.velocityX;
          particle.rotation += particle.rotationSpeed;

          // Draw particle
          ctx.save();
          ctx.translate(particle.x, particle.y);
          ctx.rotate((particle.rotation * Math.PI) / 180);
          ctx.fillStyle = particle.color;
          ctx.fillRect(-particle.width / 2, -particle.height / 2, particle.width, particle.height);
          ctx.restore();

          // Remove particles that go off-screen
          if (particle.y > canvas.height + 100) {
            confettiParticles.splice(index, 1);
          }
        });

        // Add new particles for continuous effect
        if (confettiParticles.length < particleCount) {
          const color = colors[Math.floor(Math.random() * colors.length)];
          confettiParticles.push({
            x: canvas.width / 2,
            y: 0,
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
            color,
            velocityY: Math.random() * 20 + 5,
            velocityX: (Math.random() - 0.5) * 10,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
          });
        }

        requestAnimationFrame(animate);
      };

      animate();

      // Clean up after animation
      setTimeout(() => {
        setShowConfetti(false);
        confettiParticles.length = 0;
      }, 3000);
    }
  }, [showConfetti]);

  return (
    <section
      className={`letter-section ${className || ''}`}
      onClick={handleOpen}
      style={{ cursor: 'pointer' }}
    >
      <div className="letter-wrapper">
        {/* Envelope container */}
        <motion.div
          className="envelope-container"
          initial={{ y: 0, rotate: 0 }}
          animate={{
            y: state === 'open' ? -320 : 0,
            rotate: state === 'open' ? -20 : 0,
            transition: {
              type: 'spring',
              stiffness: 200,
              damping: 30,
              duration: state === 'closed' ? 0 : 800,
            },
          }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="envelope-content-preview">
            <div className="envelope-icon">
              <Mail size={48} color="#ec4899" />
            </div>
            <div>
              <div className="envelope-recipient">{recipient}</div>
              <div className="envelope-sub">A personal message inside</div>
            </div>
          </div>

          {/* Wax seal that animates on open */}
          <motion.div
            className="wax-seal"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div className="seal-text">SEALED</div>
          </motion.div>
        </motion.div>

        {/* Opened Letter Card */}
        {state === 'open' && (
          <AnimatePresence>
            <motion.div
              key="letter-card"
              className="opened-letter-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="letter-header">
                <span className="letter-quill">
                  <Sparkles size={12} color="#f59e0b" />{' '}
                </span>
                <span className="letter-recipient-title">{recipient}</span>
              </div>

              <div className="letter-body">
                <p className="letter-p">
                  {message}
                </p>

                <div className="letter-signature">
                  <div className="signature-line" />
                  <span className="sender-name">{sender}</span>
                </div>
              </div>

              {/* Floating sparkles around the letter */}
              <div className="letter-footer-actions">
                <button
                  className="btn-secondary"
                  onClick={() => setState('closed')}
                  style={{ marginBottom: '1rem' }}
                >
                  <Heart size={16} color="#f43f5e" /> Close Letter
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Confetti canvas when letter is open */}
        {state === 'open' && showConfetti && (
          <canvas
            ref={canvasRef}
            className="confetti-canvas"
            width={400}
            height={200}
            style={{ display: 'block', margin: '2rem auto 0' }}
            aria-hidden="true"
          />
        )}
      </div>
    </section>
  );
};

/**
 * Default props for TactileLetter
 */
TactileLetter.defaultProps = {
  recipient: 'Sophia',
  sender: 'Someone who loves you',
  message:
    'Every moment with you is a gift I treasure. From our first meeting to all the adventures ahead, my heart overflows with joy whenever I think of you. You are my today and all of my tomorrows.',
};

/**
 * Usage example:
 * <TactileLetter
 *   recipient="Sophia"
 *   sender="Your Secret Admirer"
 *   message="Your personal message here"
 * />
 */