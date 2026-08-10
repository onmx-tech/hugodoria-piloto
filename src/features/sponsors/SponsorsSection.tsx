import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CTAButton } from "../../components/navigation/CTAButton";
import { SPONSORS } from "../../data/sponsors";

// 2 conjuntos por metade → a fita cobre telas largas e o loop fecha em -50%.
const HALF = [...SPONSORS, ...SPONSORS];

export function SponsorsSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sponsors_ticker", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".sponsors_ticker", start: "top 88%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="patrocinio" ref={ref} className="relative bg-[#041221] px-2 md:px-10 py-20 md:py-32 z-[2]">
      <div className="bg-[#f9f6ee] rounded-[12px] md:rounded-3xl py-16 md:py-20 px-4 md:px-10 mx-auto overflow-hidden">
        {/* Heading */}
        <div className="text-center max-w-[669px] mx-auto mb-12 md:mb-16">
          <p className="font-archivo-expanded font-bold text-[#d86527] text-[10px] tracking-[-0.3px] uppercase leading-[1.127]">PATROCÍNIO</p>
          <h2 className="font-archivo-expanded font-extrabold text-[#041221] text-[clamp(22px,7.5vw,28px)] md:text-[32px] tracking-[-0.03em] uppercase leading-[1.127] mt-6">
            Marcas que aceleram junto
          </h2>
          <p className="font-['Inter',sans-serif] font-semibold text-sm text-black/83 leading-[1.54] mt-6 max-w-[513px] mx-auto">
            O automobilismo é uma plataforma única de visibilidade, performance e posicionamento premium. Hugo busca parcerias com marcas que compartilham valores como excelência, disciplina e inovação.
          </p>
        </div>

        {/* Fita de logos — vão constante, altura calibrada por logo */}
        <div
          className="sponsors_ticker relative mb-12 md:mb-16 overflow-hidden"
          style={{ mask: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)", WebkitMask: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)" }}
        >
          <div className="flex is-ticker w-max items-center">
            {[0, 1].map((set) =>
              HALF.map((s, i) => (
                <div key={`${set}-${i}`} className="flex items-center justify-center px-7 md:px-11 shrink-0">
                  <img
                    src={s.file}
                    alt={s.name}
                    loading="lazy"
                    className="w-auto max-w-none"
                    style={{ height: `clamp(${Math.round(s.h * 0.74)}px, ${(s.h / 14).toFixed(1)}vw, ${s.h}px)` }}
                  />
                </div>
              ))
            )}
          </div>
          <style>{`
            @keyframes ticker {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .is-ticker { animation: ticker 38s linear infinite; }
            .is-ticker:hover { animation-play-state: paused; }
            @media (prefers-reduced-motion: reduce) { .is-ticker { animation: none; } }
          `}</style>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <CTAButton>Seja um Parceiro</CTAButton>
        </div>
      </div>
    </section>
  );
}
