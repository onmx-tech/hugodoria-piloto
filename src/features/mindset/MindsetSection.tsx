import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Kicker } from "../../components/ui/Kicker";
import { OptimizedImage } from "../../components/media/OptimizedImage";

const FEATURES = [
  { num: "01", title: "Foco Total", desc: "Concentração extrema em cada segundo. Nenhuma distração — apenas o objetivo à frente." },
  { num: "02", title: "Disciplina", desc: "Rotina rigorosa de treinos, alimentação e preparação mental. Cada detalhe conta." },
  { num: "03", title: "Resiliência", desc: "Superar adversidades nas pistas e fora delas com mentalidade de campeão." },
  { num: "04", title: "Estratégia", desc: "Cada ultrapassagem é calculada. Cada frenagem, precisa. Inteligência na pista." },
];

export function MindsetSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".mindset_heading > *", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".mindset_heading", start: "top 82%" },
      });

      gsap.utils.toArray<HTMLElement>(".mindset_card").forEach((card) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%" },
        });
      });

      gsap.from(".mindset_image", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".mindset_image", start: "top 85%" },
      });
      gsap.to(".mindset_image img", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="mentalidade"
      ref={ref}
      className="relative bg-gradient-to-b from-[#041221] to-[#072a51] overflow-hidden z-[2] py-24 md:py-32"
    >
      <div className="relative w-full max-w-[1400px] mx-auto px-5 md:px-10 lg:px-14">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
          {/* Foto natural */}
          <div className="mindset_image order-1">
            <div className="relative w-full aspect-[4/5] max-w-[460px] rounded-2xl overflow-hidden bg-[#0a2138]">
              <OptimizedImage
                name="photo-car-track-curve"
                alt="Carro de Hugo Netto traçando a curva com precisão"
                sizes="(max-width: 768px) 90vw, 460px"
                imgClassName="absolute inset-0 object-cover size-full object-[55%_50%]"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/4 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(4,18,33,0) 0%, rgba(4,18,33,0.7) 100%)" }} />
            </div>
          </div>

          {/* Conteúdo */}
          <div className="order-2">
            <div className="mindset_heading">
              <Kicker label="Mentalidade" className="mb-7" />
              <h2 className="font-archivo-expanded font-extrabold text-[#e1dcd0] text-[clamp(26px,5.5vw,40px)] tracking-[-0.03em] uppercase leading-[1.02] max-w-[520px]">
                O que define um piloto de alta performance?
              </h2>
            </div>

            <div className="mt-10 md:mt-12 grid sm:grid-cols-2 gap-x-10 gap-y-8">
              {FEATURES.map((f) => (
                <div key={f.num} className="mindset_card border-t border-white/12 pt-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-archivo-expanded font-extrabold text-[#d86527] text-sm tracking-[0.05em] leading-none">{f.num}</span>
                    <span className="h-px w-6 bg-[#d86527]/60" />
                    <h3 className="font-archivo-expanded font-extrabold text-[#e1dcd0] text-lg tracking-[-0.01em] uppercase leading-none">{f.title}</h3>
                  </div>
                  <p className="font-['Inter',sans-serif] text-[14px] text-[rgba(255,255,255,0.6)] leading-[1.6]">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
