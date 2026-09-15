import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { Timeline } from './components/Timeline';
import { TactileLetter } from './components/TactileLetter';
import { Closing } from './components/Closing';
import { CakeReveal } from './components/CakeReveal';
import { AudioPlayer } from './components/AudioPlayer';
import { SkyEnvironment } from './components/SkyEnvironment';
import { AirplaneScene } from './components/AirplaneScene';
import { CelebrationEffects } from './components/CelebrationEffects';
import birthdayData from './data/birthdayData';

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
      <SkyEnvironment />
      <AirplaneScene />
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
          <CakeReveal />
        </div>
      </section>

      {/* 4. Message Scene */}
      <section className="scene" id="scene-message">
        <div className="scene-content">
          <TactileLetter />
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
          <CelebrationEffects />
          <Closing />
        </div>
      </section>

      {/* 7. Final Surprise Scene */}
      <section className="scene" id="scene-finale">
        <div className="scene-content" style={{textAlign: 'center', padding: '2rem'}}>
          <h2>{birthdayData.finalMessage || "One Last Thing..."}</h2>
          <p>Thank you for being you.</p>
        </div>
      </section>
    </div>
  );
};

export default App;
