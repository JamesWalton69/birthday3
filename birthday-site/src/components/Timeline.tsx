import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { motion } from 'motion/react';
import { Sparkles, Compass, Heart, Gift, MapPin, Calendar, ChevronRight } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { useInView } from '../hooks/useInView';

export const Timeline: React.FC = () => {
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const svgPathRef = useRef<SVGPathElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (isInView && svgPathRef.current) {
      anime({
        targets: svgPathRef.current,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1800
      });
    }
  }, [isInView]);

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Sparkles': return <Sparkles size={20} />;
      case 'Compass': return <Compass size={20} />;
      case 'Heart': return <Heart size={20} />;
      case 'Gift': return <Gift size={20} />;
      default: return <Sparkles size={20} />;
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="timeline" ref={sectionRef} className="section timeline-section">
      <div className="section-header">
        <span className="eyebrow">Our Journey</span>
        <h2 className="section-title">Relationship Milestones</h2>
        <p className="section-description">
          A timeline of shared laughter, unforgettable trips, and precious moments together.
        </p>
      </div>

      <div className="timeline-wrapper">
        {/* Animated Connecting Path (Desktop SVG Line) */}
        <div className="timeline-svg-container">
          <svg viewBox="0 0 4 800" preserveAspectRatio="none" className="timeline-svg">
            <line x1="2" y1="0" x2="2" y2="800" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="2" />
            <path
              ref={svgPathRef}
              d="M 2 0 L 2 800"
              fill="none"
              stroke="url(#timeline-gradient)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#f0c040" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Milestones List */}
        <div className="timeline-list">
          {birthdayData.timeline.map((item, index) => {
            const isExpanded = expandedId === item.id;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                className={`timeline-item ${isEven ? 'left' : 'right'}`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                {/* Center Node */}
                <div className="timeline-node">
                  <div className="node-pulse"></div>
                  <div className="node-icon">{renderIcon(item.iconName)}</div>
                </div>

                {/* Content Card */}
                <div className="timeline-card-wrapper">
                  <div
                    className={`timeline-card ${isExpanded ? 'expanded' : ''}`}
                    onClick={() => toggleExpand(item.id)}
                  >
                    <div className="card-top">
                      <span className="timeline-year">{item.year}</span>
                      <span className="timeline-tag">{item.tag}</span>
                    </div>

                    <h3 className="timeline-title">{item.title}</h3>

                    <div className="timeline-meta">
                      <span className="meta-date">
                        <Calendar size={13} /> {item.date}
                      </span>
                      {item.location && (
                        <span className="meta-location">
                          <MapPin size={13} /> {item.location}
                        </span>
                      )}
                    </div>

                    <p className="timeline-desc">{item.description}</p>

                    <div className="timeline-card-footer">
                      <span className="expand-text">
                        {isExpanded ? 'Show less' : 'Read details'}
                      </span>
                      <ChevronRight
                        size={16}
                        className={`expand-arrow ${isExpanded ? 'rotated' : ''}`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
