'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Hero() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Animate molecule nodes
    const nodes = svgRef.current?.querySelectorAll('.mol-node');
    nodes?.forEach((node, i) => {
      (node as HTMLElement).style.animationDelay = `${i * 0.3}s`;
    });
  }, []);

  const scrollToCatalog = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian-900">
      {/* Animated molecule background */}
      <div className="absolute inset-0 pointer-events-none">
        <MoleculeBackground />
      </div>

      {/* Radial glow center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-gold-500/[0.03] blur-3xl" />
      </div>

      {/* Grid lines subtle */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">
        {/* Logo */}
        <div className="flex justify-center mb-10 animate-float">
          <div className="relative w-40 h-40 md:w-52 md:h-52">
            <Image
              src="/logo-transparent.png"
              alt="PEPTILAB Logo"
              fill
              className="object-contain drop-shadow-[0_0_30px_rgba(201,168,76,0.3)]"
              priority
            />
          </div>
        </div>

        {/* Brand name */}
        <div className="overflow-hidden mb-4">
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light tracking-[0.25em] text-silver-gradient animate-fade-up opacity-0 delay-200">
            PEPTILAB
          </h1>
        </div>

        {/* Gold divider */}
        <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in opacity-0 delay-400">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold-500/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
          <div className="w-32 h-px bg-gold-500/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold-500/60" />
        </div>

        {/* Tagline */}
        <p className="font-body text-xs md:text-sm tracking-[0.4em] text-gold-500/80 mb-3 animate-fade-up opacity-0 delay-500">
          SCIENCE. QUALITY. RESULTS.
        </p>

        <p className="font-body text-xs tracking-[0.2em] text-silver-600/60 mb-12 animate-fade-up opacity-0 delay-600">
          FOR RESEARCH USE ONLY
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up opacity-0 delay-700">
          <button
            onClick={scrollToCatalog}
            className="btn-gold px-10 py-3.5 text-xs tracking-[0.25em] font-body rounded-sm w-full sm:w-auto"
          >
            VER CATÁLOGO
          </button>
          <a
            href="https://instagram.com/peptilabve"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-3.5 text-xs tracking-[0.25em] font-body border border-gold-500/30 text-gold-400/80 hover:border-gold-500/60 hover:text-gold-400 transition-all duration-300 rounded-sm w-full sm:w-auto text-center"
          >
            @PEPTILABVE
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex flex-col items-center gap-2 animate-fade-in opacity-0 delay-800">
          <span className="font-mono text-[10px] tracking-[0.3em] text-silver-600/40">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold-500/40 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-4 bg-gold-500/80 animate-bounce" style={{ animationDuration: '1.5s' }} />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-obsidian-900 to-transparent pointer-events-none" />
    </section>
  );
}

function MoleculeBackground() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Left molecule cluster */}
      <g opacity="0.15" filter="url(#glow)">
        <line x1="80" y1="200" x2="140" y2="260" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 4">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
        </line>
        <line x1="140" y1="260" x2="90" y2="320" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 4">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3.5s" repeatCount="indefinite" />
        </line>
        <line x1="140" y1="260" x2="210" y2="290" stroke="#b8b8b8" strokeWidth="0.5" strokeDasharray="3 6">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite" />
        </line>
        <circle className="mol-node" cx="80" cy="200" r="4" fill="#C9A84C">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="140" cy="260" r="6" fill="#C9A84C">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="90" cy="320" r="3" fill="#b8b8b8">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="210" cy="290" r="5" fill="#C9A84C">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="3.2s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Right molecule cluster */}
      <g opacity="0.12" filter="url(#glow)">
        <line x1="1300" y1="150" x2="1350" y2="220" stroke="#b8b8b8" strokeWidth="1" strokeDasharray="5 3">
          <animate attributeName="opacity" values="0.2;0.7;0.2" dur="4s" repeatCount="indefinite" />
        </line>
        <line x1="1350" y1="220" x2="1400" y2="180" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 4">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
        </line>
        <line x1="1350" y1="220" x2="1310" y2="290" stroke="#b8b8b8" strokeWidth="0.5" strokeDasharray="3 6">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="5s" repeatCount="indefinite" />
        </line>
        <circle cx="1300" cy="150" r="5" fill="#b8b8b8">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="1350" cy="220" r="7" fill="#C9A84C">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="1400" cy="180" r="4" fill="#C9A84C">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="1310" cy="290" r="3" fill="#b8b8b8">
          <animate attributeName="opacity" values="0.2;0.7;0.2" dur="4.2s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Bottom left */}
      <g opacity="0.08">
        <line x1="50" y1="700" x2="120" y2="750" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="4 8">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="6s" repeatCount="indefinite" />
        </line>
        <line x1="120" y1="750" x2="160" y2="700" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="4 8">
          <animate attributeName="opacity" values="0.2;0.5;0.2" dur="5s" repeatCount="indefinite" />
        </line>
        <circle cx="50" cy="700" r="3" fill="#C9A84C">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="120" cy="750" r="5" fill="#C9A84C">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="160" cy="700" r="3" fill="#b8b8b8">
          <animate attributeName="opacity" values="0.2;0.7;0.2" dur="5s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Top right */}
      <g opacity="0.08">
        <line x1="1250" y1="600" x2="1320" y2="650" stroke="#b8b8b8" strokeWidth="0.5" strokeDasharray="3 7">
          <animate attributeName="opacity" values="0.1;0.5;0.1" dur="7s" repeatCount="indefinite" />
        </line>
        <circle cx="1250" cy="600" r="4" fill="#C9A84C">
          <animate attributeName="opacity" values="0.2;0.7;0.2" dur="5s" repeatCount="indefinite" />
        </circle>
        <circle cx="1320" cy="650" r="6" fill="#C9A84C">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}
