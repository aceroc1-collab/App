'use client';

import { useEffect } from 'react';
import { CartItem } from './types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

export default function Cart({ isOpen, onClose, items, onUpdateQty, onRemove }: CartProps) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const totalQty = items.reduce((sum, i) => sum + i.qty, 0);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleWhatsApp = () => {
    if (items.length === 0) return;

    const lines = items.map(i => `• ${i.name} ${i.presentation} x${i.qty} — $${i.price * i.qty}`).join('\n');
    const message = `Hola PEPTILAB 🧬, deseo realizar el siguiente pedido:\n\n${lines}\n\n*Total: $${subtotal} USD*\n\n¡Quedo atento a su respuesta!`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/584129987858?text=${encoded}`, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 bottom-0 w-full max-w-md z-50 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #070707 100%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gold-500/20">
          <div>
            <h2 className="font-display text-xl tracking-[0.15em] text-silver-300">CARRITO</h2>
            <p className="font-mono text-[10px] tracking-[0.2em] text-gold-500/60 mt-0.5">
              {totalQty} {totalQty === 1 ? 'ARTÍCULO' : 'ARTÍCULOS'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 border border-silver-600/20 hover:border-gold-500/40 rounded-sm text-silver-500 hover:text-gold-400 transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 py-20">
              <div className="opacity-20">
                <svg className="w-16 h-16 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272" />
                </svg>
              </div>
              <div className="text-center">
                <p className="font-display text-xl text-silver-600/40 tracking-widest">VACÍO</p>
                <p className="font-body text-xs text-silver-600/30 mt-2 tracking-wider">Agrega productos del catálogo</p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 text-[10px] tracking-[0.25em] font-body border border-gold-500/30 text-gold-400/70 hover:border-gold-500/60 hover:text-gold-400 transition-all rounded-sm"
              >
                VER CATÁLOGO
              </button>
            </div>
          ) : (
            items.map(item => (
              <CartItemRow
                key={item.id}
                item={item}
                onUpdate={delta => onUpdateQty(item.id, delta)}
                onRemove={() => onRemove(item.id)}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gold-500/20 px-6 py-5 space-y-4 safe-bottom">
            {/* Subtotal */}
            <div className="flex justify-between items-center">
              <span className="font-body text-xs tracking-[0.2em] text-silver-600/60">SUBTOTAL</span>
              <span className="font-display text-2xl text-gold-gradient">${subtotal} <span className="text-sm font-mono text-silver-600/40">USD</span></span>
            </div>

            <div className="divider-gold" />

            {/* WhatsApp CTA */}
            <button
              onClick={handleWhatsApp}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-sm text-xs tracking-[0.25em] font-body transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                color: '#fff',
                boxShadow: '0 8px 25px rgba(37, 211, 102, 0.25)',
              }}
            >
              <WhatsAppIcon />
              PROCESAR PEDIDO POR WHATSAPP
            </button>

            <p className="text-center font-mono text-[9px] tracking-[0.2em] text-silver-600/30">
              SE ABRIRÁ WHATSAPP AUTOMÁTICAMENTE
            </p>
          </div>
        )}
      </div>
    </>
  );
}

function CartItemRow({ item, onUpdate, onRemove }: { item: CartItem; onUpdate: (d: number) => void; onRemove: () => void }) {
  return (
    <div className="bg-obsidian-700/40 border border-gold-500/10 rounded-sm p-4 flex gap-3">
      <div className="flex-1 min-w-0">
        <h4 className="font-display text-base tracking-wide text-silver-300 truncate">{item.name}</h4>
        <p className="font-mono text-[10px] tracking-wider text-silver-600/50 mt-0.5">{item.presentation}</p>
        <p className="font-display text-lg text-gold-500 mt-1">${item.price * item.qty}</p>
      </div>

      <div className="flex flex-col items-end justify-between gap-2">
        <button
          onClick={onRemove}
          className="text-silver-600/30 hover:text-red-400/70 transition-colors p-1"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center gap-2 border border-gold-500/20 rounded-sm overflow-hidden">
          <button
            onClick={() => onUpdate(-1)}
            className="w-7 h-7 flex items-center justify-center text-silver-500 hover:text-gold-400 hover:bg-gold-500/10 transition-all font-body text-lg"
          >
            −
          </button>
          <span className="font-mono text-xs text-silver-300 w-5 text-center">{item.qty}</span>
          <button
            onClick={() => onUpdate(1)}
            className="w-7 h-7 flex items-center justify-center text-silver-500 hover:text-gold-400 hover:bg-gold-500/10 transition-all font-body text-lg"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.49" />
    </svg>
  );
}
