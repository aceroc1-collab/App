'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer id="footer" className="relative bg-obsidian-800 border-t border-gold-500/15 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Top section */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 mb-12">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 border border-gold-500/30 rounded-sm overflow-hidden">
                <Image src="/logo-transparent.png" alt="PEPTILAB" fill className="object-contain p-1" />
              </div>
              <div>
                <h3 className="font-display text-xl tracking-[0.2em] text-silver-300">PEPTILAB</h3>
                <p className="font-mono text-[9px] tracking-[0.3em] text-gold-500/50">.VE</p>
              </div>
            </div>
            <p className="font-body text-xs tracking-[0.15em] text-silver-600/50 max-w-xs text-center md:text-left leading-relaxed">
              Compuestos de investigación de alta pureza.<br />
              Ciencia. Calidad. Resultados.
            </p>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <p className="font-mono text-[9px] tracking-[0.3em] text-gold-500/40 mb-4">CONTACTO</p>
            <div className="space-y-3">
              <a
                href="https://wa.me/584129987858"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-silver-500/70 hover:text-gold-400 transition-colors group"
              >
                <WhatsAppDot />
                <span className="font-body text-xs tracking-wider">+58 412 998 7858</span>
              </a>
              <a
                href="https://instagram.com/peptilabve"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-silver-500/70 hover:text-gold-400 transition-colors group"
              >
                <InstagramDot />
                <span className="font-body text-xs tracking-wider">@peptilabve</span>
              </a>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="text-center md:text-right max-w-xs">
            <p className="font-mono text-[9px] tracking-[0.3em] text-gold-500/40 mb-3">AVISO LEGAL</p>
            <p className="font-body text-[10px] text-silver-600/30 leading-relaxed tracking-wider">
              Todos los productos son exclusivamente para uso en investigación científica. No aptos para consumo humano o animal.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-gold mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <p className="font-mono text-[9px] tracking-[0.25em] text-silver-600/30">
            © 2025 PEPTILAB.VE — TODOS LOS DERECHOS RESERVADOS
          </p>
          <p className="font-mono text-[9px] tracking-[0.25em] text-gold-500/30">
            SCIENCE. QUALITY. RESULTS.
          </p>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppDot() {
  return (
    <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(37,211,102,0.2)' }}>
      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
    </div>
  );
}

function InstagramDot() {
  return (
    <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.15)' }}>
      <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
    </div>
  );
}
