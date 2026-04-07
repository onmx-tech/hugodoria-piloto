import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OptimizedImage } from "../../components/media/OptimizedImage";

export function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery_heading", {
        y: 60,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        },
      });

      gsap.from(".gallery_grid", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".gallery_grid", start: "top 85%" },
      });

      if (window.innerWidth >= 768) {
        gsap.to(".gallery_row-top", {
          x: -60,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(".gallery_row-bottom", {
          x: 60,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  const topRow = [
    { name: "driver-calm-race", alt: "Hugo Netto concentrado antes da largada em dia de corrida" },
    { name: "creation-car-front", alt: "Vista frontal do carro de corrida de Hugo Netto com adesivagem completa" },
    { name: "creation-interior", alt: "Interior do cockpit do carro de corrida com volante e painel" },
  ];
  const bottomRow = [
    { name: "helmet-closeup", alt: "Detalhe do capacete personalizado de Hugo Netto com pintura exclusiva" },
    { name: "creation-aerial", alt: "Vista aerea do carro de corrida de Hugo Netto na pista" },
    { name: "creation-engine", alt: "Motor preparado do carro de competicao de Hugo Netto" },
  ];

  return (
    <section id="galeria" ref={ref} className="relative bg-[#041221] overflow-hidden h-auto py-4 md:py-0 md:h-screen flex flex-col justify-center z-[2]">

      <div className="gallery_grid relative">
        {/* Top row ticker */}
        <div className="gallery_row-top overflow-hidden">
          <div className="flex gap-1 md:gap-6 is-gallery-right w-max">
            {[...topRow, ...topRow, ...topRow, ...topRow, ...topRow, ...topRow].map((img, i) => (
              <div key={`top-${i}`} className="gallery_item aspect-video w-[95vw] sm:w-[45vw] md:w-[612px] shrink-0 rounded-[8px] md:rounded-xl overflow-hidden relative bg-[#192a3c]">
                <OptimizedImage name={img.name} alt={img.alt} sizes="612px" imgClassName="absolute inset-0 object-cover size-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Title overlay */}
        <div className="absolute inset-0 z-[3] flex items-center justify-center pointer-events-none" style={{ mixBlendMode: "difference" }}>
          <h2 className="gallery_heading font-archivo-expanded font-extrabold text-[#e1dcd0] text-[clamp(28px,10vw,38px)] md:text-[clamp(1.5rem,4vw,58px)] text-center tracking-[-0.03em] uppercase leading-[1.127] max-w-[533px] px-5">
            Entre velocidade e precisão
          </h2>
        </div>

        <div className="h-1 md:h-6" />

        {/* Bottom row ticker */}
        <div className="gallery_row-bottom overflow-hidden">
          <div className="flex gap-1 md:gap-6 is-gallery-left w-max">
            {[...bottomRow, ...bottomRow, ...bottomRow, ...bottomRow, ...bottomRow, ...bottomRow].map((img, i) => (
              <div key={`bot-${i}`} className="gallery_item aspect-video w-[95vw] sm:w-[45vw] md:w-[612px] shrink-0 rounded-[8px] md:rounded-xl overflow-hidden relative bg-[#192a3c]">
                <OptimizedImage name={img.name} alt={img.alt} sizes="612px" imgClassName="absolute inset-0 object-cover size-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes galleryRight {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes galleryLeft {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .is-gallery-right {
          animation: galleryRight 30s linear infinite;
        }
        .is-gallery-left {
          animation: galleryLeft 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
