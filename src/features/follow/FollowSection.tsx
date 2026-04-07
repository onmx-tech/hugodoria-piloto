import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CharHoverLink } from "../../components/navigation/CharHoverLink";
import { DownArrow } from "../../components/ui/DownArrow";
import { OptimizedImage } from "../../components/media/OptimizedImage";

export function FollowSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".follow_heading", {
        y: 80,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        },
      });

      gsap.from(".follow_nav-left", {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".follow_nav", start: "top 80%" },
      });
      gsap.from(".follow_nav-right", {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".follow_nav", start: "top 80%" },
      });

      gsap.to(".follow_background", {
        yPercent: 8,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contato" ref={ref} className="relative bg-gradient-to-b from-[#041221] to-[#07294f] overflow-hidden md:h-screen md:min-h-[600px] z-[2]">
      {/* Desktop: Portrait image */}
      <div className="follow_background hidden md:flex absolute top-[25%] bottom-0 left-0 right-0 pointer-events-none justify-center overflow-hidden">
        <OptimizedImage name="portrait-cinematic" alt="Retrato cinematografico de Hugo Netto" sizes="100vw" imgClassName="absolute inset-0 object-cover object-top opacity-70 h-full w-auto max-w-[900px] 2xl:max-w-[65%] mx-auto" />
      </div>

      {/* Title */}
      <div className="follow_heading relative md:absolute md:top-[10%] md:left-1/2 md:-translate-x-1/2 text-center z-[1] max-w-[90vw] mx-auto pt-20 md:pt-0">
        <h2 className="font-archivo-expanded text-[#e1dcd0] text-[clamp(32px,10.6vw,40px)] md:text-[clamp(2rem,4.9vw,70.4px)] text-center tracking-[-0.03em] uppercase leading-[0.95]">
          <span className="font-light block">ACOMPANHE</span>
          <span className="font-light">HUGO </span>
          <span className="font-extrabold text-[#d86527]">netto</span>
        </h2>
      </div>

      {/* Links */}
      <nav aria-label="Redes sociais e contatos" className="follow_nav relative md:absolute md:top-[55.8%] left-0 right-0 z-[1] flex flex-col items-center md:items-stretch md:flex-row md:justify-between px-4 md:px-[7.78%] mt-14 md:mt-0 gap-14 md:gap-0">
        <div className="follow_nav-left text-center">
          <p className="font-archivo-expanded font-bold text-[#d86527] text-[10px] tracking-[-0.3px] uppercase leading-[1.127]">REDES SOCIAIS</p>
          <div className="flex flex-col items-center gap-[6px] mt-[18px] font-archivo-expanded font-extrabold text-[#e1dcd0] text-[clamp(18px,6.4vw,24px)] md:text-[clamp(1rem,1.67vw,24px)] tracking-[-0.03em] uppercase">
            <CharHoverLink href="#" label="INSTAGRAM" className="text-[#e1dcd0] leading-[1.127]" ariaLabel="Seguir Hugo Netto no Instagram" />
            <CharHoverLink href="#" label="YOUTUBE" className="text-[#e1dcd0] leading-[1.127]" ariaLabel="Assistir Hugo Netto no YouTube" />
            <CharHoverLink href="#" label="TIKTOK" className="text-[#e1dcd0] leading-[1.127]" ariaLabel="Seguir Hugo Netto no TikTok" />
          </div>
        </div>
        <div className="follow_nav-right text-center">
          <p className="font-archivo-expanded font-bold text-[#d86527] text-[10px] tracking-[-0.3px] uppercase leading-[1.127]">contatos</p>
          <div className="flex flex-col items-center gap-[6px] mt-[18px] font-archivo-expanded font-extrabold text-[#e1dcd0] text-[clamp(18px,6.4vw,24px)] md:text-[clamp(1rem,1.67vw,24px)] tracking-[-0.03em] uppercase">
            <CharHoverLink href="#" label="PARCERIAS" className="text-[#e1dcd0] leading-[1.127]" ariaLabel="Informacoes sobre parcerias" />
            <CharHoverLink href="#" label="MEDIA KIT" className="text-[#e1dcd0] leading-[1.127]" ariaLabel="Baixar media kit" />
            <CharHoverLink href="#" label="EMAIL" className="text-[#e1dcd0] leading-[1.127]" ariaLabel="Enviar email" />
          </div>
        </div>
      </nav>

      {/* Mobile: Portrait image */}
      <div className="md:hidden relative w-full overflow-hidden mt-14 flex-1 min-h-[400px]">
        <OptimizedImage name="portrait-cinematic" alt="Retrato cinematografico de Hugo Netto" sizes="100vw" imgClassName="absolute inset-0 object-cover object-top size-full" />
      </div>

      {/* Footer */}
      <footer className="relative md:absolute md:bottom-0 md:left-0 md:right-0 z-[2] py-4 md:py-3" role="contentinfo">
        <div className="max-w-[1920px] mx-auto px-4 md:px-[38px] flex flex-col md:flex-row items-center md:justify-between gap-3 md:gap-0">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Voltar ao topo da pagina"
          className="flex gap-[8px] items-center group order-first md:order-last"
        >
          <span className="font-['Inter',sans-serif] font-medium text-[12px] text-white leading-[1.5] whitespace-nowrap group-hover:text-[#d86527] transition-colors">Voltar ao topo</span>
          <div className="flex items-center justify-center size-[24px]" aria-hidden="true">
            <div className="-rotate-90">
              <DownArrow />
            </div>
          </div>
        </button>
        <p className="font-['Inter',sans-serif] font-normal text-[10px] md:text-[12px] text-white leading-normal text-center">
          Copyright &copy; 2026 Hugo Netto. Todos os direitos reservados
        </p>
        </div>
      </footer>
    </section>
  );
}
