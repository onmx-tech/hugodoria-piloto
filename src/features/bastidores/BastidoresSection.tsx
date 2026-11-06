import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Kicker } from "../../components/ui/Kicker";
import { OptimizedImage } from "../../components/media/OptimizedImage";

export function BastidoresSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".bastidores_item", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".bastidores_grid", start: "top 85%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="bastidores" ref={ref} className="relative bg-[#041221] py-20 md:py-28 z-[2]">
      <div className="w-full max-w-[1400px] mx-auto px-5 md:px-10 lg:px-14">
        <div className="grid md:grid-cols-[1fr_1fr] gap-x-16 gap-y-5 items-end mb-10 md:mb-14">
          <div>
            <Kicker label="Bastidores" sub="Paddock e box" className="mb-6" />
            <h2 className="font-archivo-expanded font-extrabold text-[#e1dcd0] text-[clamp(26px,4.6vw,52px)] tracking-[-0.03em] uppercase leading-[1.0]">
              Antes da largada
            </h2>
          </div>
          <p className="font-['Inter',sans-serif] text-[15px] md:text-base text-[rgba(238,235,228,0.78)] leading-[1.65] max-w-[460px]">
            O fim de semana de prova passa pelo paddock e pelo box, onde o piloto, a equipe e os convidados das marcas parceiras se encontram.
          </p>
        </div>

        <div className="bastidores_grid grid grid-cols-2 md:grid-cols-12 gap-2 md:gap-4">
          <div className="bastidores_item col-span-2 md:col-span-7 relative aspect-[3/2] rounded-2xl overflow-hidden bg-[#0a2138]">
            <OptimizedImage
              name="photo-box-equipe"
              alt="Hugo Netto de macacão preto no box, ao lado da equipe e do carro"
              sizes="(max-width: 768px) 100vw, 800px"
              imgClassName="absolute inset-0 object-cover size-full"
            />
          </div>
          <div className="bastidores_item col-span-1 md:col-span-5 relative aspect-square md:aspect-auto rounded-2xl overflow-hidden bg-[#0a2138]">
            <OptimizedImage
              name="photo-box-capacete"
              alt="Hugo Netto ajustando o capacete antes de entrar no carro"
              sizes="(max-width: 768px) 50vw, 560px"
              imgClassName="absolute inset-0 object-cover size-full object-[50%_30%]"
            />
          </div>
          <div className="bastidores_item col-span-1 md:col-span-5 relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-[#0a2138]">
            <OptimizedImage
              name="photo-box-carro"
              alt="Hugo Netto conferindo o carro na área de boxes"
              sizes="(max-width: 768px) 50vw, 560px"
              imgClassName="absolute inset-0 object-cover size-full"
            />
          </div>
          <div className="bastidores_item col-span-2 md:col-span-7 relative aspect-[3/2] md:aspect-auto rounded-2xl overflow-hidden bg-[#0a2138]">
            <OptimizedImage
              name="photo-paddock-conversa"
              alt="Conversa da equipe no paddock durante o fim de semana de prova"
              sizes="(max-width: 768px) 100vw, 800px"
              imgClassName="absolute inset-0 object-cover size-full object-[50%_30%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
