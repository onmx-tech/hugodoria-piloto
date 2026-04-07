import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "../../components/ui/SectionLabel";
import { OptimizedImage } from "../../components/media/OptimizedImage";
import { StatItem } from "./StatItem";

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stats_heading", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".stats_heading", start: "top 80%" },
      });

      const stats = gsap.utils.toArray(".stats_item");
      stats.forEach((el, i) => {
        gsap.from(el as Element, {
          x: i % 2 === 0 ? -80 : 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el as Element, start: "top 85%" },
        });
      });

      gsap.fromTo(".stats_image", {
        yPercent: 20,
        scale: 0.9,
      }, {
        yPercent: -15,
        scale: 1,
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
    <section id="carreira" ref={ref} className="relative bg-[#041221] py-28 md:py-32 overflow-hidden z-[2]">

      {/* Trajectory heading */}
      <div className="stats_heading relative text-center max-w-[689px] mx-auto px-4 md:px-5 mb-14 md:mb-28">
        <SectionLabel>carreira nas pistas</SectionLabel>
        <h2 className="font-archivo-expanded font-extrabold text-[#e1dcd0] text-[clamp(22px,7.5vw,28px)] md:text-[32px] tracking-[-0.03em] uppercase leading-[1.127] mt-6">
          TRAJETÓRIA NO AUTOMOBILISMO
        </h2>
        <p className="font-['Inter',sans-serif] font-semibold text-sm text-[rgba(238,235,228,0.83)] leading-[1.54] mt-6">
          Competindo em ambientes de alta exigência, Hugo desenvolveu uma presença forte dentro e fora das pistas, unindo técnica e mentalidade competitiva.
        </p>
      </div>

      {/* Stats + car */}
      <div className="relative max-w-[1920px] mx-auto px-4 md:px-[7.78%]">
        <div className="flex justify-between gap-8">
          <StatItem value="50+" label="Categorias disputadas" />
          <StatItem value="12+" label="Pódios" />
        </div>

        <div className="stats_image relative mx-auto mt-8 md:-mt-16 max-w-[1198px] aspect-[1198/684] mix-blend-screen pointer-events-none">
          <OptimizedImage name="car-360-view" alt="Carro de corrida de Hugo Netto em vista 360 graus com adesivagem de patrocinadores" sizes="(max-width: 768px) 100vw, 1198px" imgClassName="absolute inset-0 object-contain size-full" />
        </div>

        <div className="flex justify-between gap-8 mt-8 md:-mt-16">
          <StatItem value="15+" label="Autódromos" />
          <StatItem value="10+" label="Primeiro Lugar" />
        </div>
      </div>
    </section>
  );
}
