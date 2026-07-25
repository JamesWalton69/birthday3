import React, { useState, useEffect } from 'react';
import { Sparkles, Music, VolumeX, Heart } from 'lucide-react';

interface NavbarProps {
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isPlayingMusic, onToggleMusic }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'gallery', 'timeline', 'letter', 'wishes'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => scrollToSection('hero')}>
          <Sparkles className="brand-icon" size={20} />
          <span className="brand-text">Sophia's Day</span>
        </div>

        <nav className="navbar-links">
          <button
            className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}
            onClick={() => scrollToSection('hero')}
          >
            Home
          </button>
          <button
            className={`nav-link ${activeSection === 'gallery' ? 'active' : ''}`}
            onClick={() => scrollToSection('gallery')}
          >
            Memories
          </button>
          <button
            className={`nav-link ${activeSection === 'timeline' ? 'active' : ''}`}
            onClick={() => scrollToSection('timeline')}
          >
            Timeline
          </button>
          <button
            className={`nav-link ${activeSection === 'letter' ? 'active' : ''}`}
            onClick={() => scrollToSection('letter')}
          >
            Letter
          </button>
          <button
            className={`nav-link ${activeSection === 'wishes' ? 'active' : ''}`}
            onClick={() => scrollToSection('wishes')}
          >
            Make a Wish
          </button>
        </nav>

        <div className="navbar-actions">
          <button
            className={`music-btn ${isPlayingMusic ? 'playing' : ''}`}
            onClick={onToggleMusic}
            title={isPlayingMusic ? 'Mute Music' : 'Play Celebration Song'}
            aria-label="Toggle music"
          >
            {isPlayingMusic ? (
              <>
                <Music size={16} className="music-icon spin" />
                <span className="sound-wave">
                  <span className="bar"></span>
                  <span className="bar"></span>
                  <span className="bar"></span>
                </span>
              </>
            ) : (
              <VolumeX size={16} className="music-icon" />
            )}
          </button>

          <button
            className="celebrate-nav-btn"
            onClick={() => scrollToSection('wishes')}
          >
            <Heart size={14} />
            <span>Celebrate</span>
          </button>
        </div>
      </div>
    </header>
  );
};
