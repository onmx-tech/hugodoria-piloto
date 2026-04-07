import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CTAButton } from "../../components/navigation/CTAButton";
import { LogoSvg } from "./LogoSvg";

export function SponsorsSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sponsors_card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".sponsors_card", start: "top 85%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="patrocinio" ref={ref} className="relative bg-[#041221] px-2 md:px-10 py-20 md:py-32 z-[2]">
      <div className="bg-[#f9f6ee] rounded-[12px] md:rounded-3xl py-20 md:py-20 px-4 md:px-10 mx-auto overflow-hidden">
        {/* Heading */}
        <div className="text-center max-w-[669px] mx-auto mb-8 md:mb-16">
          <p className="font-archivo-expanded font-bold text-[#d86527] text-[10px] tracking-[-0.3px] uppercase leading-[1.127]">PATROCÍNIO</p>
          <h2 className="font-archivo-expanded font-extrabold text-[#041221] text-[clamp(22px,7.5vw,28px)] md:text-[32px] tracking-[-0.03em] uppercase leading-[1.127] mt-6">
            Marcas que aceleram junto
          </h2>
          <p className="font-['Inter',sans-serif] font-semibold text-sm text-black/83 leading-[1.54] mt-6 max-w-[513px] mx-auto">
            O automobilismo é uma plataforma única de visibilidade, performance e posicionamento premium. Hugo busca parcerias com marcas que compartilham valores como excelência, disciplina e inovação.
          </p>
        </div>

        {/* Sponsor logos ticker */}
        <div className="relative mb-12 md:mb-16 overflow-hidden" style={{ mask: "linear-gradient(90deg, transparent, black 5%, black 95%, transparent)", WebkitMask: "linear-gradient(90deg, transparent, black 5%, black 95%, transparent)" }}>
          <div className="flex is-ticker gap-4 w-max">
            {[...Array(2)].map((_, set) =>
              [0, 1, 2, 3, 4].map((i) => (
                <div key={`${set}-${i}`} className="sponsors_card bg-black/4 rounded w-[240px] md:w-[280px] aspect-[340/269] flex items-center justify-center flex-shrink-0">
                  <LogoSvg clipId={`clip_logo_${set}_${i}`} />
                </div>
              ))
            )}
          </div>
          <style>{`
            @keyframes ticker {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .is-ticker {
              animation: ticker 20s linear infinite;
            }
            .is-ticker:hover {
              animation-play-state: paused;
            }
          `}</style>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <CTAButton href="#contato">Seja um Parceiro</CTAButton>
        </div>
      </div>
    </section>
  );
}
