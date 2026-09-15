import React, { useState, useEffect, useRef } from 'react';
import './interactions.css';

interface Candle {
  id: number;
  blownOut: boolean;
}

/**
 * Closing.tsx — Cinematic Birthday Moment
 *
 * - Cake appears from below with a smooth entrance.
 * - Candles flicker using keyframe CSS animation.
 * - Tap a candle → it blows out with smoke effect.
 * - All candles blown → celebration moment triggers (confetti/sparkles using CSS/emoji, no heavy libraries).
 */
export const Closing: React.FC = () => {
  const [candles, setCandles] = useState<Candle[]>(() =>
    Array.from({ length: 5 }, (_, i) => ({ id: i, blownOut: false }))
  );
  const [showCelebration, setShowCelebration] = useState(false);
  const [cakeVisible, setCakeVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cake entrance animation — appears from below
  useEffect(() => {
    const timer = setTimeout(() => setCakeVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Trigger celebration when all candles are blown out
  useEffect(() => {
    const allBlown = candles.every((c) => c.blownOut);
    if (allBlown && candles.length > 0) {
      setShowCelebration(true);
    }
  }, [candles]);

  const handleCandleTap = (id: number) => {
    setCandles((prev) =>
      prev.map((c) => (c.id === id && !c.blownOut ? { ...c, blownOut: true } : c))
    );
  };

  return (
    <div className="closing-container" ref={containerRef}>
      <div className={`cake-stage ${cakeVisible ? 'cake-visible' : ''}`}>
        {/* Cake layers — appear from below */}
        <div className="cake-illustration">
          <div className="cake-layer cake-layer-bottom">
            {/* Bottom layer */}
          </div>
          <div className="cake-layer cake-layer-middle">
            {/* Middle layer */}
          </div>
          <div className="cake-layer cake-layer-top">
            {/* Top layer */}
          </div>
          <div className="cake-text">HAPPY BIRTHDAY</div>

          {/* Candles row */}
          <div className="candles-row">
            {candles.map((candle) => (
              <div
                key={candle.id}
                className={`candle-wrapper ${candle.blownOut ? 'blown-out' : ''}`}
                onClick={() => handleCandleTap(candle.id)}
                role="button"
                tabIndex={0}
                aria-label={candle.blownOut ? 'Candle blown out' : 'Blow out candle'}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && !candle.blownOut) {
                    e.preventDefault();
                    handleCandleTap(candle.id);
                  }
                }}
              >
                {/* Candle stick */}
                <div className="candle-stick" />

                {/* Flame — flicker via CSS keyframe animation */}
                <div className={`candle-flame ${candle.blownOut ? 'no-flame' : ''}`}>
                  <div className="flame" aria-hidden="true" />
                </div>

                {/* Smoke effect when blown out */}
                {candle.blownOut && (
                  <div className="candle-smoke" aria-hidden="true">
                    <div className="smoke-puff" />
                    <div className="smoke-puff smoke-puff-2" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Celebration moment — confetti / sparkles using CSS/emoji only */}
        {showCelebration && (
          <div className="celebration-overlay" aria-live="polite">
            <div className="celebration-emoji-row">
              <span className="confetti-piece">🎉</span>
              <span className="confetti-piece">🎊</span>
              <span className="confetti-piece">✨</span>
              <span className="confetti-piece">🎈</span>
              <span className="confetti-piece">🎉</span>
              <span className="confetti-piece">✨</span>
              <span className="confetti-piece">🎊</span>
              <span className="confetti-piece">🎈</span>
              <span className="confetti-piece">✨</span>
            </div>
            <p className="celebration-text">🎉 Happy Birthday! 🎉</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Closing;