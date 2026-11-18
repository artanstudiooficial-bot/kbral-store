import { useEffect, useState } from 'react';
import { Cookie } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const COOKIE_STORAGE_KEY = 'kbral_cookie_consent_v1';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(COOKIE_STORAGE_KEY);
      if (!saved) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const handleDecision = (choice: 'accepted' | 'declined') => {
    try {
      window.localStorage.setItem(COOKIE_STORAGE_KEY, choice);
    } catch {
      // Ignore storage errors in restricted environments
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          role="region"
          aria-label="Aviso de cookies"
          className="fixed bottom-3 inset-x-3 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-45 bg-[#141414]/95 backdrop-blur-xl border border-white/15 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <Cookie className="w-4 h-4 text-white" aria-hidden="true" />
            </div>

            <div className="space-y-3 flex-1 min-w-0">
              <div className="space-y-1">
                <p className="font-display text-sm font-semibold text-white">
                  Privacidade & Cookies
                </p>
                <p className="text-xs text-[#b3b3b3] leading-relaxed">
                  Utilizamos cookies essenciais para otimizar sua navegação e
                  manter os itens da sua sacola salvos durante a visita.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDecision('accepted')}
                  className="flex-1 min-h-[38px] px-3.5 py-2 rounded-full bg-white text-[#0b0b0b] hover:bg-[#e5e5e5] text-xs font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Aceitar
                </button>
                <button
                  type="button"
                  onClick={() => handleDecision('declined')}
                  className="min-h-[38px] px-3.5 py-2 rounded-full bg-transparent border border-white/15 text-[#d4d4d4] hover:text-white hover:border-white/35 text-xs font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Recusar
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
