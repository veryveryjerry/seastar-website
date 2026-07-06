import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pipeRef = useRef<HTMLImageElement>(null);
  const sharkRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    const pipe = pipeRef.current;
    const shark = sharkRef.current;

    if (!el || !pipe) return;

    // Title and description entrance animation
    const title = el.querySelector('h1');
    const paragraph = el.querySelector('p');

    const heroTl = gsap.timeline();
    
    if (title) {
      heroTl.fromTo(title,
        { opacity: 0, y: 55 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }
      );
    }
    
    if (paragraph) {
      heroTl.fromTo(paragraph,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
        "-=0.8"
      );
    }

    // Pipe wobble
    gsap.to(pipe, {
      x: () => Math.sin(ScrollTrigger.maxScroll(window)) * 30,
      rotation: () => Math.random() * 6 - 3,
      scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 1 }
    });

    // Shark swims up and across leftwards on scroll
    if (shark) {
      gsap.to(shark, {
        y: -600,
        x: -400,
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom top',
          scrub: 2.5
        }
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="w-full min-h-screen flex flex-col items-center justify-start relative pt-24 pb-12 border-b-2 border-navy/10 overflow-hidden">
      
      <div className="max-w-5xl z-10 px-6 text-center mt-12">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 text-navy leading-tight">
          The Last Frontier Has A <br/>
          <span className="text-orange relative inline-block mt-4">
            Transportation Problem
            <svg className="absolute -bottom-4 left-0 w-full h-4 stroke-orange fill-none" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeLinecap="round"/>
            </svg>
          </span>
        </h1>
        
        <p className="text-2xl md:text-3xl max-w-3xl mx-auto opacity-80 leading-relaxed mt-12">
          Traditional deep-ocean resource concepts rely on enormous riser pipes extending thousands of meters from the seafloor to the surface.
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center w-full relative mt-16 overflow-visible">
        
        {/* School of Fish (Left-to-Right) */}
        <div className="absolute top-[10%] w-20 h-20 pointer-events-none z-10 animate-swim-right" style={{ animationDelay: '0s' }}>
          <img draggable={false} src="/src/assets/fish.png" onError={(e) => { e.currentTarget.src = '/src/assets/fish.svg'; e.currentTarget.onerror = null; }} alt="Fish" className="w-full h-full opacity-80 animate-fish-idle mix-blend-multiply" />
        </div>
        <div className="absolute top-[15%] w-16 h-16 pointer-events-none z-10 animate-swim-right" style={{ animationDelay: '1.5s' }}>
          <img draggable={false} src="/src/assets/fish.png" onError={(e) => { e.currentTarget.src = '/src/assets/fish.svg'; e.currentTarget.onerror = null; }} alt="Fish" className="w-full h-full opacity-75 animate-fish-idle mix-blend-multiply" />
        </div>
        <div className="absolute top-[5%] w-14 h-14 pointer-events-none z-10 animate-swim-right" style={{ animationDelay: '3.2s' }}>
          <img draggable={false} src="/src/assets/fish.png" onError={(e) => { e.currentTarget.src = '/src/assets/fish.svg'; e.currentTarget.onerror = null; }} alt="Fish" className="w-full h-full opacity-70 animate-fish-idle mix-blend-multiply" />
        </div>

        {/* Slow Gliding Whale in the background */}
        <img draggable={false} src="/src/assets/whale.png" onError={(e) => { e.currentTarget.src = '/src/assets/whale.svg'; e.currentTarget.onerror = null; }} alt="Whale" className="absolute top-[15%] w-80 md:w-[500px] opacity-35 select-none z-0 object-contain animate-whale mix-blend-multiply" />

        {/* Shark swimming up and across leftwards (flipped with -scale-x-100 so it faces left/swims forward) */}
        <img 
          ref={sharkRef}
          draggable={false}
          src="/src/assets/shark.png"
          onError={(e) => { e.currentTarget.src = '/src/assets/shark.svg'; e.currentTarget.onerror = null; }}
          alt="Shark"
          className="absolute -top-10 right-[15%] w-40 h-40 md:w-56 md:h-56 opacity-80 select-none z-10 object-contain transform -scale-x-100 mix-blend-multiply"
        />

        {/* Giant Riser Pipe - Positioned ABOVE the submarine (z-30 relative) */}
        <img 
          draggable={false}
          ref={pipeRef}
          src="/src/assets/pipe.png" onError={(e) => { e.currentTarget.src = '/src/assets/pipe.svg'; e.currentTarget.onerror = null; }}
          alt="Giant Riser Pipe" 
          className="w-full h-auto object-contain object-center opacity-90 drop-shadow-2xl select-none relative z-30 mix-blend-multiply"
        />

        {/* Pulsing Jellyfish */}
        <img draggable={false} src="/src/assets/jellyfish.png" onError={(e) => { e.currentTarget.src = '/src/assets/jellyfish.svg'; e.currentTarget.onerror = null; }} alt="Jellyfish" className="absolute -bottom-10 left-[45%] w-28 h-28 md:w-36 md:h-36 opacity-75 animate-jellyfish select-none z-10 object-contain mix-blend-multiply" />

        {/* Small Fish swimming Right-to-Left */}
        <div className="absolute bottom-[20%] w-16 h-16 pointer-events-none z-10 animate-swim-left">
          <img draggable={false} src="/src/assets/fish.png" onError={(e) => { e.currentTarget.src = '/src/assets/fish.svg'; e.currentTarget.onerror = null; }} alt="Small Fish" className="w-full h-full opacity-60 animate-fish-idle mix-blend-multiply" />
        </div>
        
      </div>

    </section>
  );
};
export default HeroSection;
