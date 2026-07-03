import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CharHoverLink } from "../../components/navigation/CharHoverLink";
import { DownArrow } from "../../components/ui/DownArrow";
import { Kicker } from "../../components/ui/Kicker";
import { OptimizedImage } from "../../components/media/OptimizedImage";

const LINK_COL =
  "flex flex-col items-center md:items-start gap-2 mt-5 font-archivo-expanded font-extrabold text-[#e1dcd0] text-[clamp(20px,6.4vw,26px)] md:text-[clamp(1.1rem,1.6vw,26px)] tracking-[-0.03em] uppercase";

export function FollowSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".follow_heading > *", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".follow_heading", start: "top 82%" },
      });
      gsap.from(".follow_group", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".follow_nav", start: "top 85%" },
      });
      gsap.from(".follow_image", {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".follow_image", start: "top 85%" },
      });
      gsap.to(".follow_image img", {
        yPercent: -6,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contato"
      ref={ref}
      className="relative bg-gradient-to-b from-[#041221] to-[#07294f] overflow-hidden z-[2] flex flex-col min-h-screen"
    >
      <div className="flex-1 flex items-center w-full">
        <div className="w-full max-w-[1400px] mx-auto px-5 md:px-10 lg:px-14 py-24 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
            {/* Texto + links */}
            <div className="order-2 md:order-1 text-center md:text-left">
              <div className="follow_heading">
                <Kicker label="Contato" sub="Vamos acelerar juntos" className="mb-6 justify-center md:justify-start" />
                <h2 className="font-archivo-expanded text-[#e1dcd0] text-[clamp(34px,9vw,64px)] tracking-[-0.03em] uppercase leading-[0.92]">
                  <span className="font-light block">Acompanhe</span>
                  <span className="font-light">Hugo </span>
                  <span className="font-extrabold text-[#d86527]">Netto</span>
                </h2>
              </div>

              <nav aria-label="Redes sociais e contatos" className="follow_nav grid grid-cols-2 gap-8 mt-10 md:mt-12 max-w-[440px] mx-auto md:mx-0">
                <div className="follow_group">
                  <p className="font-archivo-expanded font-bold text-[#d86527] text-[10px] tracking-[0.16em] uppercase leading-none">Redes sociais</p>
                  <div className={LINK_COL}>
                    <CharHoverLink href="#" label="INSTAGRAM" className="text-[#e1dcd0] leading-none" ariaLabel="Seguir Hugo Netto no Instagram" />
                    <CharHoverLink href="#" label="YOUTUBE" className="text-[#e1dcd0] leading-none" ariaLabel="Assistir Hugo Netto no YouTube" />
                    <CharHoverLink href="#" label="TIKTOK" className="text-[#e1dcd0] leading-none" ariaLabel="Seguir Hugo Netto no TikTok" />
                  </div>
                </div>
                <div className="follow_group">
                  <p className="font-archivo-expanded font-bold text-[#d86527] text-[10px] tracking-[0.16em] uppercase leading-none">Contatos</p>
                  <div className={LINK_COL}>
                    <CharHoverLink href="#" label="PARCERIAS" className="text-[#e1dcd0] leading-none" ariaLabel="Informacoes sobre parcerias" />
                    <CharHoverLink href="#" label="MEDIA KIT" className="text-[#e1dcd0] leading-none" ariaLabel="Baixar media kit" />
                    <CharHoverLink href="#" label="EMAIL" className="text-[#e1dcd0] leading-none" ariaLabel="Enviar email" />
                  </div>
                </div>
              </nav>
            </div>

            {/* Foto do troféu enquadrada */}
            <div className="follow_image order-1 md:order-2">
              <div className="relative w-full aspect-[4/5] max-w-[440px] md:ml-auto rounded-2xl overflow-hidden bg-[#0a2138]">
                <OptimizedImage
                  name="photo-trophy-suit"
                  alt="Hugo Netto com os troféus, em traje da equipe"
                  sizes="(max-width: 768px) 90vw, 440px"
                  imgClassName="absolute inset-0 object-cover size-full object-[50%_20%]"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(4,18,33,0) 0%, rgba(4,18,33,0.85) 100%)" }} />
                <div className="absolute left-5 bottom-5 flex items-center gap-3">
                  <span className="font-archivo-expanded font-extrabold text-[#d86527] text-lg leading-none">#91</span>
                  <span className="h-4 w-px bg-white/25" />
                  <span className="font-archivo-expanded font-bold text-[#e1dcd0] text-[11px] tracking-[0.14em] uppercase leading-none">AMG Cup Brasil</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-[2] border-t border-white/10 py-5" role="contentinfo">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-14 flex flex-col md:flex-row items-center md:justify-between gap-3">
          <p className="font-['Inter',sans-serif] font-normal text-[11px] md:text-xs text-white/60 leading-normal text-center order-last md:order-first">
            Copyright &copy; 2026 Hugo Netto. Todos os direitos reservados
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Voltar ao topo da pagina"
            className="flex gap-2 items-center group"
          >
            <span className="font-['Inter',sans-serif] font-medium text-xs text-white leading-[1.5] whitespace-nowrap group-hover:text-[#d86527] transition-colors">Voltar ao topo</span>
            <div className="flex items-center justify-center size-[24px]" aria-hidden="true">
              <div className="-rotate-90">
                <DownArrow />
              </div>
            </div>
          </button>
        </div>
      </footer>
    </section>
  );
}
