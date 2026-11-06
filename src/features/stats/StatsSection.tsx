import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Kicker } from "../../components/ui/Kicker";
import { OptimizedImage } from "../../components/media/OptimizedImage";
import { CountUp } from "./CountUp";
import { PODIUMS, SEASON_2026, TITLES } from "../../data/career";

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stats_heading > *", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".stats_heading", start: "top 80%" },
      });

      gsap.from(".stats_image", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".stats_image", start: "top 85%" },
      });
      gsap.to(".stats_image img", {
        scale: 1.08,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
      });

      gsap.from(".stats_number", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".stats_numbers", start: "top 88%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="carreira" ref={ref} className="relative bg-[#041221] py-24 md:py-32 overflow-hidden z-[2]">
      <div className="relative w-full max-w-[1400px] mx-auto px-5 md:px-10 lg:px-14">
        {/* Heading */}
        <div className="stats_heading max-w-[640px] mb-12 md:mb-16">
          <Kicker label="Temporada 2026" sub="AMG Cup Brasil" className="mb-7" />
          <h2 className="font-archivo-expanded font-extrabold text-[#e1dcd0] text-[clamp(28px,6vw,48px)] tracking-[-0.03em] uppercase leading-[1.0]">
            Pódio em todas as etapas
          </h2>
          <p className="font-['Inter',sans-serif] text-[15px] md:text-base text-[rgba(238,235,228,0.78)] leading-[1.65] mt-6">
            Duas vitórias, em Brasília e Interlagos, e dois segundos lugares na Mercedes-AMG Cup Brasil. A temporada termina na Super Final de 20 de dezembro, com o carro #91.
          </p>
        </div>

        {/* O pódio é o argumento: Hugo com o troféu e o macacão preto do CDN */}
        <div className="stats_image relative w-full aspect-[3/2] md:aspect-[16/9] rounded-2xl overflow-hidden bg-[#0a2138]">
          <OptimizedImage
            name="photo-podio-trofeu-gt4"
            alt="Hugo Netto no pódio da AMG Cup Brasil, com o troféu"
            sizes="(max-width: 1400px) 100vw, 1400px"
            imgClassName="absolute inset-0 object-cover size-full object-[50%_30%]"
          />
          <div className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(4,18,33,0) 0%, rgba(4,18,33,0.7) 100%)" }} />
          <div className="absolute left-5 md:left-8 bottom-5 md:bottom-7 flex items-center gap-3">
            <span className="font-archivo-expanded font-extrabold text-[#d86527] text-xl leading-none">#91</span>
            <span className="h-4 w-px bg-white/25" />
            <span className="font-archivo-expanded font-bold text-[#e1dcd0] text-[11px] md:text-xs tracking-[0.14em] uppercase leading-none">Pódio · Mercedes-AMG Cup Brasil</span>
          </div>
        </div>

        {/* A temporada leva a tinta */}
        <div className="stats_numbers grid sm:grid-cols-3 gap-8 sm:gap-6 mt-12 md:mt-16">
          {SEASON_2026.map((n) => (
            <div key={n.label} className="stats_number border-t border-white/15 pt-5">
              <p className="font-archivo-expanded font-light text-[#d86527] text-[clamp(72px,10vw,132px)] tracking-[-0.04em] leading-[0.9]">
                <CountUp value={n.value} suffix={n.suffix} />
              </p>
              <p className="font-archivo-expanded font-bold text-[#e1dcd0] text-[clamp(13px,1.4vw,16px)] tracking-[0.14em] uppercase leading-none mt-4">
                {n.label}
              </p>
              <p className="font-['Inter',sans-serif] text-[13px] md:text-sm text-[rgba(238,235,228,0.66)] leading-[1.5] mt-2">
                {n.detail}
              </p>
            </div>
          ))}
        </div>

        {/* O palmarés fica, sem destaque (Flavia, 03/11): 2019 já faz tempo. */}
        <div className="flex flex-wrap gap-x-10 gap-y-3 mt-12 md:mt-16 pt-5 border-t border-white/10 font-['Inter',sans-serif] text-[13px] text-[rgba(238,235,228,0.62)] leading-[1.5]">
          <p className="font-archivo-expanded font-bold text-[#e1dcd0]/70 text-[10px] tracking-[0.16em] uppercase leading-[1.95]">Carreira</p>
          {TITLES.map((t) => (
            <p key={t.year}>
              <span className="font-medium text-[#e1dcd0]/85">{t.year}</span> {t.result}, {t.meta}
            </p>
          ))}
          <p><span className="font-medium text-[#e1dcd0]/85">{PODIUMS.total} pódios</span>, {PODIUMS.amgCup} deles na AMG Cup Brasil</p>
        </div>
      </div>
    </section>
  );
}
