import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Kicker } from "../../components/ui/Kicker";
import { FitText } from "./FitText";
import { CTAButton } from "../../components/navigation/CTAButton";

// Entrada em vídeo, pedido do Dr. Hugo em 13/11/2026 (referência: enzogianfratti.com).
// Fonte: reel DSLpL51jdCH da Flavia Aiala Assessoria, sem áudio. O celular recebe um recorte
// vertical do centro do mesmo vídeo: 3 MB em vez de 6 MB, e sem ampliar 1280px até a altura da tela.
const HERO_VIDEO = "/video/entrada-1280-v1.mp4";
const HERO_VIDEO_MOBILE = "/video/entrada-mobile-v1.mp4";
const HERO_POSTER = "/video/entrada-1280-v1.webp";

const META = [
  { k: "Equipe", v: "Mercedes-AMG GT" },
  { k: "Categoria", v: "AMG Cup Brasil" },
  { k: "Casa", v: "Interlagos" },
];

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Movimento reduzido: fica o pôster parado.
  const reduceMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduceMotion) return;
    // O React não grava `muted` como atributo; o Safari do iPhone só toca sozinho se a propriedade estiver ligada.
    v.muted = true;
    v.play().catch(() => {});
  }, [reduceMotion]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      // Celular sem zoom de entrada: a 125% os troféus passam por baixo do menu.
      if (window.innerWidth >= 768) tl.from(".hero_background video", { scale: 1.25, duration: 2, ease: "power2.out" }, 0);
      tl
        .from(".hero_kicker", { y: -20, opacity: 0, duration: 0.9, ease: "power3.out", clearProps: "all" }, 0.4)
        .from(".hero_subheading", { y: 24, opacity: 0, duration: 0.9, ease: "power3.out", clearProps: "all" }, 0.6)
        .from(".hero_heading .font-light", { x: -140, opacity: 0, duration: 1.3, ease: "expo.out", clearProps: "all" }, 0.5)
        .from(".hero_heading .text-\\[\\#d86527\\]", { x: 140, opacity: 0, duration: 1.3, ease: "expo.out", clearProps: "all" }, 0.5)
        .from(".hero_role", { y: 16, opacity: 0, duration: 0.9, ease: "power3.out", clearProps: "all" }, 0.8)
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
      className="relative md:sticky md:top-0 h-[100svh] md:min-h-screen overflow-hidden flex flex-col"
      style={{ zIndex: 0, background: "#041221" }}
    >
      <div className="hero_background absolute inset-0 overflow-hidden scale-[1.02]">
        <video
          ref={videoRef}
          className="absolute inset-0 size-full object-cover"
          poster={HERO_POSTER}
          muted
          loop
          playsInline
          autoPlay={!reduceMotion}
          preload={reduceMotion ? "none" : "auto"}
          aria-hidden="true"
          tabIndex={-1}
          disablePictureInPicture
        >
          <source src={HERO_VIDEO_MOBILE} type="video/mp4" media="(max-width: 767px)" />
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        {/* Escurecimento geral neutro: o vídeo tem muita tenda branca e céu claro */}
        <div className="absolute inset-0 bg-[#041221]/25" />
        {/* Vinheta neutra para fechar as bordas */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(120% 100% at 50% 32%, rgba(4,18,33,0) 38%, rgba(4,18,33,0.3) 74%, rgba(4,18,33,0.7) 100%)" }} />
      </div>

      {/* Scrims para a tipografia */}
      <div className="absolute inset-x-0 bottom-0 h-[64%] z-[1] pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(4,18,33,0) 0%, rgba(4,18,33,0.74) 46%, #041221 100%)" }} />
      {/* Topo forte para o menu ficar legível sobre o céu */}
      <div className="absolute inset-x-0 top-0 h-[36%] z-[1] pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(4,18,33,0.9) 0%, rgba(4,18,33,0.45) 40%, rgba(4,18,33,0) 100%)" }} />

      {/* Conteúdo */}
      <div className="relative z-[2] flex flex-col h-full w-full px-5 md:px-10 lg:px-14">
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
          {/* Celular: o kicker e a ficha somem, então quem ele é vem logo abaixo do nome (pedido do Dr. Hugo, 12/11/2026). */}
          <p className="hero_role md:hidden mt-3 font-archivo-expanded font-bold text-[#e1dcd0] text-[clamp(12px,3.4vw,15px)] uppercase tracking-[0.12em] leading-none">
            Piloto AMG Cup <span className="text-[#d86527]">·</span> Mercedes
          </p>

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
