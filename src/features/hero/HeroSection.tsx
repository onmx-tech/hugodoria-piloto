import { useEffect } from "react";
import { gsap } from "gsap";
import { OptimizedImage } from "../../components/media/OptimizedImage";
import { Kicker } from "../../components/ui/Kicker";
import { FitText } from "./FitText";
import { CTAButton } from "../../components/navigation/CTAButton";

// Laterais (treliça e chão) estendidas por IA: o pódio cabe inteiro em tela 16:9. Pilotos e degraus são o original.
const HERO_PHOTO = "photo-podio-primeiro-lugar-amplo";
// Celular: degraus 2, 1 e 3 com céu e chão estendidos por IA em cima e embaixo; o nome fica sobre o chão.
const HERO_PHOTO_MOBILE = "photo-podio-primeiro-lugar-mobile";
const HERO_ALT = "Hugo Netto no degrau mais alto do pódio da AMG Cup Brasil, entre os cinco primeiros colocados";

const META = [
  { k: "Equipe", v: "Mercedes-AMG GT" },
  { k: "Categoria", v: "AMG Cup Brasil" },
  { k: "Casa", v: "Interlagos" },
];

export function HeroSection() {
  // Sem wrapper: o hero precisa ser filho direto do <main> para o sticky segurar a página inteira.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero_background img", { scale: 1.12, duration: 2, ease: "power2.out", delay: 0.15 });
      // O nome está logo abaixo da foto: entra quando aparece, não no carregamento.
      gsap.timeline({ scrollTrigger: { trigger: ".hero_intro", start: "top 92%" } })
        .from(".hero_kicker", { y: -20, opacity: 0, duration: 0.9, ease: "power3.out", clearProps: "all" }, 0)
        .from(".hero_subheading", { y: 24, opacity: 0, duration: 0.9, ease: "power3.out", clearProps: "all" }, 0.1)
        .from(".hero_heading .font-light", { x: -140, opacity: 0, duration: 1.3, ease: "expo.out", clearProps: "all" }, 0)
        .from(".hero_heading .text-\\[\\#d86527\\]", { x: 140, opacity: 0, duration: 1.3, ease: "expo.out", clearProps: "all" }, 0)
        .from(".hero_meta > *", { y: 20, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power3.out", clearProps: "all" }, 0.4);
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Assessoria, 10/11/2026: com texto por cima a foto virava close no celular e o nome cobria os números.
          A foto fica sozinha, sem nada em cima: troféus no alto e degraus inteiros. O nome vem logo abaixo. */}
      <section
        id="inicio"
        className="hero_background relative md:sticky md:top-0 md:h-[100svh] md:min-h-[640px] overflow-hidden"
        style={{ zIndex: 0, background: "#041221" }}
      >
        <div className="relative aspect-[2260/5052] md:aspect-auto md:h-full overflow-hidden">
          <OptimizedImage
            name={HERO_PHOTO}
            mobileName={HERO_PHOTO_MOBILE}
            alt={HERO_ALT}
            sizes="max(100vw, 190svh)"
            priority
            imgClassName="absolute inset-0 object-cover size-full object-[50%_0%] md:object-[51%_50%]"
          />
          <div className="absolute inset-0 bg-[#041221]/10" />
          {/* Só o alto escurece, para o menu ler sobre o céu claro */}
          {/* Celular: o chão estendido escurece para receber o nome, abaixo dos números */}
          <div className="absolute inset-x-0 bottom-0 h-[37%] md:hidden pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(4,18,33,0) 0%, rgba(4,18,33,0.8) 14%, rgba(4,18,33,0.92) 28%, #041221 55%)" }} />
          <div className="absolute inset-x-0 top-0 h-[18%] pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(4,18,33,0.55) 0%, rgba(4,18,33,0) 100%)" }} />
        </div>
      </section>

      {/* No celular o bloco sobe para dentro da foto, sobre o chão estendido (a foto tem 223vw de altura e o chão começa em 142vw) */}
      <section className="hero_intro relative -mt-[78vw] md:mt-0 md:bg-[#041221] z-[2]">
        <div className="w-full max-w-[1400px] mx-auto px-5 md:px-10 lg:px-14 pt-6 md:pt-16 pb-4">
          <Kicker label="Piloto Profissional" sub="AMG Cup Brasil · #91" className="hero_kicker hidden md:flex mb-8" />

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
      </section>
    </>
  );
}
