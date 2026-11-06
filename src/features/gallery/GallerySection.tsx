import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OptimizedImage } from "../../components/media/OptimizedImage";
import { images } from "../../generated/image-manifest";

type GalleryImage = { name: string; alt: string };

// Fotos reais do Hugo Netto — mistura retrato/paisagem.
// A largura de cada card é derivada do aspect-ratio real (altura fixa),
// então retratos e paisagens convivem sem corte.
const topRow: GalleryImage[] = [
  { name: "photo-pista-dia-curva", alt: "Carro #91 contornando a curva em dia de prova" },
  { name: "photo-pista-noite-lateral", alt: "Carro #91 na reta em prova noturna" },
  { name: "photo-pista-disputa", alt: "Carro #91 em disputa de posição" },
  { name: "photo-pit-noite", alt: "Carro #91 parado na frente do box, à noite" },
  { name: "photo-pista-saida-curva", alt: "Carro #91 saindo da curva" },
  { name: "photo-pista-noite-zebra", alt: "Carro #91 sobre a zebra em prova noturna" },
  { name: "photo-pit-dia", alt: "Carro #91 na frente dos boxes" },
  { name: "photo-pista-reta-grid", alt: "Carros alinhados na reta dos boxes" },
];

const bottomRow: GalleryImage[] = [
  { name: "photo-podio-trofeu", alt: "Hugo Netto com o troféu no pódio da AMG Cup Brasil" },
  { name: "photo-preparacao-box", alt: "Hugo Netto com a equipe no box" },
  { name: "photo-trofeus-capo", alt: "Troféus sobre o capô do carro #91" },
  { name: "photo-box-retrato", alt: "Hugo Netto de capacete no box" },
  { name: "photo-numero-91-capo", alt: "Hugo Netto ao lado do carro #91 e dos troféus" },
  { name: "photo-radio-noite", alt: "Hugo Netto com fones de rádio na prova noturna" },
  { name: "photo-box-briefing", alt: "Hugo Netto conversando com a equipe ao lado do carro" },
  { name: "photo-pit-entrada", alt: "Carro #91 na entrada dos boxes, à noite" },
];

function aspectOf(name: string): number {
  const e = images[name];
  return e && e.height ? e.width / e.height : 16 / 9;
}

function GalleryCard({ img }: { img: GalleryImage }) {
  return (
    <div
      className="gallery_item h-[200px] sm:h-[300px] md:h-[420px] shrink-0 rounded-[8px] md:rounded-xl overflow-hidden relative bg-[#192a3c]"
      style={{ aspectRatio: aspectOf(img.name) }}
    >
      <OptimizedImage
        name={img.name}
        alt={img.alt}
        sizes="(max-width: 768px) 60vw, 612px"
        imgClassName="absolute inset-0 object-cover size-full"
      />
    </div>
  );
}

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

  return (
    <section id="galeria" ref={ref} className="relative bg-[#041221] overflow-hidden h-auto py-4 md:py-0 md:h-screen flex flex-col justify-center z-[2]">

      <div className="gallery_grid relative">
        {/* Top row ticker */}
        <div className="gallery_row-top overflow-hidden">
          <div className="flex gap-1 md:gap-6 is-gallery-right w-max">
            {[...topRow, ...topRow].map((img, i) => (
              <GalleryCard key={`top-${i}`} img={img} />
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
            {[...bottomRow, ...bottomRow].map((img, i) => (
              <GalleryCard key={`bot-${i}`} img={img} />
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
          animation: galleryRight 60s linear infinite;
        }
        .is-gallery-left {
          animation: galleryLeft 60s linear infinite;
        }
      `}</style>
    </section>
  );
}
