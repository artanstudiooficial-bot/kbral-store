import { Instagram, MessageCircle, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'motion/react';
import { WHATSAPP_NUMBER } from '../store/useCartStore';
import { KbralMonogram } from './Header';

export function FooterCta() {
  const directWhatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;
  const instagramUrl =
    'https://www.instagram.com/kbralstore_?igsh=eGNqdTU4dzU2N3Bk';

  return (
    <>
      <section id="contato" className="py-16 sm:py-24 bg-[#0b0b0b]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#121212] border border-white/10 rounded-2xl px-6 py-10 sm:px-12 sm:py-16 flex flex-col lg:flex-row items-center lg:items-center justify-between gap-7 text-center lg:text-left"
          >
            <div className="max-w-2xl space-y-3">
              <p className="text-[11px] sm:text-xs font-medium tracking-[0.18em] uppercase text-[#a3a3a3]">
                Últimas Unidades · Atendimento Imediato
              </p>
              <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white text-balance leading-[1.08]">
                GARANTA SEU VISUAL ANTES QUE ACABE O LOTE.
              </h2>
              <p className="text-sm sm:text-base text-[#b3b3b3] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Atendimento direto e personalizado via WhatsApp. Tire suas
                dúvidas sobre tamanhos, confira a disponibilidade e feche seu
                pedido em segundos.
              </p>
            </div>

            <div className="shrink-0">
              <motion.a
                href={directWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[50px] rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-[#052010] text-sm sm:text-base font-semibold transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                <span>Chamar no WhatsApp</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#0b0b0b] pt-12 pb-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-10 border-b border-white/10 text-center sm:text-left">
            <div className="space-y-3.5 flex flex-col items-center sm:items-start">
              <a
                href="#inicio"
                className="inline-flex items-center gap-2.5 text-white"
              >
                <KbralMonogram className="w-8 h-8 shrink-0" />
                <span className="font-display text-lg font-semibold tracking-wider">
                  KBRAL STORE
                </span>
              </a>
              <p className="text-sm text-[#a3a3a3] leading-relaxed max-w-xs">
                Moda multimarcas de alto padrão. Camisetas, moletons, bermudas e
                tênis selecionados com entrega rápida e conferência rigorosa.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
                Navegação
              </h3>
              <ul className="space-y-2.5 text-sm text-[#a3a3a3]">
                <li>
                  <a href="#inicio" className="hover:text-white transition-colors">
                    Início
                  </a>
                </li>
                <li>
                  <a href="#colecoes" className="hover:text-white transition-colors">
                    Coleção Oficial
                  </a>
                </li>
                <li>
                  <a href="#avaliacoes" className="hover:text-white transition-colors">
                    Avaliações Reais
                  </a>
                </li>
                <li>
                  <a href="#contato" className="hover:text-white transition-colors">
                    Atendimento
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
                Envio & Garantia
              </h3>
              <ul className="space-y-2.5 text-sm text-[#a3a3a3] flex flex-col items-center sm:items-start">
                <li className="flex items-start justify-center sm:justify-start gap-2 max-w-xs">
                  <Truck className="w-4 h-4 text-white shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Envio ágil para todo o estado e despacho segurado.</span>
                </li>
                <li className="flex items-start justify-center sm:justify-start gap-2 max-w-xs">
                  <ShieldCheck className="w-4 h-4 text-white shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Conferência de costura, tecido e numeração antes do envio.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3 flex flex-col items-center sm:items-start">
              <h3 className="font-display text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
                Canais Oficiais
              </h3>
              <div className="space-y-2.5 text-sm flex flex-col items-center sm:items-start">
                <a
                  href={directWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#d4d4d4] hover:text-[#25D366] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>WhatsApp · (48) 99170-5954</span>
                </a>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#d4d4d4] hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4" aria-hidden="true" />
                  <span>Instagram · @kbralstore_</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-[#8a8a8a]">
            <p>
              © {new Date().getFullYear()} KBRAL STORE. Todos os direitos
              reservados.
            </p>
            <p>Tubarão, Santa Catarina</p>
          </div>
        </div>
      </footer>
    </>
  );
}
