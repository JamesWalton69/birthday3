import React from 'react';
import { motion } from 'motion/react';
import { PhotoItem } from '../data/birthdayData';

interface MemoryGalleryProps {
  images: PhotoItem[];
}

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({ images }) => {
  return (
    <div className="memory-gallery-container flex-col" style={{ width: '100%', gap: '4rem', padding: '2rem 0' }}>
      <div className="gallery-header" style={{ marginBottom: '2rem' }}>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8 }}
        >
          Cherished Moments
        </motion.h2>
        <motion.p 
          className="subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Every picture tells a piece of our story...
        </motion.p>
      </div>

      <div className="memories-sequence">
        {images.map((img, index) => (
          <MemoryItem key={img.id} image={img} index={index} />
        ))}
      </div>
    </div>
  );
};

const MemoryItem: React.FC<{ image: PhotoItem; index: number }> = ({ image, index }) => {
  const isEven = index % 2 === 0;
  // A subtle rotation based on index to make them look like scattered polaroids
  const rotation = isEven ? 2 : -2;

  return (
    <motion.div
      className="memory-card glass-panel flex-col"
      initial={{ opacity: 0, y: 60, rotate: rotation - 5, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation, scale: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
      style={{
        marginBottom: '4rem',
        padding: '1rem',
        maxWidth: '100%',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        position: 'relative',
        transformOrigin: 'center center'
      }}
    >
      <div 
        className="memory-image-container"
        style={{
          width: '100%',
          overflow: 'hidden',
          borderRadius: 'var(--border-radius-sm)',
          aspectRatio: image.aspectRatio === 'square' ? '1/1' : image.aspectRatio === 'portrait' ? '3/4' : '4/3',
        }}
      >
        <motion.img 
          src={image.url} 
          alt={image.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        />
      </div>
      
      <div className="memory-info flex-col" style={{ gap: '0.5rem', marginTop: '1rem', textAlign: isEven ? 'left' : 'right' }}>
        <div className="memory-date" style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          {image.date}
        </div>
        <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{image.title}</h3>
        <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{image.caption}</p>
      </div>
    </motion.div>
  );
};
