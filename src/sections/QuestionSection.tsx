import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const QuestionSection = () => {
  const qRef = useRef<HTMLElement>(null);
  const markRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!qRef.current) return;
    
    if (markRef.current) {
      gsap.fromTo(markRef.current, 
        { opacity: 0, scale: 0.5, y: 100, rotation: -20 },
        { opacity: 1, scale: 1, y: 0, rotation: 10, duration: 1, scrollTrigger: {
            trigger: qRef.current,
            start: "top 80%",
            end: "center center",
            scrub: true
          }
        }
      );
    }

    const title = qRef.current.querySelector('h1');
    const card = qRef.current.querySelector('.question-card');

    if (title) {
      gsap.fromTo(title,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: title,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    if (card) {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  return (
    <section ref={qRef} className="w-full min-h-screen flex flex-col items-center justify-center relative p-8 border-b-2 border-navy/10 overflow-hidden">
      
      {/* Schooling background fish */}
      <div className="absolute top-[20%] w-16 h-16 pointer-events-none z-0 animate-swim-left" style={{ animationDelay: '2s' }}>
        <img draggable={false} src="/src/assets/fish.png" onError={(e) => { e.currentTarget.src = '/src/assets/fish.svg'; e.currentTarget.onerror = null; }} alt="Fish" className="w-full h-full opacity-45 animate-fish-idle mix-blend-multiply" />
      </div>
      <div className="absolute top-[25%] w-12 h-12 pointer-events-none z-0 animate-swim-left" style={{ animationDelay: '3.5s' }}>
        <img draggable={false} src="/src/assets/fish.png" onError={(e) => { e.currentTarget.src = '/src/assets/fish.svg'; e.currentTarget.onerror = null; }} alt="Fish" className="w-full h-full opacity-40 animate-fish-idle mix-blend-multiply" />
      </div>

      {/* Pulsing background jellyfish */}
      <img draggable={false} src="/src/assets/jellyfish.png" onError={(e) => { e.currentTarget.src = '/src/assets/jellyfish.svg'; e.currentTarget.onerror = null; }} alt="Jellyfish" className="absolute top-[40%] right-[15%] w-20 h-20 md:w-28 md:h-28 opacity-40 animate-jellyfish select-none z-0 object-contain mix-blend-multiply" />
      <img draggable={false} src="/src/assets/jellyfish.png" onError={(e) => { e.currentTarget.src = '/src/assets/jellyfish.svg'; e.currentTarget.onerror = null; }} alt="Jellyfish" className="absolute bottom-[20%] left-[10%] w-24 h-24 md:w-32 md:h-32 opacity-35 animate-jellyfish select-none z-0 object-contain mix-blend-multiply" style={{ animationDelay: '1.5s' }} />

      <div className="max-w-4xl z-10 text-center flex flex-col items-center">
        <img draggable={false} ref={markRef} src="/src/assets/question_mark.png" onError={(e) => { e.currentTarget.src = '/src/assets/question_mark.svg'; e.currentTarget.onerror = null; }} alt="Question" className="w-48 h-48 md:w-64 md:h-64 mb-12 opacity-95 select-none mix-blend-multiply" />
        <h1 className="text-5xl md:text-7xl font-bold mb-8 text-navy leading-tight">
          What If We Removed The Pipe?
        </h1>
        <div className="question-card bg-white/40 backdrop-blur-md p-8 rounded-2xl border-2 border-navy/10 shadow-lg inline-block mt-4">
          <p className="text-2xl md:text-3xl max-w-2xl opacity-90 leading-relaxed text-cyan font-bold">
            What if deep-ocean transport could happen without continuous infrastructure connecting the seafloor to the surface?
          </p>
        </div>
      </div>
    </section>
  );
};
export default QuestionSection;
