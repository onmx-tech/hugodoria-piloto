import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Kicker } from "../../components/ui/Kicker";
import { OptimizedImage } from "../../components/media/OptimizedImage";
import { StatItem } from "./StatItem";

const STATS = [
  { value: "50+", label: "Categorias disputadas" },
  { value: "12+", label: "Pódios" },
  { value: "15+", label: "Autódromos" },
  { value: "10+", label: "Primeiro lugar" },
];

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

      gsap.utils.toArray<HTMLElement>(".stats_item").forEach((el, i) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".stats_row", start: "top 88%" },
        });
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

        {/* Linha de stats */}
        <div className="stats_row grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 mt-14 md:mt-16">
          {STATS.map((s) => (
            <StatItem key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
