import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const podRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    if (podRef.current) {
      // Slight wobble on the pod as you scroll
      gsap.to(podRef.current, {
        rotation: () => Math.random() * 20 - 10,
        x: () => Math.random() * 20 - 10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }

    // Scroll-triggered animations for steps cards and text
    const cards = sectionRef.current.querySelectorAll('.step-card');
    cards.forEach((card, index) => {
      const isEven = index % 2 === 1;
      const isLast = index === cards.length - 1;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(card,
        {
          opacity: 0,
          y: 60,
          x: isLast ? 0 : (isEven ? 60 : -60),
          scale: isLast ? 0.95 : 1
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out"
        }
      );

      const elements = card.querySelectorAll('h1, h2, h3, p');
      if (elements.length > 0) {
        tl.fromTo(elements,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out"
          },
          "-=0.5"
        );
      }
    });
  }, []);

  return (
    <section ref={sectionRef} className="w-full relative border-b-2 border-navy/10 overflow-hidden">
      
      {/* Slow Gliding Whale in the background */}
      <img draggable={false} src="/src/assets/whale.png" onError={(e) => { e.currentTarget.src = '/src/assets/whale.svg'; e.currentTarget.onerror = null; }} alt="Whale" className="absolute top-[25%] w-[450px] opacity-35 select-none z-0 object-contain animate-whale mix-blend-multiply" style={{ animationDelay: '8s' }} />

      {/* School of fish (Right-to-Left) */}
      <div className="absolute top-[15%] w-16 h-16 pointer-events-none z-0 animate-swim-left" style={{ animationDelay: '5s' }}>
        <img draggable={false} src="/src/assets/fish.png" onError={(e) => { e.currentTarget.src = '/src/assets/fish.svg'; e.currentTarget.onerror = null; }} alt="Fish" className="w-full h-full opacity-35 animate-fish-idle mix-blend-multiply" />
      </div>
      <div className="absolute top-[20%] w-12 h-12 pointer-events-none z-0 animate-swim-left" style={{ animationDelay: '6.5s' }}>
        <img draggable={false} src="/src/assets/fish.png" onError={(e) => { e.currentTarget.src = '/src/assets/fish.svg'; e.currentTarget.onerror = null; }} alt="Fish" className="w-full h-full opacity-30 animate-fish-idle mix-blend-multiply" />
      </div>
      
      {/* School of fish (Left-to-Right) near bottom */}
      <div className="absolute bottom-[20%] w-14 h-14 pointer-events-none z-0 animate-swim-right" style={{ animationDelay: '3s' }}>
        <img draggable={false} src="/src/assets/fish.png" onError={(e) => { e.currentTarget.src = '/src/assets/fish.svg'; e.currentTarget.onerror = null; }} alt="Fish" className="w-full h-full opacity-40 animate-fish-idle mix-blend-multiply" />
      </div>
      
      {/* Sticky Pod Container */}
      <div className="absolute inset-0 pointer-events-none z-10 flex justify-center">
        <div className="sticky top-[50vh] w-32 h-32 md:w-48 md:h-48 -translate-y-1/2">
          <img draggable={false} ref={podRef} src="/src/assets/pod.png" onError={(e) => { e.currentTarget.src = '/src/assets/pod.svg'; e.currentTarget.onerror = null; }} alt="Ascending Pod" className="w-full h-full opacity-95 drop-shadow-xl mix-blend-multiply" />
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 relative z-20">
        
        {/* Step 1 */}
        <div className="w-full min-h-screen flex items-center justify-start md:pl-[10%]">
          <div className="step-card max-w-md bg-white/50 backdrop-blur-md p-8 rounded-2xl border-2 border-navy/10 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-navy"><span className="text-orange">STEP 1:</span> LOAD</h2>
            <h3 className="text-2xl font-bold text-orange mt-2">
              CLUNK
            </h3>
            <p className="text-xl mt-4 opacity-90">The pod is filled and prepared for launch by the mining vehicle directly on the seafloor.</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="w-full min-h-screen flex items-center justify-end md:pr-[10%]">
          <div className="step-card max-w-md bg-white/50 backdrop-blur-md p-8 rounded-2xl border-2 border-navy/10 shadow-lg text-right">
            <h2 className="text-3xl md:text-4xl font-bold text-navy"><span className="text-orange">STEP 2:</span> LAUNCH</h2>
            <p className="text-xl mt-4 opacity-90">The pod is gently ejected. No massive cables pulling it up, just an intelligent release mechanism.</p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="w-full min-h-screen flex items-center justify-start md:pl-[10%]">
          <div className="step-card max-w-md bg-white/50 backdrop-blur-md p-8 rounded-2xl border-2 border-navy/10 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-navy"><span className="text-orange">STEP 3:</span> GUIDED ESCAPE</h2>
            <p className="text-xl mt-4 opacity-90">Short-range propulsion moves the pod away from local sediment disturbance, keeping the area clear.</p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="w-full min-h-screen flex items-center justify-end md:pr-[10%]">
          <div className="step-card max-w-md bg-white/50 backdrop-blur-md p-8 rounded-2xl border-2 border-navy/10 shadow-lg text-right">
            <h2 className="text-3xl md:text-4xl font-bold text-navy"><span className="text-orange">STEP 4:</span> GUIDED ASCENT</h2>
            <p className="text-xl mt-4 opacity-90">Stored energy is converted into buoyancy. Instead of continuously fighting gravity, the system collaborates with physics.</p>
          </div>
        </div>

        {/* Step 5 */}
        <div className="w-full min-h-screen flex flex-col justify-center items-center text-center">
          <div className="step-card max-w-2xl bg-white/50 backdrop-blur-md p-12 rounded-3xl border-2 border-navy/10 shadow-2xl mt-[30vh]">
            <h2 className="text-4xl font-bold text-navy mb-4"><span className="text-orange">STEP 5:</span> FREE ASCENT</h2>
            <h1 className="text-6xl md:text-8xl font-bold text-navy mb-8">Float. Don't Fight.</h1>
            <p className="text-2xl opacity-90">The majority of the journey is powered entirely by buoyancy rather than continuous mechanical lifting.</p>
          </div>
        </div>

      </div>
    </section>
  );
};
export default HowItWorksSection;
