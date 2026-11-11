import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OptimizedImage } from "../../components/media/OptimizedImage";
import { Kicker } from "../../components/ui/Kicker";
import { FitText } from "./FitText";
import { CTAButton } from "../../components/navigation/CTAButton";

const HERO_PHOTO = "photo-podio-primeiro-lugar";
// Celular (11/11/2026): degraus 2, 1 e 3 com o céu estendido por IA em cima; a foto termina nos números.
// O Dr. Hugo pediu tirar o chão ("ar pobre, não parece um palanque elegante"): o nome vem abaixo, no azul.
// Pilotos, troféus e números são os pixels originais. O desktop segue como estava.
const HERO_PHOTO_MOBILE = "photo-podio-primeiro-lugar-mobile";
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

      if (window.innerWidth >= 768) {
        gsap.to(".hero_background", {
          yPercent: 20,
          ease: "none",
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
        });
      }
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative md:sticky md:top-0 md:h-[100svh] md:min-h-screen overflow-hidden flex flex-col"
      style={{ zIndex: 0, background: "#041221" }}
    >
      {/* O pódio inteiro com ele no 1, pedido da assessoria em 10/11/2026: a foto anterior era "muito foco nele" */}
      <div className="hero_background absolute inset-x-0 top-0 aspect-[2260/3060] overflow-hidden md:inset-0 md:aspect-auto scale-[1.02]">
        <OptimizedImage
          name={HERO_PHOTO}
          mobileName={HERO_PHOTO_MOBILE}
          alt={HERO_ALT}
          sizes="max(100vw, 150svh)"
          priority
          imgClassName="absolute inset-0 object-cover size-full object-[50%_0%] md:object-[50%_20%]"
        />
        {/* Escurecimento geral neutro: toma o céu claro sem tingir */}
        <div className="absolute inset-0 hidden md:block bg-[#041221]/10" />
        {/* Vinheta neutra para fechar as bordas amadoras */}
        <div className="absolute inset-0 hidden md:block" style={{ background: "radial-gradient(120% 100% at 50% 32%, rgba(4,18,33,0) 38%, rgba(4,18,33,0.3) 74%, rgba(4,18,33,0.7) 100%)" }} />
      </div>

      {/* Scrims para a tipografia */}
      {/* Celular: a base preta dos degraus funde no azul, sem tocar nos números */}
      <div className="absolute inset-x-0 top-0 aspect-[2260/3060] z-[1] md:hidden pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(4,18,33,0) 96%, #041221 100%)" }} />
      <div className="absolute inset-x-0 bottom-0 h-[64%] z-[1] hidden md:block pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(4,18,33,0) 0%, rgba(4,18,33,0.74) 46%, #041221 100%)" }} />
      {/* Topo forte para o menu ficar legível sobre o céu */}
      <div className="absolute inset-x-0 top-0 h-[36%] z-[1] hidden md:block pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(4,18,33,0.9) 0%, rgba(4,18,33,0.45) 40%, rgba(4,18,33,0) 100%)" }} />

      {/* Conteúdo */}
      {/* No celular a foto ocupa o topo com a altura dela; o texto vem logo abaixo */}
      <div className="relative z-[2] flex flex-col h-auto md:h-full w-full px-5 md:px-10 lg:px-14">
        <div className="md:hidden -mx-5 aspect-[2260/3060]" />
        <Kicker label="Piloto Profissional" sub="AMG Cup Brasil · #91" className="hero_kicker hidden md:flex pt-28" />

        <div className="mt-auto w-full pt-8 md:pt-0 pb-16 md:pb-12">
          {/* O fato de hoje: a temporada 2026 e a Super Final. */}
          <div className="hero_subheading mb-4 md:mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 md:gap-x-6">
            <p className="font-archivo-expanded font-extrabold text-[#eeebe4] text-[clamp(17px,4.6vw,32px)] uppercase tracking-[-0.02em] leading-[1.02]">
              <span className="text-[#d86527]">2 vitórias</span> em 2026
            </p>
            <span className="hidden md:block h-6 w-px bg-white/25" />
            <p className="font-archivo-expanded font-extrabold text-[#eeebe4] text-[clamp(13px,3vw,19px)] uppercase tracking-[-0.01em] leading-[1.1]">
              Pódio em todas as etapas
            </p>
            <span className="hidden md:block h-6 w-px bg-white/25" />
            <p className="font-archivo-expanded font-bold text-[#eeebe4]/80 text-[clamp(11px,2.6vw,15px)] uppercase tracking-[0.06em] leading-[1.3]">
              Super Final em 20 de dezembro
            </p>
          </div>

          <FitText className="hero_heading" />

          <div className="hero_meta mt-6 md:mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 md:gap-x-8 border-t border-white/10 pt-5">
            {META.map((m) => (
              <div key={m.k} className="hidden md:flex flex-col">
                <span className="font-archivo-expanded font-bold text-[#d86527] text-[9px] md:text-[10px] tracking-[0.16em] uppercase leading-none mb-1.5">{m.k}</span>
                <span className="font-archivo-expanded font-extrabold text-[#e1dcd0] text-sm md:text-lg uppercase tracking-[-0.01em] leading-none">{m.v}</span>
              </div>
            ))}
            {/* O objetivo da página é patrocínio: a porta de entrada já no hero. */}
            <div className="hero_description w-full md:w-auto md:ml-auto flex">
              <CTAButton>Seja patrocinador</CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
