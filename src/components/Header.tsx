import React, { useState, useEffect } from 'react';

interface HeaderProps {
  currentPath: string;
}

const Header: React.FC<HeaderProps> = ({ currentPath }) => {
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to toggle background state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    // Check initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ease-physics ${
        scrolled
          ? 'bg-pearl/60 backdrop-blur-xl py-4 shadow-[0_4px_20px_-12px_rgba(0,0,0,0.02)] border-b border-white/20'
          : 'bg-transparent py-8 border-b border-transparent shadow-none'
      }`}
    >
      <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 flex justify-between items-center">

        {/* Logo - Left Aligned */}
        <a href="/" className="group relative z-50">
          <h1 className="text-xl font-bold tracking-[0.15em] text-graphite group-hover:opacity-70 transition-opacity duration-300 drop-shadow-sm">
            PEARL
          </h1>
        </a>

        {/* Navigation - Right Aligned */}
        <nav className="flex items-center gap-8 md:gap-12">

          <a
            href="/projects"
            className={`text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 relative group ${
              currentPath === '/projects' ? 'text-graphite' : 'text-mist hover:text-graphite'
            }`}
          >
            Work
            <span className={`absolute -bottom-2 left-0 w-full h-[1px] bg-graphite/30 transition-transform duration-300 origin-left ${currentPath === '/projects' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
          </a>

          <a
            href="/about"
            className={`text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 relative group ${
              currentPath === '/about' ? 'text-graphite' : 'text-mist hover:text-graphite'
            }`}
          >
            About
            <span className={`absolute -bottom-2 left-0 w-full h-[1px] bg-graphite/30 transition-transform duration-300 origin-left ${currentPath === '/about' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
          </a>

          {/* CTA Button - Hidden on Landing Page */}
          {currentPath !== '/' && (
            <a
              href="/"
              className="hidden sm:flex items-center justify-center px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase border border-graphite/10 bg-white/10 backdrop-blur-sm text-graphite hover:border-graphite/30 hover:bg-white/30 transition-all duration-500 ease-physics shadow-sm"
            >
              Start a project
            </a>
          )}
        </nav>

      </div>
    </header>
  );
};

export default Header;
