import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Diamond } from "../../components/ui/Diamond";
import { OptimizedImage } from "../../components/media/OptimizedImage";

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about_heading h2", {
        x: -120,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: { trigger: ".about_heading", start: "top 75%", end: "top 40%", scrub: 1 },
      });
      gsap.from(".about_accent", {
        x: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about_accent", start: "top 80%", end: "top 50%", scrub: 1 },
      });
      gsap.from(".about_image", {
        scale: 0,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about_image", start: "top 80%" },
      });
      gsap.from(".about_description", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about_description", start: "top 80%", end: "top 50%", scrub: 1 },
      });
      gsap.from(".about_divider", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about_divider", start: "top 85%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="sobre" ref={ref} className="relative bg-[#041221] overflow-hidden md:min-h-screen flex items-center z-[2] snap-start snap-always">

      <div className="relative w-full max-w-[1920px] mx-auto px-4 md:px-[7.78%] pt-20 pb-10 md:py-20">
        <div className="flex flex-col items-center gap-14 md:grid md:grid-cols-[auto_1fr_1fr] md:items-center md:gap-[3%]">
          {/* Headline */}
          <div className="about_heading">
            <h2 className="font-archivo-expanded font-extrabold text-[#e1dcd0] text-[clamp(22px,7.5vw,28px)] md:text-[clamp(1.5rem,2.78vw,2.5rem)] tracking-[-0.03em] uppercase leading-[1.127] whitespace-nowrap">
              Alta<br />performance<br />não é só correr.
            </h2>
            <div className="about_accent flex items-center gap-[15px] -mt-0.5 justify-end md:justify-start md:ml-[3.3em]">
              <Diamond />
              <p className="font-archivo-expanded font-extrabold text-[#d86527] text-[clamp(22px,7.5vw,28px)] md:text-[clamp(1.5rem,2.78vw,2.5rem)] tracking-[-0.03em] uppercase leading-[1.127]">
                É dominar
              </p>
            </div>
          </div>

          {/* Oval helmet image */}
          <div className="about_image flex justify-center items-center w-full">
            <div className="relative w-full max-w-[343px] md:max-w-[320px] h-[196px] md:h-auto md:aspect-[246.3/140.8] rounded-[999px] md:rounded-[179.5px] pointer-events-none">
              <div aria-hidden="true" className="absolute inset-0 rounded-[999px] md:rounded-[179.5px] overflow-hidden">
                <div className="absolute bg-[#07315f] inset-0 rounded-[999px] md:rounded-[179.5px]" />
                <OptimizedImage name="helmet-dramatic" alt="Capacete de corrida de Hugo Netto em iluminacao dramatica" sizes="(max-width: 768px) 343px, 246px" imgClassName="absolute inset-0 object-cover size-full rounded-[999px] md:rounded-[179.5px]" />
              </div>
              <div aria-hidden="true" className="absolute border border-black inset-0 rounded-[999px] md:rounded-[179.5px]" />
            </div>
          </div>

          {/* Description */}
          <div className="about_description max-w-[374px]">
            <div className="about_divider bg-[#a84814] w-[44px] h-[4px] rounded-[3px] mb-4" />
            <p className="font-['Inter',sans-serif] font-semibold text-[14px] text-[rgba(238,235,228,0.83)] leading-[1.54]">
              Hugo Netto é piloto de alta performance, movido por disciplina, estratégia e controle emocional. Nas pistas, cada curva exige precisão absoluta e tomada de decisão em milésimos.{" "}
              <span className="text-[#eeebe4]">Mais do que velocidade, sua jornada é sobre performance real sob pressão.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
