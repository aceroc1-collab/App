'use client';

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed (standalone mode)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShowBanner(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => setInstalled(true));

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') setInstalled(true);
    setShowBanner(false);
    setDeferredPrompt(null);
  };

  if (installed || dismissed || !showBanner) return null;

  return (
    <div className="fixed bottom-6 right-4 z-50 animate-fade-up max-w-xs">
      <div className="bg-obsidian-700/95 backdrop-blur-xl border border-gold-500/30 rounded-sm p-4 shadow-2xl shadow-black/50">
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 text-silver-600/40 hover:text-silver-400 transition-colors p-1"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-start gap-3 pr-4">
          <div className="w-10 h-10 border border-gold-500/30 rounded-sm overflow-hidden flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/icon-96x96.png" alt="PEPTILAB" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <p className="font-display text-sm tracking-wider text-silver-300 mb-0.5">INSTALAR APP</p>
            <p className="font-body text-[10px] text-silver-600/60 tracking-wider leading-relaxed">
              Accede a PEPTILAB directamente desde tu pantalla de inicio
            </p>
          </div>
        </div>

        <button
          onClick={handleInstall}
          className="btn-gold w-full mt-4 py-2.5 text-[10px] tracking-[0.25em] font-body rounded-sm"
        >
          INSTALAR AHORA
        </button>
      </div>
    </div>
  );
}
