import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroSection from './sections/HeroSection';
import QuestionSection from './sections/QuestionSection';
import MeetStarLiftSection from './sections/MeetStarLiftSection';
import HowItWorksSection from './sections/HowItWorksSection';
import TheTrainSection from './sections/TheTrainSection';
import FinalSection from './sections/FinalSection';
import WaterRippleCursor from './sections/WaterRippleCursor';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Global Background Color Transition
    if (appRef.current) {
      gsap.to(appRef.current, {
        backgroundColor: "#B3C5E4",
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: "max",
          scrub: true
        }
      });
    }

    // Global Submarine follows scroll in a parallax curved trajectory
    if (subRef.current) {
      // Set initial position to be fully off-screen left
      gsap.set(subRef.current, { x: -600 });

      // Main trajectory mapping scroll progress to coordinates, rotation and scale
      gsap.to(subRef.current, {
        scrollTrigger: {
          trigger: appRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 2.0, // creates a lag/float feel
        },
        keyframes: [
          {
            y: () => (window.innerHeight - 180) * 0.22,
            x: 480,
            rotation: 12,
            scale: 0.82,
            duration: 1
          },
          {
            y: () => (window.innerHeight - 180) * 0.42,
            x: 580,
            rotation: 4,
            scale: 0.86,
            duration: 1
          },
          {
            y: () => (window.innerHeight - 180) * 0.62,
            x: 380,
            rotation: -8,
            scale: 0.80,
            duration: 1
          },
          {
            y: () => (window.innerHeight - 180) * 0.82,
            x: 80,
            rotation: -3,
            scale: 0.86,
            duration: 1
          },
          {
            y: () => window.innerHeight - 180,
            x: 380,
            rotation: 8,
            scale: 1.0,
            duration: 1
          }
        ],
        ease: "sine.inOut"
      });

      // Secondary floating idle animation (gentle sway and wobble)
      gsap.to(subRef.current, {
        yPercent: "+=6",
        xPercent: "+=3",
        rotation: "+=2",
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={appRef} className="w-full bg-offwhite text-navy text-xl overflow-hidden" style={{backgroundColor: '#F2EEE9'}}>
      <WaterRippleCursor />
      
      {/* Global Submarine - Moved outside main container to bypass section stacking contexts */}
      <div className="fixed top-10 -left-[150px] md:-left-[300px] w-[600px] h-[600px] md:w-[800px] md:h-[800px] z-20 pointer-events-none opacity-95 drop-shadow-2xl">
        <img ref={subRef} draggable={false} src="/src/assets/submarine.png" onError={(e) => { e.currentTarget.src = '/src/assets/submarine.svg'; e.currentTarget.onerror = null; }} alt="Explorer Submarine" className="w-full h-full object-contain mix-blend-multiply" />
      </div>

      <main className="relative flex flex-col items-center">
        {/* Company Logo */}
        <div className="absolute top-6 left-6 md:top-10 md:left-10 z-50">
          <img draggable={false} src="/src/assets/logo.png" onError={(e) => { e.currentTarget.src = '/src/assets/logo.svg'; e.currentTarget.onerror = null; }} alt="SeaStar Mining" className="w-24 md:w-40 object-contain select-none drop-shadow-lg opacity-95 mix-blend-multiply" />
        </div>

        <HeroSection />
        <QuestionSection />
        <MeetStarLiftSection />
        <HowItWorksSection />
        <TheTrainSection />
        <FinalSection />
      </main>

    </div>
  );
}

export default App;
