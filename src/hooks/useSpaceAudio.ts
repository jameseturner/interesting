import { useEffect, useRef, useState } from 'react';

export const useSpaceAudio = (activePage: string) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initAudio = () => {
      if (audioCtxRef.current) return;
      
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.value = 0;
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Osc 1: Deep sub bass
        const osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.value = 55; 
        
        // Osc 2: Beating sub bass
        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.value = 56.5; // 1.5Hz beat frequency for an eerie, pulsing feel
        
        // Osc 3: Low mid drone (triangle for harmonics)
        const osc3 = ctx.createOscillator();
        osc3.type = 'triangle';
        osc3.frequency.value = 110;

        // Filter to muffle the sound and make it feel distant
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 200;

        osc1.connect(filter);
        osc2.connect(filter);
        
        // Lower volume for the triangle wave
        const osc3Gain = ctx.createGain();
        osc3Gain.gain.value = 0.05;
        osc3.connect(osc3Gain);
        osc3Gain.connect(filter);

        filter.connect(masterGain);

        osc1.start();
        osc2.start();
        osc3.start();

        setIsInitialized(true);
      } catch (e) {
        console.error("Web Audio API not supported", e);
      }
      
      // Remove listeners once initialized
      window.removeEventListener('click', initAudio);
      window.removeEventListener('keydown', initAudio);
      window.removeEventListener('wheel', initAudio);
      window.removeEventListener('touchstart', initAudio);
    };

    // Browsers require user interaction before playing audio
    window.addEventListener('click', initAudio);
    window.addEventListener('keydown', initAudio);
    window.addEventListener('wheel', initAudio);
    window.addEventListener('touchstart', initAudio);

    return () => {
      window.removeEventListener('click', initAudio);
      window.removeEventListener('keydown', initAudio);
      window.removeEventListener('wheel', initAudio);
      window.removeEventListener('touchstart', initAudio);
    };
  }, []);

  useEffect(() => {
    if (!audioCtxRef.current || !gainNodeRef.current) return;

    const ctx = audioCtxRef.current;
    const gain = gainNodeRef.current;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);

    if (activePage === 'home') {
      // Fade in slowly to a quiet hum
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 3); // 3 second fade in
    } else {
      // Fade out when leaving the home page
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.linearRampToValueAtTime(0, now + 1.5); // 1.5 second fade out
    }
  }, [activePage, isInitialized]);
};
