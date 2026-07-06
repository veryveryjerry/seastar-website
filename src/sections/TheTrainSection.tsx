import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TheTrainSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const card = sectionRef.current.querySelector('.max-w-4xl');
    const title = sectionRef.current.querySelector('h1');
    const paragraph = sectionRef.current.querySelector('p');

    if (card) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(card,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
      );

      if (title) {
        tl.fromTo(title,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.4"
        );
      }

      if (paragraph) {
        tl.fromTo(paragraph,
          { opacity: 0, y: 15 },
          { opacity: 0.9, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3"
        );
      }
    }
  }, []);

  return (
    <section ref={sectionRef} className="w-full relative py-32 border-b-2 border-navy/10 overflow-hidden min-h-screen flex flex-col items-center justify-center">
      
      {/* School of fish (Right-to-Left) */}
      <div className="absolute top-[20%] w-16 h-16 pointer-events-none z-0 animate-swim-left" style={{ animationDelay: '0s' }}>
        <img draggable={false} src="/src/assets/fish.png" onError={(e) => { e.currentTarget.src = '/src/assets/fish.svg'; e.currentTarget.onerror = null; }} alt="Fish" className="w-full h-full opacity-40 animate-fish-idle mix-blend-multiply" />
      </div>
      <div className="absolute top-[28%] w-12 h-12 pointer-events-none z-0 animate-swim-left" style={{ animationDelay: '1.5s' }}>
        <img draggable={false} src="/src/assets/fish.png" onError={(e) => { e.currentTarget.src = '/src/assets/fish.svg'; e.currentTarget.onerror = null; }} alt="Fish" className="w-full h-full opacity-35 animate-fish-idle mix-blend-multiply" />
      </div>

      {/* School of fish (Left-to-Right) */}
      <div className="absolute bottom-[20%] w-18 h-18 pointer-events-none z-0 animate-swim-right" style={{ animationDelay: '3s' }}>
        <img draggable={false} src="/src/assets/fish.png" onError={(e) => { e.currentTarget.src = '/src/assets/fish.svg'; e.currentTarget.onerror = null; }} alt="Fish" className="w-full h-full opacity-40 animate-fish-idle mix-blend-multiply" />
      </div>
      <div className="absolute bottom-[15%] w-14 h-14 pointer-events-none z-0 animate-swim-right" style={{ animationDelay: '4.5s' }}>
        <img draggable={false} src="/src/assets/fish.png" onError={(e) => { e.currentTarget.src = '/src/assets/fish.svg'; e.currentTarget.onerror = null; }} alt="Fish" className="w-full h-full opacity-35 animate-fish-idle mix-blend-multiply" />
      </div>

      <div className="w-full flex flex-col items-center justify-center z-10 px-6">
        <div className="max-w-4xl text-center bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border-2 border-navy/10">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-navy leading-tight">
            One Pod Is Interesting. <br/><span className="text-cyan">Thousands is a system!</span>
          </h1>
          <p className="text-2xl opacity-90">
            Multiple pods coordinate their ascent. Collectively they behave like a distributed cargo elevator.
            A transportation network built from intelligent modular components.
          </p>
        </div>
      </div>
      
    </section>
  );
};
export default TheTrainSection;
