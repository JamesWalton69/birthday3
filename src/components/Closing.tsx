import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Sparkles, Send, Heart, PartyPopper, CheckCircle } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { useInView } from '../hooks/useInView';

export const Closing: React.FC = () => {
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true, true, true]);
  const [wishInput, setWishInput] = useState('');
  const [wishesList, setWishesList] = useState<string[]>(birthdayData.defaultWishes);
  const [wishSubmitted, setWishSubmitted] = useState(false);

  const launchConfetti = () => {
    // Canvas confetti burst
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#38bdf8', '#f0c040', '#a855f7'],
    });

    // Side cannons for extra wow factor
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 250);
  };

  const blowOutCandle = (index: number) => {
    setCandlesLit((prev) => {
      const next = [...prev];
      next[index] = false;

      // If all candles blown out, celebrate!
      if (next.every((lit) => !lit)) {
        launchConfetti();
      }
      return next;
    });
  };

  const relightCandles = () => {
    setCandlesLit([true, true, true, true, true]);
  };

  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishInput.trim()) return;

    setWishesList((prev) => [`✨ ${wishInput.trim()}`, ...prev]);
    setWishInput('');
    setWishSubmitted(true);
    launchConfetti();

    setTimeout(() => setWishSubmitted(false), 3000);
  };

  const allBlownOut = candlesLit.every((lit) => !lit);

  return (
    <section id="wishes" ref={sectionRef} className="section closing-section">
      <div className="section-header">
        <span className="eyebrow">Grand Finale</span>
        <h2 className="section-title">Make a Wish & Celebrate!</h2>
        <p className="section-description">
          Tap each candle to blow it out and send your birthday wishes into the universe!
        </p>
      </div>

      <div className="closing-grid">
        {/* Interactive Cake Container */}
        <motion.div
          className="cake-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="cake-instructions">
            {allBlownOut ? (
              <span className="instructions-tag success">
                🎉 All wishes made! Happy Birthday!
              </span>
            ) : (
              <span className="instructions-tag">
                🔥 Tap each flame to blow out the candles!
              </span>
            )}
          </div>

          <div className="cake-illustration">
            {/* Candles Row */}
            <div className="candles-row">
              {candlesLit.map((isLit, idx) => (
                <div
                  key={idx}
                  className={`candle ${isLit ? 'lit' : 'extinguished'}`}
                  onClick={() => blowOutCandle(idx)}
                >
                  <div className="candle-wick"></div>
                  {isLit ? (
                    <motion.div
                      className="flame"
                      animate={{
                        scale: [1, 1.15, 0.95, 1],
                        rotate: [-2, 3, -1, 0],
                      }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Flame size={18} />
                    </motion.div>
                  ) : (
                    <div className="smoke"></div>
                  )}
                  <div className="candle-stick"></div>
                </div>
              ))}
            </div>

            {/* Cake Layers */}
            <div className="cake-body">
              <div className="cake-frosting-top"></div>
              <div className="cake-layer layer-top">
                <div className="layer-decorations">
                  <span>🌸</span>
                  <span>✨</span>
                  <span>🌸</span>
                  <span>✨</span>
                  <span>🌸</span>
                </div>
              </div>
              <div className="cake-layer layer-bottom">
                <div className="cake-text">HAPPY BIRTHDAY SOPHIA</div>
              </div>
              <div className="cake-stand"></div>
            </div>
          </div>

          <div className="cake-actions">
            {allBlownOut ? (
              <button className="btn-secondary relight-btn" onClick={relightCandles}>
                Relight Candles 🔥
              </button>
            ) : null}

            <button className="btn-primary celebrate-btn" onClick={launchConfetti}>
              <PartyPopper size={18} />
              <span>Launch Confetti! 🎉</span>
            </button>
          </div>
        </motion.div>

        {/* Wish Wall & Input Box */}
        <motion.div
          className="wishes-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="wishes-header">
            <Heart size={20} className="wish-icon" />
            <h3>Birthday Wish Board</h3>
          </div>

          <form onSubmit={handleWishSubmit} className="wish-form">
            <div className="input-group">
              <input
                type="text"
                value={wishInput}
                onChange={(e) => setWishInput(e.target.value)}
                placeholder="Write your warm wish here..."
                maxLength={120}
              />
              <button type="submit" className="wish-submit-btn" disabled={!wishInput.trim()}>
                <Send size={16} />
              </button>
            </div>
            {wishSubmitted && (
              <p className="wish-success-msg">
                <CheckCircle size={14} /> Wish added to the board & confetti launched!
              </p>
            )}
          </form>

          <div className="wishes-scroll-list">
            <AnimatePresence>
              {wishesList.map((wish, idx) => (
                <motion.div
                  key={idx}
                  className="wish-item-card"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{wish}</p>
                  <Sparkles size={14} className="wish-item-sparkle" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <footer className="birthday-footer">
        <p>Made with ❤️ for Sophia's Special Day</p>
        <span className="footer-copyright">Forever celebrating extraordinary moments • 2026</span>
      </footer>
    </section>
  );
};
