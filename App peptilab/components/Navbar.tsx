'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface NavbarProps {
  cartCount: number;
  onCartOpen: () => void;
}

export default function Navbar({ cartCount, onCartOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-obsidian-800/95 backdrop-blur-xl border-b border-gold-500/20 py-2'
          : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-sm overflow-hidden border border-gold-500/30 group-hover:border-gold-500/60 transition-all">
              <Image src="/logo-transparent.png" alt="PEPTILAB" fill className="object-contain p-0.5" />
            </div>
            <span className="font-display font-semibold text-lg tracking-[0.15em] text-silver-300 group-hover:text-gold-400 transition-colors">
              PEPTILAB
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'INICIO', id: 'hero' },
              { label: 'CATÁLOGO', id: 'catalog' },
              { label: 'CONTACTO', id: 'footer' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="font-body text-xs tracking-[0.2em] text-silver-600 hover:text-gold-400 transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Cart + hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={onCartOpen}
              className="relative p-2.5 border border-gold-500/30 hover:border-gold-500/60 rounded-sm transition-all duration-300 group"
              aria-label="Carrito"
            >
              <CartIcon className="w-4 h-4 text-gold-500 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gold-500 text-obsidian-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse-gold">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2.5 border border-gold-500/20 rounded-sm text-silver-500 hover:text-gold-400 transition-colors"
              aria-label="Menú"
            >
              {menuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 md:hidden" onClick={() => setMenuOpen(false)}>
          <div className="absolute top-16 left-0 right-0 bg-obsidian-800/98 backdrop-blur-xl border-b border-gold-500/20 py-6 px-6 animate-fade-up" onClick={e => e.stopPropagation()}>
            <div className="flex flex-col gap-5">
              {[
                { label: 'INICIO', id: 'hero' },
                { label: 'CATÁLOGO', id: 'catalog' },
                { label: 'CONTACTO', id: 'footer' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="font-body text-sm tracking-[0.25em] text-silver-400 hover:text-gold-400 transition-colors text-left py-2 border-b border-gold-500/10"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="https://instagram.com/peptilabve"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm tracking-[0.25em] text-gold-500/70 hover:text-gold-400 transition-colors text-left py-2"
              >
                @PEPTILABVE
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
