import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

const PROJECTS = [
  {
    id: '0g',
    title: 'ZERO/GRAVITY',
    category: 'Alcohol-Free Craft. Full Impact.',
    description: 'ZERO/GRAVITY is a bold 0.0% craft beer concept built around intensity without intoxication. Instead of presenting sobriety as restriction, the brand reframes it as amplification — more clarity, more control, more presence. Each brew becomes its own immersive universe. Mango Supernova explodes in saturated warmth. Deep Forest Haze sinks into herbal greens and misty depth. Volcano Kiss radiates controlled heat. System Glitch embraces chaos. Every flavor carries its own emotional climate.',
    videoUrl: '/videos/0g.webm',
    videoLabel: 'CRAFT BEER'
  },
  {
    id: 'als',
    title: 'ALS',
    category: 'Critical Systems Online Presence.',
    description: 'For ALS (Airport & Logistics Services), a leader in maintenance and operation of automated airport, logistics, and industrial systems, we delivered a full strategic website that elevates credibility and commercial clarity. The platform presents ALS as a trusted partner in environments where uptime isn\'t optional where every system, baggage flow, and operational asset must perform without fail. The design is structured, professional, and confidence-instilling.',
    videoUrl: '/videos/ALS.webm',
    videoLabel: 'AIRPORT SYSTEMS'
  },
  {
    id: 'black-signal',
    title: 'BLACK SIGNAL',
    category: 'Precision Is Law.',
    description: 'BLACK SIGNAL is a tactical shooter concept built around pressure, clarity, and competitive integrity. In a market saturated with visual noise, this project re-centers the experience on discipline and psychological intensity. The interface feels like an operational terminal; deep blacks, subtle grid textures, minimal cyan and red accents. Typography is assertive and functional. Motion is controlled. No decorative excess. No distraction.',
    videoUrl: '/videos/Black Signal.webm',
    videoLabel: 'TACTICAL SHOOTER'
  },
  {
    id: 'vectra-labs',
    title: 'VECTRA LABS',
    category: 'Virtual Reality Engineering.',
    description: 'Vectra Labs is a VR & AR development studio concept focused on simulation, spatial computing, and applied research. The positioning shifts from passive viewing to inhabitable systems, engineered digital environments, not visual experiences. The design is grid-driven and minimal. Neutral tones are paired with sharp green system accents and precise typography. Every section feels modular, structured, and technically deliberate.',
    videoUrl: '/videos/Vectra Labs.webm',
    videoLabel: 'VR/AR STUDIO'
  },
  {
    id: 'praesio',
    title: 'PRAESIO',
    category: 'Strategic Launch Platform.',
    description: 'Praesio is a workplace experience consultancy entering a new phase of growth. As part of an incremental delivery strategy, we designed and deployed a focused single-page website to support immediate prospection efforts. The objective was clarity and momentum not excess. The page articulates positioning, value proposition, and service scope in a structured, high-trust layout built for conversion.',
    videoUrl: '/videos/Praesio.webm',
    videoLabel: 'CONSULTANCY'
  }
];

const Creations: React.FC = () => {
  return (
    <div className="w-full relative min-h-screen pt-32 pb-40 overflow-hidden">
      {/* Background decoration */}
      <div className="fixed top-32 left-6 md:left-12 z-0 opacity-40 pointer-events-none mix-blend-overlay">
        <h1 className="text-[12vw] leading-[0.8] tracking-tighter text-graphite/5 font-bold rotate-90 origin-top-left absolute top-0 left-0 blur-[2px]">
          WORK
        </h1>
      </div>

      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-12 flex flex-col gap-32 md:gap-48">
        {PROJECTS.map((project, index) => (
          <ProjectSection
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>

      {/* Footer CTA */}
      <div className="relative z-20 w-full flex justify-center mt-32">
        <a href="/" className="group flex items-center gap-4 text-xl tracking-wide text-graphite/80 hover:text-mist transition-all duration-700 hover:scale-105">
          Start a project
          <ArrowUpRight strokeWidth={1} className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-700 ease-physics" />
        </a>
      </div>
    </div>
  );
};

// Individual Project Section Component
const ProjectSection: React.FC<{ project: any; index: number }> = ({ project, index }) => {
  const isInverted = index % 2 !== 0;
  const fadeRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    // Remove all controls immediately
    if (video) {
      video.removeAttribute('controls');
      video.controls = false;
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.setAttribute('x-webkit-airplay', 'deny');
      video.setAttribute('preload', 'auto');

      // Force autoplay on load
      video.muted = true;
      video.defaultMuted = true;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Emerge: blur 10px -> 0, translate-y-12 -> 0, opacity 0 -> 1
            entry.target.classList.add('opacity-100', 'translate-y-0', 'blur-0');
            entry.target.classList.remove('opacity-0', 'translate-y-12', 'blur-sm');

            // Aggressive autoplay for Safari iOS
            if (video) {
              // Ensure video is ready
              const playWhenReady = () => {
                if (video.readyState >= 2) {
                  // HAVE_CURRENT_DATA or better
                  video.play().catch(() => {
                    // If fails, try again after brief delay
                    setTimeout(() => {
                      video.play().catch(() => {});
                    }, 50);
                  });
                } else {
                  // Wait for video to be ready
                  video.addEventListener('loadeddata', () => {
                    video.play().catch(() => {});
                  }, { once: true });
                }
              };

              playWhenReady();
            }
          } else {
            // Pause video when out of view
            if (video) {
              video.pause();
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    if (fadeRef.current) {
      observer.observe(fadeRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={fadeRef}
      className={`w-full flex flex-col gap-12 md:gap-20 transition-all duration-[1.2s] ease-physics opacity-0 translate-y-12 blur-sm will-change-transform ${
        isInverted ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      {/* --- LARGE VISUAL --- */}
      <div className="w-full md:w-[55%] lg:w-[60%] flex flex-col">
        <div
          ref={containerRef}
          className="group relative w-full overflow-hidden bg-white/40 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.03)] backdrop-blur-sm border border-white/40 rounded-[1px]"
        >
          {/* Video - Multiple sources for Safari compatibility */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            disablePictureInPicture
            disableRemotePlayback
            controlsList="nodownload nofullscreen noremoteplayback"
            className="w-full h-auto opacity-90 transition-transform duration-[2s] ease-physics group-hover:scale-105 group-hover:opacity-100"
            aria-label={`Video presentation of ${project.title}`}
            style={{ backgroundColor: '#F8F9FA' }}
          >
            {/* Safari iOS prefers MP4 */}
            <source src={project.videoUrl.replace('.webm', '.mp4')} type="video/mp4" />
            {/* WebM for modern browsers */}
            <source src={project.videoUrl} type="video/webm" />
            <p>Your browser doesn't support HTML5 video.</p>
          </video>
        </div>
      </div>

      {/* --- PROJECT DETAILS --- */}
      <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col justify-center">
        <div className={`flex flex-col gap-8 max-w-xl ${isInverted ? 'md:mr-auto' : 'md:ml-auto'}`}>

          {/* Text Content */}
          <div className="flex flex-col gap-4">
             <div className="flex items-center gap-4">
                <span className="text-xs font-medium tracking-[0.2em] text-mist uppercase">
                  {project.category}
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-graphite/10 to-transparent"></div>
             </div>

             <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-graphite tracking-tight leading-none drop-shadow-sm">
               {project.title}
             </h2>

             <p className="text-lg md:text-xl text-graphite/70 font-light leading-relaxed mt-2">
               {project.description}
             </p>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Creations;
