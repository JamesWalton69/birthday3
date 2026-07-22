import React, { useEffect, useRef } from 'react';

interface AudioPlayerProps {
  isPlaying: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying }) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      // Soft melodic synth tune (Happy Birthday inspired pentatonic chords)
      const notes = [
        261.63, 261.63, 293.66, 261.63, 349.23, 329.63, // C4 C4 D4 C4 F4 E4
        261.63, 261.63, 293.66, 261.63, 392.00, 349.23, // C4 C4 D4 C4 G4 F4
        261.63, 261.63, 523.25, 440.00, 349.23, 329.63, 293.66, // C4 C4 C5 A4 F4 E4 D4
        466.16, 466.16, 440.00, 349.23, 392.00, 349.23  // Bb4 Bb4 A4 F4 G4 F4
      ];

      let noteIdx = 0;

      const playNextNote = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;

        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        const freq = notes[noteIdx];
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Soft envelope
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.55);

        noteIdx = (noteIdx + 1) % notes.length;
      };

      playNextNote();
      timerRef.current = window.setInterval(playNextNote, 600);

    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend();
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying]);

  return null;
};
