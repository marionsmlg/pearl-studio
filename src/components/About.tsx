import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

const About: React.FC = () => {
  // Use IntersectionObserver to trigger 'emerge' animation
  const sectionsRef = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0', 'blur-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8', 'blur-sm');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const sectionClass = "grid grid-cols-1 md:grid-cols-12 gap-8 opacity-0 translate-y-8 blur-sm transition-all duration-1000 ease-physics will-change-transform";

  return (
    <div className="w-full pt-40 pb-24 px-6 sm:px-12 md:px-24 flex justify-center">
      <div className="max-w-3xl w-full flex flex-col gap-24 md:gap-32">

        {/* Opening Statement */}
        <section ref={addToRefs} className={`transition-all duration-1000 ease-physics opacity-0 translate-y-8 blur-sm`}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl leading-tight text-graphite font-normal drop-shadow-sm">
            PEARL is a digital studio focused on clarity, intention, and longevity.
          </h1>
        </section>

        {/* Story & Origin */}
        <section ref={addToRefs} className={sectionClass}>
          <div className="md:col-span-4">
            <span className="text-xs font-medium tracking-[0.2em] text-mist uppercase">Origins</span>
          </div>
          <div className="md:col-span-8 flex flex-col gap-6 text-lg text-graphite/80 font-light leading-relaxed">
            <p>
              PEARL was born when Alexis and Marion met, two complementary profiles, united by a shared obsession for detail, meaning, and execution.
            </p>
            <p>
              Alexis brings structure, vision, and delivery.<br/>
              Marion brings design sensitivity and technical precision.
            </p>
          </div>
        </section>

        {/* Shinkansen Moment */}
        <section ref={addToRefs} className={sectionClass}>
          <div className="md:col-span-4">
            <span className="text-xs font-medium tracking-[0.2em] text-mist uppercase">The Spark</span>
          </div>
          <div className="md:col-span-8 text-lg text-graphite/80 font-light leading-relaxed">
            <p>
              The idea truly took shape during a Shinkansen ride across Japan.
              Watching landscapes move with absolute precision and calm, we realized we wanted to build websites the same way: carefully engineered, yet effortless on the surface.
            </p>
          </div>
        </section>

        {/* Philosophy */}
        <section ref={addToRefs} className={sectionClass}>
          <div className="md:col-span-4">
            <span className="text-xs font-medium tracking-[0.2em] text-mist uppercase">Philosophy</span>
          </div>
          <div className="md:col-span-8 flex flex-col gap-6 text-lg text-graphite/80 font-light leading-relaxed">
            <p>
              We approach websites as crafted, living objects.
              Not as one-off deliveries, but as systems designed to grow, adapt, and mature over time.
            </p>
            <p className="text-graphite font-normal">
              We don't chase attention. We design for clarity.
            </p>
          </div>
        </section>

        {/* Process */}
        <section ref={addToRefs} className={sectionClass}>
           <div className="md:col-span-4">
            <span className="text-xs font-medium tracking-[0.2em] text-mist uppercase">Process</span>
          </div>
          <div className="md:col-span-8 flex flex-col gap-8 text-lg text-graphite/80 font-light leading-relaxed">
            <p>
              Every project starts with a conversation.
              We take the time to understand your context, your constraints, and what truly matters, beyond features or trends.
            </p>
            <p>
              We work closely, stay reactive, and keep communication human and direct.
              You're never dealing with a black box, and decisions are made together.
            </p>
            <div className="pl-6 border-l border-mist/30">
              <p className="italic text-mist">
                Most importantly, we don't see websites as finished products.
                We see them as evolving systems, something that grows with your brand, your content, and your ambitions.
              </p>
            </div>
            <p className="text-graphite font-normal">
              A launch is not an end point. It's a starting point.
            </p>
          </div>
        </section>

        {/* Client Benefit */}
        <section ref={addToRefs} className={sectionClass}>
           <div className="md:col-span-4">
             {/* Empty spacer for alignment */}
          </div>
          <div className="md:col-span-8 flex flex-col gap-6 text-lg text-graphite/80 font-light leading-relaxed">
            <p>
              This approach allows us to build websites that remain relevant over time, adapt naturally, and support long-term growth.
            </p>
            <p>
              It also means we often keep working with our clients well beyond the initial release.
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section ref={addToRefs} className={`flex justify-center pt-12 pb-12 transition-all duration-1000 ease-physics opacity-0 translate-y-8 blur-sm`}>
          <a href="/" className="group flex items-center gap-3 text-lg tracking-wide text-graphite hover:text-mist transition-colors duration-500">
            Start a project
            <ArrowUpRight strokeWidth={1.5} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-500 ease-physics" />
          </a>
        </section>

      </div>
    </div>
  );
};

export default About;
