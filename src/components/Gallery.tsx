import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, X, Sparkles, Calendar } from 'lucide-react';
import { birthdayData, PhotoItem } from '../data/birthdayData';

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});
  const [floatingHearts, setFloatingHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const categories = [
    { id: 'all', label: 'All Moments' },
    { id: 'trips', label: '✈️ Travels' },
    { id: 'everyday', label: '☕ Everyday' },
    { id: 'celebrations', label: '🎉 Parties' },
    { id: 'favorites', label: '⭐ Favorites' },
  ];

  const filteredPhotos = activeCategory === 'all'
    ? birthdayData.gallery
    : birthdayData.gallery.filter((p) => p.category === activeCategory);

  const handleLike = (e: React.MouseEvent, photoId: string) => {
    e.stopPropagation();
    setLikesMap((prev) => ({
      ...prev,
      [photoId]: (prev[photoId] || 0) + 1,
    }));

    // Trigger floating heart effect
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const newHeart = {
      id: Date.now(),
      x: rect.left + rect.width / 2,
      y: rect.top,
    };
    setFloatingHearts((prev) => [...prev, newHeart]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);
  };

  return (
    <section id="gallery" className="section gallery-section">
      {/* Floating heart feedback animations */}
      {floatingHearts.map((h) => (
        <motion.div
          key={h.id}
          className="floating-like-heart"
          style={{ left: h.x, top: h.y }}
          initial={{ opacity: 1, scale: 0.6, y: 0 }}
          animate={{ opacity: 0, scale: 1.5, y: -80 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          ❤️
        </motion.div>
      ))}

      <div className="section-header">
        <span className="eyebrow">Visual Memories</span>
        <h2 className="section-title">The Memory Unwrap Gallery</h2>
        <p className="section-description">
          A collection of snapshot moments that make every day with you unforgettable.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="gallery-tabs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`gallery-tab ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid Container */}
      <motion.div className="gallery-grid" layout>
        <AnimatePresence>
          {filteredPhotos.map((photo, index) => {
            const currentLikes = likesMap[photo.id] || 0;
            return (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`gallery-card ${photo.aspectRatio || 'square'}`}
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="card-image-wrapper">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    loading="lazy"
                    className="gallery-img"
                  />
                  <div className="card-overlay">
                    <div className="card-top-info">
                      <span className="card-date">
                        <Calendar size={12} /> {photo.date}
                      </span>
                    </div>

                    <div className="card-bottom-info">
                      <h3 className="card-title">{photo.title}</h3>
                      <p className="card-caption">{photo.caption}</p>

                      <div className="card-actions">
                        <button
                          className={`heart-btn ${currentLikes > 0 ? 'liked' : ''}`}
                          onClick={(e) => handleLike(e, photo.id)}
                          aria-label="Like photo"
                        >
                          <Heart size={16} fill={currentLikes > 0 ? '#f43f5e' : 'none'} />
                          <span>{currentLikes > 0 ? currentLikes : ''}</span>
                        </button>
                        <span className="unwrap-badge">
                          <Sparkles size={13} /> Tap to expand
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="lightbox-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="lightbox-close"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close photo"
              >
                <X size={20} />
              </button>

              <div className="lightbox-image-container">
                <img src={selectedPhoto.url} alt={selectedPhoto.title} />
              </div>

              <div className="lightbox-details">
                <div className="lightbox-header">
                  <span className="lightbox-category">{selectedPhoto.category.toUpperCase()}</span>
                  <span className="lightbox-date">{selectedPhoto.date}</span>
                </div>
                <h2>{selectedPhoto.title}</h2>
                <p>{selectedPhoto.caption}</p>

                <div className="lightbox-actions">
                  <button
                    className="btn-primary lightbox-like-btn"
                    onClick={(e) => handleLike(e, selectedPhoto.id)}
                  >
                    <Heart size={18} fill="#ffffff" />
                    <span>Send Love ({(likesMap[selectedPhoto.id] || 0)})</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
