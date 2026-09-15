import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { Timeline } from './components/Timeline';
import { LoveLetter } from './components/LoveLetter';
import { Closing } from './components/Closing';
import { AudioPlayer } from './components/AudioPlayer';

export const App: React.FC = () => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const toggleMusic = () => {
    setIsPlayingMusic((prev) => !prev);
  };

  const handleStartExplore = () => {
    const galleryEl = document.getElementById('scene-memories');
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="journey-container">
      <AudioPlayer isPlaying={isPlayingMusic} />
      
      {/* Mobile optimized floating Navbar */}
      <Navbar isPlayingMusic={isPlayingMusic} onToggleMusic={toggleMusic} />

      {/* 1. Takeoff Scene */}
      <section className="scene" id="scene-takeoff">
        <div className="scene-content">
          <Hero onStartExplore={handleStartExplore} />
        </div>
      </section>

      {/* 2. Flying Scene (Timeline of journey) */}
      <section className="scene" id="scene-flying">
        <div className="scene-content">
          <Timeline />
        </div>
      </section>

      {/* 3. Birthday Reveal Scene */}
      <section className="scene" id="scene-birthday">
        <div className="scene-content">
          <h2>Happy Birthday!</h2>
        </div>
      </section>

      {/* 4. Message Scene */}
      <section className="scene" id="scene-message">
        <div className="scene-content">
          <LoveLetter />
        </div>
      </section>

      {/* 5. Memories Scene */}
      <section className="scene" id="scene-memories">
        <div className="scene-content">
          <Gallery />
        </div>
      </section>

      {/* 6. Celebration Scene */}
      <section className="scene" id="scene-celebration">
        <div className="scene-content">
          <Closing />
        </div>
      </section>

      {/* 7. Final Surprise Scene */}
      <section className="scene" id="scene-finale">
        <div className="scene-content">
          <h2>One Last Thing...</h2>
        </div>
      </section>
    </div>
  );
};

export default App;
