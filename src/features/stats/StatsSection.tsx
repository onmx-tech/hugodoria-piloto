import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Kicker } from "../../components/ui/Kicker";
import { OptimizedImage } from "../../components/media/OptimizedImage";
import { CountUp } from "./CountUp";
import { PODIUMS, TITLES } from "../../data/career";

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

      gsap.utils.toArray<HTMLElement>(".stats_title").forEach((el, i) => {
        gsap.from(el, {
          y: 24,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: ".stats_row", start: "top 88%" },
        });
      });
      gsap.from(".stats_podiums", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".stats_row", start: "top 88%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="carreira" ref={ref} className="relative bg-[#041221] py-24 md:py-32 overflow-hidden z-[2]">
      <div className="relative w-full max-w-[1400px] mx-auto px-5 md:px-10 lg:px-14">
        {/* Heading */}
        <div className="stats_heading max-w-[640px] mb-12 md:mb-16">
          <Kicker label="Carreira nas pistas" className="mb-7" />
          <h2 className="font-archivo-expanded font-extrabold text-[#e1dcd0] text-[clamp(28px,6vw,48px)] tracking-[-0.03em] uppercase leading-[1.0]">
            Trajetória no automobilismo
          </h2>
          <p className="font-['Inter',sans-serif] text-[15px] md:text-base text-[rgba(238,235,228,0.78)] leading-[1.65] mt-6">
            Competindo em ambientes de alta exigência, Hugo desenvolveu uma presença forte dentro e fora das pistas, unindo técnica e mentalidade competitiva.
          </p>
        </div>

        {/* Banda cinematográfica do carro */}
        <div className="stats_image relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-[#0a2138]">
          <OptimizedImage
            name="photo-car-track-front"
            alt="Carro de corrida de Hugo Netto na pista com adesivagem de patrocinadores"
            sizes="(max-width: 1400px) 100vw, 1400px"
            imgClassName="absolute inset-0 object-cover size-full"
          />
          <div className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(4,18,33,0) 0%, rgba(4,18,33,0.7) 100%)" }} />
          <div className="absolute left-5 md:left-8 bottom-5 md:bottom-7 flex items-center gap-3">
            <span className="font-archivo-expanded font-extrabold text-[#d86527] text-xl leading-none">#91</span>
            <span className="h-4 w-px bg-white/25" />
            <span className="font-archivo-expanded font-bold text-[#e1dcd0] text-[11px] md:text-xs tracking-[0.14em] uppercase leading-none">Mercedes-AMG GT · AMG Cup Brasil</span>
          </div>
        </div>

        {/* Palmarés */}
        <div className="stats_row grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-20 mt-14 md:mt-20 items-start">
          {/* Títulos, ano a ano */}
          <ul className="w-full">
            {TITLES.map((t) => (
              <li
                key={t.year}
                className="stats_title flex items-baseline gap-4 md:gap-8 py-4 md:py-5 border-t border-white/12 first:border-t-0"
              >
                <span
                  className={`font-archivo-expanded font-light text-[clamp(26px,7vw,40px)] leading-none tracking-[-0.03em] w-[2.6em] shrink-0 ${
                    t.highlight ? "text-[#d86527]" : "text-[#e1dcd0]/45"
                  }`}
                >
                  {t.year}
                </span>
                <span className="flex-1 min-w-0">
                  <span
                    className={`block font-archivo-expanded font-extrabold uppercase tracking-[-0.02em] leading-[1.1] text-[clamp(14px,3.4vw,19px)] ${
                      t.highlight ? "text-[#e1dcd0]" : "text-[#e1dcd0]/85"
                    }`}
                  >
                    {t.result}
                  </span>
                  <span className="block font-['Inter',sans-serif] text-[12px] md:text-[13px] text-[rgba(238,235,228,0.55)] leading-[1.5] mt-1">
                    {t.meta}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          {/* Pódios */}
          <div className="stats_podiums lg:border-l lg:border-white/12 lg:pl-16 lg:self-stretch flex flex-col justify-center">
            <p className="font-archivo-expanded font-light text-[#d86527] text-[clamp(56px,15vw,92px)] tracking-[-0.04em] leading-[0.9]">
              <CountUp value={PODIUMS.total} suffix="" />
            </p>
            <p className="font-archivo-expanded font-bold text-[#e1dcd0] text-[13px] tracking-[0.16em] uppercase leading-none mt-4">
              Pódios na carreira
            </p>
            <p className="font-['Inter',sans-serif] text-[13px] text-[rgba(238,235,228,0.6)] leading-[1.6] mt-3 max-w-[240px]">
              {PODIUMS.amgCup} deles na Mercedes-AMG Cup Brasil, a categoria que disputa hoje.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
