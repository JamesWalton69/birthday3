import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles, Heart, RefreshCw, Feather } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { useInView } from '../hooks/useInView';

export const LoveLetter: React.FC = () => {
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const letterBodyRef = useRef<HTMLDivElement>(null);

  const handleOpenLetter = () => {
    if (isOpen) return;
    setIsOpen(true);
    setIsTyping(true);
  };

  useEffect(() => {
    if (isOpen && isTyping && letterBodyRef.current) {
      const paragraphs = letterBodyRef.current.querySelectorAll('.letter-p');
      paragraphs.forEach((p) => (p.innerHTML = p.textContent || ''));

      anime({
        targets: letterBodyRef.current.querySelectorAll('.letter-p'),
        opacity: [0, 1],
        translateY: [15, 0],
        delay: anime.stagger(250),
        duration: 800,
        easing: 'easeOutQuad',
        complete: () => setIsTyping(false),
      });
    }
  }, [isOpen, isTyping]);

  return (
    <section id="letter" ref={sectionRef} className="section letter-section">
      <div className="section-header">
        <span className="eyebrow">A Special Note</span>
        <h2 className="section-title">The Love Letter</h2>
        <p className="section-description">
          Tap the wax seal below to unseal a heartfelt message written just for you.
        </p>
      </div>

      <div className="letter-wrapper">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Closed Envelope State */
            <motion.div
              key="envelope"
              className="envelope-container"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              exit={{ scale: 0.9, opacity: 0, translateY: -50 }}
              onClick={handleOpenLetter}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="envelope-flap"></div>
              <div className="envelope-body">
                <div className="envelope-content-preview">
                  <Mail size={48} className="envelope-icon" />
                  <p className="envelope-recipient">{birthdayData.loveLetterTitle}</p>
                  <p className="envelope-sub">Private & Confidential 💌</p>
                </div>

                {/* Wax Seal Button */}
                <div className="wax-seal" onClick={handleOpenLetter}>
                  <Heart size={24} fill="#ffffff" />
                  <span className="seal-text">OPEN</span>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Unsealed Magic Shimmer Card State */
            <motion.div
              key="opened-letter"
              className="opened-letter-card shimmer-bg"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="letter-header">
                <Feather className="letter-quill" size={24} />
                <h3 className="letter-recipient-title">{birthdayData.loveLetterTitle}</h3>
                <Sparkles size={20} className="letter-sparkle" />
              </div>

              <div ref={letterBodyRef} className="letter-body">
                {birthdayData.loveLetterContent.map((paragraph, index) => (
                  <p key={index} className="letter-p">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="letter-signature">
                <span className="signature-line"></span>
                <p className="sender-name">{birthdayData.loveLetterSender}</p>
              </div>

              <div className="letter-footer-actions">
                <button
                  className="btn-secondary replay-letter-btn"
                  onClick={() => {
                    setIsOpen(false);
                    setTimeout(() => setIsOpen(true), 300);
                  }}
                >
                  <RefreshCw size={14} />
                  <span>Re-read Message</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
