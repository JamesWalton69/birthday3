import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Heart, Sparkles, CheckCircle } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

/**
 * CakeReveal.tsx
 * 
 * An elegant animated cake component with candles that appear and glow smoothly.
 * 
 * Features:
 * - Cake appears with gradual layering effect
 * - Candles appear one by one with smooth animations
 * - Each candle can be clicked to blow out (smoke effect)
 * - Heart celebration when all candles are blown out
 * - Smooth color transitions and glow effects
 * - GPU-friendly animations using CSS transforms
 */

interface CakeRevealProps {
  /** Number of candles to display */
  candleCount?: number;
  /** Theme color for the cake */
  themeColor?: 'rose' | 'gold' | 'blue';
  /** Optional custom className */
  className?: string;
  /** Callback when all candles are blown out */
  onAllCandlesOut?: () => void;
}

/**
 * CakeReveal - Interactive cake with animated candles
 * 
 * State machine:
 * - 'waiting': Initial state, cake appears
 * - 'candle_revealing': Candles are appearing
 * - 'ready': All candles visible, clickable
 * - 'celebrating': All candles blown out, celebration active
 */
export const CakeReveal: React.FC<CakeRevealProps> = ({
  candleCount = 5,
  themeColor = 'rose',
  className,
  onAllCandlesOut,
}) => {
  const [state, setState] = useState<'waiting' | 'candle_revealing' | 'ready' | 'celebrating'>('waiting');
  const [blownOutCandles, setBlownOutCandles] = useState<Set<number>>(new Set());
  const [wishes, setWishes] = useState<string[]>(birthdayData.defaultWishes || []);
  const [newWish, setNewWish] = useState('');

  // Theme color configuration
  const themeConfig = {
    rose: {
      primary: '#f43f5e',
      secondary: '#be123c',
      accent: '#ec4899',
      glow: 'rgba(244, 63, 94, 0.6)',
    },
    gold: {
      primary: '#f0c040',
      secondary: '#fbbf24',
      accent: '#ffd700',
      glow: 'rgba(240, 192, 64, 0.6)',
    },
    blue: {
      primary: '#38bdf8',
      secondary: '#0ea5e9',
      accent: '#38bdf8',
      glow: 'rgba(56, 189, 248, 0.6)',
    },
  };

  const colors = themeConfig[themeColor];

  // Auto-animate candles appearance
  useEffect(() => {
    if (state === 'waiting') {
      const timer = setTimeout(() => {
        setState('candle_revealing');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [state]);

  // Trigger celebration when all candles are out
  useEffect(() => {
    if (blownOutCandles.size === candleCount && state !== 'celebrating') {
      setState('celebrating');
      onAllCandlesOut?.();
    }
  }, [blownOutCandles, candleCount, state, onAllCandlesOut]);

  const handleBlowOut = (index: number) => {
    if (state === 'ready' && !blownOutCandles.has(index)) {
      setBlownOutCandles(prev => new Set(prev).add(index));
    }
  };

  // Generate sparkles around the cake
  const generateSparkles = () => {
    const sparkles = [];
    for (let i = 0; i < 20; i++) {
      sparkles.push(
        <motion.div
          key={i}
          className="cake-sparkle"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
          transition={{ duration: 2 + Math.random() * 2, delay: Math.random() * 3 }}
          style={
            {
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }
          }
        >
          <Sparkles size={Math.random() * 12 + 8} color={colors.accent} />
        </motion.div>
      );
    }
    return sparkles;
  };

  return (
    <section
      className={`closing-section ${className || ''}`}
      style={{ minHeight: 'auto' }}
    >
      <div className="closing-grid">
        {/* Cake Card */}
        <div className="cake-card">
          <div className="instructions-tag">{state === 'celebrating' ? '🎉 All Lit!' : '🎂 Blow Out Candles'}</div>

          <div className="cake-illustration">
            {/* Animated cake container */}
            <motion.div
              className="cake-body"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {/* Cake layers with animation delays */}
              <motion.div
                className="cake-layer layer-top"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              />

              <motion.div
                className="cake-layer layer-bottom"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              />

              <div className="cake-text">HAPPY BIRTHDAY</div>
              <div className="cake-stand">🍰</div>

              {/* Candles container */}
              <div className="candles-row">
                <AnimatePresence>
                  {Array.from({ length: candleCount }).map((_, index) => {
                    const isBlownOut = blownOutCandles.has(index);
                    return (
                      <motion.div
                        key={index}
                        className="candle"
                        initial={false}
                        animate={{
                          scale: isBlownOut ? 0 : 1,
                          opacity: isBlownOut ? 0 : 1,
                          y: isBlownOut ? -60 : 0,
                          rotate: isBlownOut ? 0 : [0, -15, 15, 0],
                          transition: {
                            scale: { duration: 0.3, delay: index * 0.1 },
                            opacity: { duration: 0.3, delay: index * 0.1 },
                            y: { duration: 0.5, delay: index * 0.1, ease: 'easeIn' },
                            rotate: { duration: 0.3, delay: index * 0.1 },
                          },
                        }}
                        onClick={() => handleBlowOut(index)}
                        style={{ cursor: state === 'ready' && !isBlownOut ? 'pointer' : 'default' }}
                      >
                        {/* Candle */}
                        <motion.div
                          className="candle-stick"
                          animate={isBlownOut ? {
                            background: 'linear-gradient(180deg, #94a3b8, #64748b)',
                            transition: { duration: 0.3 },
                          } : {
                            boxShadow: isBlownOut ? 'none' : `0 0 20px ${colors.glow}`,
                            transition: { duration: 0.3 },
                          }}
                        />

                        {/* Flame */}
                        <motion.div
                          className="flame"
                          animate={isBlownOut ? {
                            opacity: 0,
                            scale: 0,
                            transition: { duration: 0.5 },
                          } : {
                            opacity: [1, 0.8, 1],
                            scale: [1, 1.1, 1],
                            transition: { duration: 2 + Math.random() * 2, repeat: Infinity },
                          }}
                        >
                          <Flame size={32} color={isBlownOut ? '#94a3b8' : colors.accent} />
                        </motion.div>

                        {/* Smoke after blow out */}
                        {isBlownOut && (
                          <AnimatePresence>
                            <motion.div
                              className="smoke"
                              initial={{ opacity: 0.8, scale: 0.5, y: 0 }}
                              animate={{ opacity: 0, scale: 2, y: -20 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 1 }}
                            />
                          </AnimatePresence>
                        )}

                        {/* Check mark when blown out */}
                        {isBlownOut && (
                          <AnimatePresence>
                            <motion.div
                              className="blow-out-check"
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0 }}
                              transition={{ duration: 0.3 }}
                              style={{ marginTop: '-8px' }}
                            >
                              <CheckCircle size={20} color="#4ade80" />
                            </motion.div>
                          </AnimatePresence>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Celebration sparkles around cake */}
              <div style={{ position: 'relative', marginTop: '2rem' }}>
                {generateSparkles()}
              </div>
            </motion.div>
          </div>

          {/* Action buttons */}
          <div className="cake-actions">
            {blownOutCandles.size > 0 && blownOutCandles.size < candleCount && (
              <motion.div
                className="blow-out-progress"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ fontSize: '0.9rem', color: '#94a3b8' }}
              >
                {blownOutCandles.size} of {candleCount} candles blown out
              </motion.div>
            )}

            {state === 'celebrating' && (
              <motion.div
                className="celebration-message"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  color: colors.accent,
                  fontWeight: '600'
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Heart size={20} fill={colors.accent} />
                </motion.div>
                <span>All candles blown! 🎉</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Wishes Card */}
        <div className="wishes-card">
          <div className="wishes-header">
            <span className="wish-icon">
              <Sparkles size={24} color="#f59e0b" />{' '}
            </span>
            <h3>Write Your Birthday Wish</h3>
          </div>

          <div className="wish-form">
            <div className="input-group">
              <input
                type="text"
                value={newWish}
                onChange={(e) => setNewWish(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newWish.trim() && (state.includes('ready') || state.includes('celebrating'))) {
                    setWishes([newWish.trim(), ...wishes]);
                    setNewWish('');
                  }
                }}
                placeholder="Make a wish or write something sweet..."
                disabled={!state.includes('ready') && !state.includes('celebrating')}
                style={{ opacity: state.includes('ready') || state.includes('celebrating') ? 1 : 0.5 }}
              />
              <button
                className="wish-submit-btn"
                onClick={() => {
                  if (newWish.trim() && (state.includes('ready') || state.includes('celebrating'))) {
                    setWishes([newWish.trim(), ...wishes]);
                    setNewWish('');
                  }
                }}
                disabled={!state.includes('ready') && !state.includes('celebrating')}
                style={{ opacity: state.includes('ready') || state.includes('celebrating') ? 1 : 0.5 }}
              >
                ✨
              </button>
            </div>

            <div className="wish-success-msg">
              {state.includes('ready') || state.includes('celebrating') ? (
                <>
                  <CheckCircle size={16} /> Ready to make wishes!
                </>
              ) : (
                'Wait for candles to appear!'
              )}
            </div>
          </div>

          <div className="wishes-scroll-list">
            {wishes.map((wish, idx) => (
              <div key={idx} className="wish-item-card">
                <span>✨ {wish}</span>
                <span className="wish-item-sparkle">
                  <Sparkles size={12} />{' '}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Default props for CakeReveal
 */
CakeReveal.defaultProps = {
  candleCount: 5,
  themeColor: 'rose',
};

/**
 * Usage example:
 * <CakeReveal
 *   candleCount={5}
 *   themeColor="rose"
 *   onAllCandlesOut={() => console.log('Celebration!')}
 * />
 */