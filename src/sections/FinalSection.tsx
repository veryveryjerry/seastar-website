
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FinalSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const card = sectionRef.current.querySelector('.max-w-4xl');
    const title = sectionRef.current.querySelector('h1');
    const subtitle = sectionRef.current.querySelector('h3');
    const star = sectionRef.current.querySelector('.relative.group');
    const ctaHeader = sectionRef.current.querySelector('h2');
    const ctaLinks = sectionRef.current.querySelectorAll('a');

    if (card) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(card,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
      );

      if (title) {
        tl.fromTo(title,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.4"
        );
      }

      if (subtitle) {
        tl.fromTo(subtitle,
          { opacity: 0, y: 15 },
          { opacity: 0.9, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3"
        );
      }

      if (star) {
        tl.fromTo(star,
          { opacity: 0, scale: 0.7, rotation: -10 },
          { opacity: 0.9, scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.5)" },
          "-=0.3"
        );
      }

      if (ctaHeader) {
        tl.fromTo(ctaHeader,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "-=0.2"
        );
      }

      if (ctaLinks.length > 0) {
        tl.fromTo(ctaLinks,
          { opacity: 0, y: 10 },
          { opacity: 0.9, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" },
          "-=0.2"
        );
      }
    }
  }, []);

  return (
    <section ref={sectionRef} className="w-full min-h-screen flex flex-col items-center justify-center relative p-8 text-navy overflow-hidden">
      
      {/* Cut-out Animals Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
         {/* Whale glides slowly across background */}
         <img draggable={false} src="/src/assets/whale.png" onError={(e) => { e.currentTarget.src = '/src/assets/whale.svg'; e.currentTarget.onerror = null; }} className="absolute top-[10%] w-64 md:w-96 opacity-30 select-none object-contain animate-whale mix-blend-multiply" />
         
         {/* Coral sitting on the bottom */}
         <img draggable={false} src="/src/assets/coral.png" onError={(e) => { e.currentTarget.src = '/src/assets/coral.svg'; e.currentTarget.onerror = null; }} className="absolute bottom-[-10%] right-[5%] w-64 md:w-96 opacity-40 select-none object-contain z-10 mix-blend-multiply" />
         
         {/* Crab scuttling near the bottom of the section */}
         <img draggable={false} src="/src/assets/crab.png" onError={(e) => { e.currentTarget.src = '/src/assets/crab.svg'; e.currentTarget.onerror = null; }} className="absolute bottom-[4%] right-[25%] w-24 md:w-36 opacity-40 select-none object-contain z-10 animate-crab mix-blend-multiply" />
         
         {/* Research Station on the seafloor */}
         <img draggable={false} src="/src/assets/research_station.png" onError={(e) => { e.currentTarget.src = '/src/assets/research_station.svg'; e.currentTarget.onerror = null; }} className="absolute bottom-[5%] left-[10%] w-56 md:w-72 opacity-30 select-none object-contain z-10 mix-blend-multiply" />
         
         {/* Fish swimming right-to-left in background */}
         <div className="absolute top-[60%] w-20 h-20 pointer-events-none z-0 animate-swim-left">
           <img draggable={false} src="/src/assets/fish.png" onError={(e) => { e.currentTarget.src = '/src/assets/fish.svg'; e.currentTarget.onerror = null; }} alt="Fish" className="w-full h-full opacity-30 animate-fish-idle mix-blend-multiply" />
         </div>
         
         {/* Jellyfish pulsing and floating */}
         <img draggable={false} src="/src/assets/jellyfish.png" onError={(e) => { e.currentTarget.src = '/src/assets/jellyfish.svg'; e.currentTarget.onerror = null; }} className="absolute top-[20%] left-[40%] w-32 md:w-40 opacity-30 select-none object-contain z-0 animate-jellyfish mix-blend-multiply" />
      </div>

      <div className="max-w-4xl z-10 text-center flex flex-col items-center bg-white/30 backdrop-blur-xl p-12 md:p-16 rounded-[3rem] border-2 border-navy/10 shadow-2xl mt-24">
        <h1 className="text-5xl md:text-8xl font-bold mb-6 text-navy">The Ocean Still Holds Questions</h1>
        <h3 className="text-3xl md:text-5xl opacity-90 mb-16 text-cyan font-bold">We're building tools to help answer them.</h3>
        
        <div className="relative group cursor-pointer mb-24">
          <img draggable={false} src="/src/assets/seastar.png" onError={(e) => { e.currentTarget.src = '/src/assets/seastar.svg'; e.currentTarget.onerror = null; }} className="w-64 h-64 md:w-80 md:h-80 opacity-90 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12 select-none drop-shadow-2xl mix-blend-multiply" />
          <div className="absolute inset-0 bg-yellow blur-[100px] opacity-30 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"></div>
        </div>

        <h2 className="text-4xl text-orange hover:text-[#CD5C5C] transition-colors mb-10 font-bold cursor-default">Join The Mission</h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-2xl font-bold opacity-90">
          <a href="#" className="hover:text-[#556B2F] transition-colors underline decoration-wavy underline-offset-8">Researchers</a>
          <a href="#" className="hover:text-[#4A3B32] transition-colors underline decoration-wavy underline-offset-8">Engineers</a>
          <a href="#" className="hover:text-[#4B0082] transition-colors underline decoration-wavy underline-offset-8">Investors</a>
          <a href="#" className="hover:text-[#000080] transition-colors underline decoration-wavy underline-offset-8">Partners</a>
        </div>
      </div>
    </section>
  );
};
export default FinalSection;
