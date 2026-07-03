import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Diamond } from "../../components/ui/Diamond";
import { Kicker } from "../../components/ui/Kicker";
import { OptimizedImage } from "../../components/media/OptimizedImage";

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about_heading > *", {
        x: -80,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about_heading", start: "top 78%" },
      });
      gsap.from(".about_image", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about_image", start: "top 82%" },
      });
      gsap.from(".about_description > *", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about_description", start: "top 82%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sobre"
      ref={ref}
      className="relative bg-[#041221] overflow-hidden md:min-h-screen flex items-center z-[2] snap-start snap-always"
    >
      <div className="relative w-full max-w-[1400px] mx-auto px-5 md:px-10 lg:px-14 py-24 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
          {/* Texto */}
          <div className="order-2 md:order-1">
            <div className="about_heading">
              <Kicker label="Sobre" sub="O Piloto" className="mb-8" />
              <h2 className="font-archivo-expanded font-extrabold text-[#e1dcd0] text-[clamp(30px,7vw,52px)] tracking-[-0.03em] uppercase leading-[0.98]">
                Alta performance<br />não é só correr.
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <Diamond />
                <p className="font-archivo-expanded font-extrabold text-[#d86527] text-[clamp(30px,7vw,52px)] tracking-[-0.03em] uppercase leading-[0.98]">
                  É dominar
                </p>
              </div>
            </div>

            <div className="about_description mt-9 md:mt-11 max-w-[460px]">
              <span className="block bg-[#d86527] w-11 h-1 rounded mb-5" />
              <p className="font-['Inter',sans-serif] text-[15px] md:text-base text-[rgba(238,235,228,0.78)] leading-[1.65]">
                Hugo Netto é piloto de alta performance, movido por disciplina, estratégia e controle emocional. Nas pistas, cada curva exige precisão absoluta e decisão em milésimos.
              </p>
              <p className="font-['Inter',sans-serif] text-[15px] md:text-base text-[#eeebe4] font-medium leading-[1.65] mt-4">
                Mais do que velocidade, sua jornada é sobre performance real sob pressão — dentro e fora do carro.
              </p>
            </div>
          </div>

          {/* Foto natural enquadrada */}
          <div className="about_image order-1 md:order-2">
            <div className="relative w-full aspect-[4/5] max-w-[440px] md:ml-auto rounded-2xl overflow-hidden bg-[#0a2138]">
              <OptimizedImage
                name="photo-driver-standing-car"
                alt="Hugo Netto de macacão ao lado do carro de competição"
                sizes="(max-width: 768px) 90vw, 440px"
                imgClassName="absolute inset-0 object-cover size-full object-[50%_25%]"
              />
              {/* Base sutil para a legenda */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(4,18,33,0) 0%, rgba(4,18,33,0.85) 100%)" }} />
              <div className="absolute left-5 bottom-5 flex items-center gap-3">
                <span className="font-archivo-expanded font-extrabold text-[#d86527] text-lg leading-none">#91</span>
                <span className="h-4 w-px bg-white/25" />
                <span className="font-archivo-expanded font-bold text-[#e1dcd0] text-[11px] tracking-[0.14em] uppercase leading-none">Mercedes-AMG GT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
