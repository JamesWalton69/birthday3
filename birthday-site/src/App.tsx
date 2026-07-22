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
    const galleryEl = document.getElementById('gallery');
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-main-wrapper">
      {/* Background Synthesized Celebration Music */}
      <AudioPlayer isPlaying={isPlayingMusic} />

      {/* Floating Header Navbar */}
      <Navbar isPlayingMusic={isPlayingMusic} onToggleMusic={toggleMusic} />

      <main>
        {/* Hero Section */}
        <Hero onStartExplore={handleStartExplore} />

        {/* Memory Unwrap Gallery */}
        <Gallery />

        {/* Relationship Timeline */}
        <Timeline />

        {/* Love Letter */}
        <LoveLetter />

        {/* Grand Finale Closing & Wish Board */}
        <Closing />
      </main>
    </div>
  );
};

export default App;
