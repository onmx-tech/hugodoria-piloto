import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OptimizedImage } from "../../components/media/OptimizedImage";
import { Kicker } from "../../components/ui/Kicker";
import { FitText } from "./FitText";

const HERO_PHOTO = "photo-hero-celebration";
const HERO_ALT = "Hugo Netto comemorando com os braços erguidos após a vitória";

const META = [
  { k: "Equipe", v: "Mercedes-AMG GT" },
  { k: "Pódios", v: "12+" },
  { k: "Categorias", v: "50+" },
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
      className="relative h-[100svh] min-h-[640px] md:min-h-screen overflow-hidden flex flex-col"
      style={{ position: "sticky", top: 0, zIndex: 0, background: "#041221" }}
    >
      {/* Foto expandida por IA — nativa 16:9, preenche todo o hero */}
      <div className="hero_background absolute inset-0 scale-[1.02]">
        <OptimizedImage
          name={HERO_PHOTO}
          alt={HERO_ALT}
          sizes="100vw"
          priority
          imgClassName="absolute inset-0 object-cover size-full object-[50%_36%] brightness-[.8]"
        />
        {/* Escurecimento geral neutro: toma o céu claro sem tingir */}
        <div className="absolute inset-0 bg-[#041221]/28" />
        {/* Vinheta neutra para fechar as bordas amadoras */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(120% 100% at 50% 32%, rgba(4,18,33,0) 38%, rgba(4,18,33,0.45) 74%, rgba(4,18,33,0.85) 100%)" }} />
      </div>

      {/* Scrims para a tipografia */}
      <div className="absolute inset-x-0 bottom-0 h-[64%] z-[1] pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(4,18,33,0) 0%, rgba(4,18,33,0.74) 46%, #041221 100%)" }} />
      {/* Topo forte para o menu ficar legível sobre o céu */}
      <div className="absolute inset-x-0 top-0 h-[36%] z-[1] pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(4,18,33,0.9) 0%, rgba(4,18,33,0.45) 40%, rgba(4,18,33,0) 100%)" }} />

      {/* Conteúdo */}
      <div className="relative z-[2] flex flex-col h-full w-full px-5 md:px-10 lg:px-14">
        <Kicker label="Piloto Profissional" sub="AMG Cup Brasil · #91" className="hero_kicker pt-24 md:pt-28" />

        <div className="mt-auto w-full pb-10 md:pb-12">
          <p className="hero_subheading font-archivo-expanded font-extrabold text-[#eeebe4] text-lg md:text-2xl uppercase tracking-[-0.02em] leading-[1.05] mb-3 md:mb-4">
            Alta performance sob pressão
          </p>

          <FitText className="hero_heading" />

          <div className="hero_meta mt-6 md:mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 md:gap-x-8 border-t border-white/10 pt-5">
            {META.map((m) => (
              <div key={m.k} className="flex flex-col">
                <span className="font-archivo-expanded font-bold text-[#d86527] text-[9px] md:text-[10px] tracking-[0.16em] uppercase leading-none mb-1.5">{m.k}</span>
                <span className="font-archivo-expanded font-extrabold text-[#e1dcd0] text-sm md:text-lg uppercase tracking-[-0.01em] leading-none">{m.v}</span>
              </div>
            ))}
            <p className="hero_description font-['Inter',sans-serif] font-medium text-[13px] md:text-sm text-[#eeebe4]/70 leading-[1.5] max-w-[340px] md:ml-auto md:text-right">
              Velocidade, precisão e disciplina no limite — uma jornada entre controle, técnica e adrenalina.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
