import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MeetStarLiftSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const podRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    if (podRef.current) {
      gsap.fromTo(podRef.current, 
        { y: 200, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, scrollTrigger: { trigger: sectionRef.current, start: "top 70%", end: "center center", scrub: 1 } }
      );
    }

    const headers = sectionRef.current.querySelectorAll('h1, h2, h3');
    if (headers.length > 0) {
      gsap.fromTo(headers,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    const cardText = sectionRef.current.querySelector('.text-left p');
    if (cardText) {
      gsap.fromTo(cardText,
        { opacity: 0, y: 25 },
        {
          opacity: 0.9,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardText,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="w-full min-h-[85vh] py-16 md:py-24 flex flex-col items-center justify-center relative p-8 border-b-2 border-navy/10 overflow-hidden">
      
      {/* School of fish (Left-to-Right) */}
      <div className="absolute top-[10%] w-16 h-16 pointer-events-none z-0 animate-swim-right" style={{ animationDelay: '4s' }}>
        <img draggable={false} src="/src/assets/fish.png" onError={(e) => { e.currentTarget.src = '/src/assets/fish.svg'; e.currentTarget.onerror = null; }} alt="Fish" className="w-full h-full opacity-45 animate-fish-idle mix-blend-multiply" />
      </div>
      <div className="absolute top-[18%] w-12 h-12 pointer-events-none z-0 animate-swim-right" style={{ animationDelay: '5.5s' }}>
        <img draggable={false} src="/src/assets/fish.png" onError={(e) => { e.currentTarget.src = '/src/assets/fish.svg'; e.currentTarget.onerror = null; }} alt="Fish" className="w-full h-full opacity-35 animate-fish-idle mix-blend-multiply" />
      </div>
      <div className="absolute top-[5%] w-14 h-14 pointer-events-none z-0 animate-swim-right" style={{ animationDelay: '7s' }}>
        <img draggable={false} src="/src/assets/fish.png" onError={(e) => { e.currentTarget.src = '/src/assets/fish.svg'; e.currentTarget.onerror = null; }} alt="Fish" className="w-full h-full opacity-30 animate-fish-idle mix-blend-multiply" />
      </div>

      {/* School of fish (Right-to-Left) */}
      <div className="absolute bottom-[10%] w-14 h-14 pointer-events-none z-0 animate-swim-left" style={{ animationDelay: '1s' }}>
        <img draggable={false} src="/src/assets/fish.png" onError={(e) => { e.currentTarget.src = '/src/assets/fish.svg'; e.currentTarget.onerror = null; }} alt="Fish" className="w-full h-full opacity-40 animate-fish-idle mix-blend-multiply" />
      </div>

      <div className="max-w-5xl z-10 text-center flex flex-col items-center w-full">
        <h2 className="text-xl md:text-2xl text-orange font-bold uppercase tracking-widest mb-3">The Idea</h2>
        <h1 className="text-6xl md:text-8xl font-bold mb-3 text-navy">Meet StarLift™</h1>
        <h3 className="text-3xl md:text-4xl opacity-70 mb-10">A Deep Ocean Cargo Elevator.</h3>
        
        <div className="relative w-full max-w-3xl flex flex-col md:flex-row items-center justify-center bg-white/40 backdrop-blur-md p-6 md:p-10 rounded-3xl border-2 border-navy/10 shadow-2xl gap-8 md:gap-10">
          <img draggable={false} ref={podRef} src="/src/assets/pod.png" onError={(e) => { e.currentTarget.src = '/src/assets/pod.svg'; e.currentTarget.onerror = null; }} alt="StarLift Pod" className="w-48 h-48 md:w-60 md:h-60 opacity-95 animate-[pulse_4s_infinite] select-none mix-blend-multiply" />
          
          <div className="text-left flex-1">
            <p className="text-2xl opacity-90 leading-relaxed">
              StarLift replaces giant riser pipes with autonomous cargo pods. Each pod independently transports material from the deep ocean using buoyancy, navigation systems, and intelligent control.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MeetStarLiftSection;
