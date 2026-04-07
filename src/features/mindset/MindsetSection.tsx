import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OptimizedImage } from "../../components/media/OptimizedImage";
import { FeatureCard } from "./FeatureCard";

export function MindsetSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".mindset_heading", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".mindset_heading", start: "top 85%" },
      });

      const cards = gsap.utils.toArray(".mindset_card");
      cards.forEach((card) => {
        gsap.from(card as Element, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card as Element,
            start: "top 90%",
          },
        });
      });

      gsap.to(".mindset_background", {
        yPercent: 15,
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

  const leftFeatures = [
    { num: "01", title: "Foco Total", desc: "Concentração extrema em cada segundo. Nenhuma distração — apenas o objetivo à frente." },
    { num: "03", title: "Resiliência", desc: "Superar adversidades nas pistas e fora delas com mentalidade de campeão." },
  ];
  const rightFeatures = [
    { num: "02", title: "Disciplina", desc: "Rotina rigorosa de treinos, alimentação e preparação mental. Cada detalhe conta." },
    { num: "04", title: "Estratégia", desc: "Cada ultrapassagem é calculada. Cada frenagem, precisa. Inteligência na pista." },
  ];

  return (
    <section id="mentalidade" ref={ref} className="relative bg-gradient-to-b from-[#041221] to-[#072a51] overflow-hidden z-[2] md:min-h-[900px]" style={{ aspectRatio: undefined }}>
      <div className="hidden md:block" style={{ aspectRatio: "1440/1073" }} />

      {/* Full-bleed pilot image — desktop only */}
      <div className="mindset_background absolute inset-0 pointer-events-none z-[0] overflow-hidden hidden md:block">
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-32%] w-[124.8%] h-[122.6%]">
          <OptimizedImage
            name="driver-fullbody"
            alt="Hugo Netto em pose de corpo inteiro com traje de piloto"
            sizes="125vw"
            className="absolute inset-0 block size-full"
            imgClassName="absolute h-full left-[-14%] max-w-none top-0 w-[128%]"
          />
        </div>
      </div>

      {/* Title */}
      <div className="mindset_heading relative md:absolute md:top-[92px] md:left-1/2 md:-translate-x-1/2 text-center z-[3] w-full pt-14 md:pt-0 px-4 md:px-0">
        <p className="font-archivo-expanded font-bold text-[#d86527] text-[10px] tracking-[-0.3px] uppercase leading-[1.127]">MENTALIDADE</p>
        <h2 className="font-archivo-expanded font-extrabold text-[#e1dcd0] text-[clamp(22px,7.5vw,28px)] md:text-[32px] tracking-[-0.03em] md:tracking-[-0.96px] uppercase leading-[1.127] mt-[30px] md:mt-[40px] max-w-[343px] md:max-w-[568px] mx-auto">
          O que define um piloto de alta performance?
        </h2>
      </div>

      {/* Desktop cards */}
      <div className="hidden md:block absolute inset-0 z-[2]">
        <div className="absolute left-[7.78%] top-[44.1%] w-[24.3%]">
          <FeatureCard {...leftFeatures[0]} />
        </div>
        <div className="absolute right-[7.78%] top-[44.1%] w-[24.3%]">
          <FeatureCard {...rightFeatures[0]} />
        </div>
        <div className="absolute left-[7.78%] top-[74%] w-[24.3%]">
          <FeatureCard {...leftFeatures[1]} />
        </div>
        <div className="absolute right-[7.78%] top-[74%] w-[24.3%]">
          <FeatureCard {...rightFeatures[1]} />
        </div>
      </div>

      {/* Mobile: cards stacked + image */}
      <div className="md:hidden relative z-[2] px-4 pt-8">
        {[leftFeatures[0], rightFeatures[0], leftFeatures[1], rightFeatures[1]].map((f) => (
          <FeatureCard key={f.num} {...f} />
        ))}
        <div className="relative w-[calc(100%+32px)] -mx-4 mt-8 overflow-hidden h-[450px]">
          <OptimizedImage
            name="driver-fullbody"
            alt="Hugo Netto"
            sizes="500vw"
            imgClassName="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[500%] max-w-none h-auto"
          />
        </div>
      </div>
    </section>
  );
}
