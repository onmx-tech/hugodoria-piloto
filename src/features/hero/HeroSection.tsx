import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { OptimizedImage } from "../../components/media/OptimizedImage";
import { Kicker } from "../../components/ui/Kicker";
import { FitText } from "./FitText";
import { CTAButton } from "../../components/navigation/CTAButton";

const HERO_PHOTO = "photo-podio-primeiro-lugar";
const HERO_ALT = "Hugo Netto no degrau mais alto do pódio da AMG Cup Brasil, entre os cinco primeiros colocados";

const META = [
  { k: "Equipe", v: "Mercedes-AMG GT" },
  { k: "Categoria", v: "AMG Cup Brasil" },
  { k: "Casa", v: "Interlagos" },
];

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.from(".hero_background img", { scale: 1.25, duration: 2, ease: "power2.out" }, 0)
        .from(".hero_kicker", { y: -20, opacity: 0, duration: 0.9, ease: "power3.out", clearProps: "all" }, 0.4)
        .from(".hero_subheading", { y: 24, opacity: 0, duration: 0.9, ease: "power3.out", clearProps: "all" }, 0.6)
        .from(".hero_heading .font-light", { x: -140, opacity: 0, duration: 1.3, ease: "expo.out", clearProps: "all" }, 0.5)
        .from(".hero_heading .text-\\[\\#d86527\\]", { x: 140, opacity: 0, duration: 1.3, ease: "expo.out", clearProps: "all" }, 0.5)
        .from(".hero_meta > *", { y: 20, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power3.out", clearProps: "all" }, 0.9)
        .from(".hero_description", { y: 20, opacity: 0, duration: 0.9, ease: "power3.out", clearProps: "all" }, 0.95);
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative h-[100svh] min-h-[640px] md:min-h-screen overflow-hidden flex flex-col md:flex-row"
      style={{ position: "sticky", top: 0, zIndex: 0, background: "#041221" }}
    >
      {/* Assessoria, 10/11/2026: no fundo cortado a foto virava "close" nele e o texto cobria o pódio.
          A foto agora tem lugar próprio, sem texto em cima: troféus no alto e degraus 2, 1 e 3 inteiros. */}
      <div className="hero_background relative order-1 md:order-2 flex-1 min-h-0 mt-[84px] md:mt-0 md:flex-none md:h-full md:w-[min(56vw,80svh)] overflow-hidden">
        <OptimizedImage
          name={HERO_PHOTO}
          alt={HERO_ALT}
          sizes="(max-width: 768px) 100vw, 56vw"
          priority
          imgClassName="absolute inset-0 object-cover size-full object-[54%_50%]"
        />
        <div className="absolute inset-0 bg-[#041221]/10" />
      </div>

      {/* Conteúdo */}
      <div className="relative order-2 md:order-1 flex flex-col md:flex-1 md:min-w-0 px-5 md:px-10 lg:px-14">
        <Kicker label="Piloto Profissional" sub="AMG Cup Brasil · #91" className="hero_kicker pt-6 md:pt-28" />

        <div className="mt-auto w-full pt-5 pb-8 md:pt-0 md:pb-12">
          {/* O fato de hoje: a temporada 2026 e a Super Final. */}
          <div className="hero_subheading mb-4 md:mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 md:gap-x-6">
            <p className="font-archivo-expanded font-extrabold text-[#eeebe4] text-[clamp(17px,4.6vw,32px)] uppercase tracking-[-0.02em] leading-[1.02]">
              <span className="text-[#d86527]">2 vitórias</span> em 2026
            </p>
            <p className="font-archivo-expanded font-extrabold text-[#eeebe4] text-[clamp(13px,3vw,19px)] uppercase tracking-[-0.01em] leading-[1.1]">
              Pódio em todas as etapas
            </p>
            <p className="w-full font-archivo-expanded font-bold text-[#eeebe4]/80 text-[clamp(11px,2.6vw,15px)] uppercase tracking-[0.06em] leading-[1.3]">
              Super Final em 20 de dezembro
            </p>
          </div>

          <FitText className="hero_heading" />

          <div className="hero_meta mt-5 md:mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 md:gap-x-8 border-t border-white/10 pt-5">
            {META.map((m) => (
              <div key={m.k} className="hidden md:flex flex-col">
                <span className="font-archivo-expanded font-bold text-[#d86527] text-[9px] md:text-[10px] tracking-[0.16em] uppercase leading-none mb-1.5">{m.k}</span>
                <span className="font-archivo-expanded font-extrabold text-[#e1dcd0] text-sm md:text-base uppercase tracking-[-0.01em] leading-none">{m.v}</span>
              </div>
            ))}
            {/* O objetivo da página é patrocínio: a porta de entrada já no hero. */}
            <div className="hero_description w-full flex md:mt-3">
              <CTAButton>Seja patrocinador</CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
