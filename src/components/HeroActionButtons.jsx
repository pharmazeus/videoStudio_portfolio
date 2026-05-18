import React from 'react';
import { Layers, Gem } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroActionButtons = () => {
  const handleScroll = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    const offset = window.innerHeight * 0.15;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-wrap justify-start items-center gap-3 md:gap-4 mt-8 w-full max-w-2xl pointer-events-auto">
      {/* See Projects - Blue-ish Silver */}
      <a
        href="#featured-work"
        onClick={(e) => handleScroll(e, 'featured-work')}
        className="group flex items-center justify-center gap-2.5 md:gap-3 w-auto px-4 py-2.5 md:px-6 md:py-3.5 rounded-[10px] border border-[#839cb5] bg-black/40 backdrop-blur-sm transition-transform duration-300 hover:scale-105 active:scale-95"
        style={{
          boxShadow: '0 0 12px rgba(131, 156, 181, 0.45), inset 0 0 12px rgba(131, 156, 181, 0.25)',
        }}
      >
        <Layers strokeWidth={1.5} className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] text-[#839cb5]" />
        <span className="text-white font-medium text-[13px] md:text-[15px] tracking-wide">
          See Projects
        </span>
      </a>

      {/* Services - Copper */}
      <Link
        to="/services"
        className="group flex items-center justify-center gap-2.5 md:gap-3 w-auto px-4 py-2.5 md:px-6 md:py-3.5 rounded-[10px] border border-[#d4865d] bg-black/40 backdrop-blur-sm transition-transform duration-300 hover:scale-105 active:scale-95"
        style={{
          boxShadow: '0 0 12px rgba(212, 134, 93, 0.45), inset 0 0 12px rgba(212, 134, 93, 0.25)',
        }}
      >
        <Gem strokeWidth={1.5} className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] text-[#d4865d]" />
        <span className="text-white font-medium text-[13px] md:text-[15px] tracking-wide">
          Services
        </span>
      </Link>
    </div>
  );
};

export default HeroActionButtons;


