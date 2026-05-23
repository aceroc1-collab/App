'use client';

import { useState, useEffect, useRef } from 'react';
import { Product } from './types';

interface CatalogProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const CATEGORIES = ['Todos', 'GLP-1', 'Regenerativo', 'Longevidad', 'GH Secretagogo', 'Blend', 'Accesorio'];

const CATEGORY_LABELS: Record<string, string> = {
  'GLP-1': 'GLP-1 / Metabólico',
  'Regenerativo': 'Recuperación',
  'Longevidad': 'Longevidad',
  'GH Secretagogo': 'GH Secretagogo',
  'Blend': 'Blend Exclusivo',
  'Accesorio': 'Accesorios',
};

export default function Catalog({ products, onAddToCart }: CatalogProps) {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [added, setAdded] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered = activeCategory === 'Todos'
    ? products
    : products.filter(p => p.category === activeCategory);

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setAdded(prev => new Set(prev).add(product.id));
    setTimeout(() => setAdded(prev => { const s = new Set(prev); s.delete(product.id); return s; }), 1500);
  };

  return (
    <section id="catalog" ref={sectionRef} className="relative py-24 px-4 bg-obsidian-900">
      {/* Background accent */}
      <div className="absolute inset-0 molecule-bg pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <div className={`text-center mb-14 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-mono text-[10px] tracking-[0.4em] text-gold-500/60 mb-4">— CATÁLOGO —</p>
          <h2 className="font-display text-4xl md:text-5xl font-light tracking-[0.15em] text-silver-gradient mb-4">
            COMPUESTOS DE INVESTIGACIÓN
          </h2>
          <div className="divider-gold w-48 mx-auto mb-4" />
          <p className="font-body text-xs tracking-[0.2em] text-silver-600/50">
            FOR RESEARCH USE ONLY · ALTA PUREZA
          </p>
        </div>

        {/* Category filter */}
        <div className={`flex flex-wrap justify-center gap-2 mb-12 transition-all duration-1000 delay-200 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-[10px] tracking-[0.2em] font-body rounded-sm transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-gold-500/20 border-gold-500/50 text-gold-400'
                  : 'border-silver-600/20 text-silver-600/60 hover:border-gold-500/30 hover:text-gold-500/70'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              index={idx}
              visible={visible}
              isAdded={added.has(product.id)}
              onAdd={() => handleAdd(product)}
            />
          ))}
        </div>

        {/* Research disclaimer */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-block border border-gold-500/15 px-8 py-4 rounded-sm">
            <p className="font-mono text-[9px] tracking-[0.25em] text-silver-600/40 leading-relaxed">
              TODOS LOS COMPUESTOS SON EXCLUSIVAMENTE PARA USO EN INVESTIGACIÓN<br />
              NO APTO PARA CONSUMO HUMANO · PEPTILAB.VE
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ProductCardProps {
  product: Product;
  index: number;
  visible: boolean;
  isAdded: boolean;
  onAdd: () => void;
}

function ProductCard({ product, index, visible, isAdded, onAdd }: ProductCardProps) {
  return (
    <div
      className={`luxury-card rounded-sm p-5 flex flex-col transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {/* Category badge */}
      <div className="flex items-center justify-between mb-4">
        <span className="badge-gold">{product.category.toUpperCase()}</span>
        <div className="w-1 h-1 rounded-full bg-gold-500/40" />
      </div>

      {/* Molecule icon */}
      <div className="flex justify-center mb-4">
        <MoleculeIcon />
      </div>

      {/* Product info */}
      <h3 className="font-display text-2xl font-medium tracking-wide text-silver-300 mb-1">
        {product.name}
      </h3>
      <p className="font-mono text-xs tracking-[0.15em] text-silver-600/60 mb-4">
        {product.presentation}
      </p>

      <div className="divider-gold mb-4" />

      {/* Price + button */}
      <div className="mt-auto flex items-center justify-between gap-3">
        <div>
          <span className="font-display text-3xl font-light text-gold-gradient">
            ${product.price}
          </span>
          <span className="font-mono text-[10px] text-silver-600/40 ml-1">USD</span>
        </div>

        <button
          onClick={onAdd}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-[10px] tracking-[0.2em] font-body rounded-sm transition-all duration-300 ${
            isAdded
              ? 'bg-gold-500/20 border border-gold-500/50 text-gold-400'
              : 'btn-gold'
          }`}
        >
          {isAdded ? (
            <>
              <CheckIcon className="w-3 h-3" />
              <span>AÑADIDO</span>
            </>
          ) : (
            <>
              <PlusIcon className="w-3 h-3" />
              <span>AGREGAR</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function MoleculeIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-30">
      <circle cx="24" cy="12" r="4" stroke="#C9A84C" strokeWidth="1" />
      <circle cx="12" cy="30" r="4" stroke="#C9A84C" strokeWidth="1" />
      <circle cx="36" cy="30" r="4" stroke="#C9A84C" strokeWidth="1" />
      <circle cx="24" cy="40" r="3" stroke="#b8b8b8" strokeWidth="1" />
      <line x1="24" y1="16" x2="12" y2="26" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="2 2" />
      <line x1="24" y1="16" x2="36" y2="26" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="2 2" />
      <line x1="14" y1="33" x2="22" y2="38" stroke="#b8b8b8" strokeWidth="0.5" strokeDasharray="2 2" />
      <line x1="34" y1="33" x2="26" y2="38" stroke="#b8b8b8" strokeWidth="0.5" strokeDasharray="2 2" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}
