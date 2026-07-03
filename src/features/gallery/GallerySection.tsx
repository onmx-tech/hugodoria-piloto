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
  { name: "photo-car-track-front", alt: "Carro de corrida de Hugo Netto em ação na reta da pista" },
  { name: "photo-podium-celebration", alt: "Hugo Netto comemorando com os braços erguidos após a vitória" },
  { name: "photo-sponsor-wall", alt: "Hugo Netto diante do painel de patrocinadores em dia de prova" },
  { name: "photo-helmet-mercedes-closeup", alt: "Detalhe do capacete de Hugo Netto antes de entrar no carro" },
  { name: "photo-car-track-curve", alt: "Carro de Hugo Netto inclinando na curva durante a corrida" },
  { name: "photo-driver-standing-car", alt: "Hugo Netto de macacão ao lado do carro de competição" },
  { name: "photo-team-podium-numbers", alt: "Equipe de Hugo Netto celebrando o resultado no pódio" },
  { name: "photo-trophy-suit", alt: "Hugo Netto com o troféu, em traje de gala da equipe" },
  { name: "photo-portrait-suit-seated", alt: "Retrato de Hugo Netto em traje formal" },
];

const bottomRow: GalleryImage[] = [
  { name: "photo-race-grid-start", alt: "Grid de largada com os carros alinhados na pista" },
  { name: "photo-driver-crouch-car", alt: "Hugo Netto agachado ao lado do carro de corrida" },
  { name: "photo-car-track-orange", alt: "Carro de Hugo Netto traçando a pista em alta velocidade" },
  { name: "photo-driver-trophy-asphalt", alt: "Hugo Netto com o troféu no asfalto após a corrida" },
  { name: "photo-track-landscape-wide", alt: "Vista ampla do autódromo durante o fim de semana de prova" },
  { name: "photo-driver-podium-board", alt: "Hugo Netto exibindo a colocação no pódio" },
  { name: "photo-car-track-action", alt: "Carro de Hugo Netto em plena ação na pista" },
  { name: "photo-driver-orange-car-standing", alt: "Hugo Netto de macacão em pé ao lado do carro laranja" },
  { name: "photo-speaker-presentation", alt: "Hugo Netto durante apresentação para convidados e patrocinadores" },
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
