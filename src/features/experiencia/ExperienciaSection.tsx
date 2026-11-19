import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Kicker } from "../../components/ui/Kicker";

// Pedido do Dr. Hugo em 13/11/2026: o reel DRzi3xODhUp "rodando na home, embaixo".
// O vídeo é o convite da final de 2025 e mostra "21 DEZ 2025" na tela: por isso o kicker diz 2025.
// Se a assessoria mandar a versão 2026, trocar o arquivo por um nome novo (-v2): o nginx guarda /video/ por 30 dias.
const VIDEO = "/video/experiencia-2025-v1.mp4";
const POSTER = "/video/experiencia-2025-v1.webp";

export function ExperienciaSection() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [sound, setSound] = useState(false);
  const reduceMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".experiencia_reveal > *", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  // Toca só na tela: não baixa 8 MB de quem não chega aqui e não roda escondido.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduceMotion) return;
    v.muted = true;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduceMotion]);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !sound;
    v.muted = !next;
    // Com som, o convite começa do início.
    if (next) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
    setSound(next);
  };

  return (
    <section id="experiencia" ref={ref} className="relative bg-[#041221] border-t border-white/10 z-[2]">
      <div className="w-full max-w-[1400px] mx-auto px-5 md:px-10 lg:px-14 pt-20 md:pt-28">
        <div className="experiencia_reveal grid md:grid-cols-12 gap-6 md:gap-8 mb-10 md:mb-14">
          <div className="md:col-span-6">
            <Kicker label="Interlagos" sub="Final de 2025" className="mb-7" />
            <h2 className="font-archivo-expanded font-extrabold text-[#e1dcd0] text-[clamp(30px,4.35vw,68px)] tracking-[-0.03em] uppercase leading-[0.98]">
              Por dentro
              <span className="block text-[#d86527]">do #91.</span>
            </h2>
          </div>
          <p className="md:col-span-5 md:col-start-8 self-end font-['Inter',sans-serif] text-[15px] md:text-lg text-[rgba(238,235,228,0.86)] leading-[1.6]">
            Em 2025, parceiros e convidados viveram a última etapa no camarote e no paddock do #91. A Super Final de 20 de dezembro tem convites VIP, Experiência Paddock + Box e ativação no camarote.
          </p>
        </div>

        {/* No celular o botão de som fica abaixo do vídeo: em 390px ele cobria o piloto. */}
        <div className="experiencia_reveal relative">
          <div className="relative -mx-5 md:mx-0 aspect-video overflow-hidden md:rounded-2xl bg-black">
            <video
              ref={videoRef}
              className="absolute inset-0 size-full object-cover"
              src={VIDEO}
              poster={POSTER}
              muted
              loop
              playsInline
              preload="none"
              controls={reduceMotion}
              disablePictureInPicture
              aria-label="Vídeo da final de 2025 em Interlagos: pista, camarote e paddock do #91"
            />
          </div>
          {!reduceMotion && (
            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={sound}
              className="mt-4 md:mt-0 md:absolute md:left-6 md:bottom-6 flex items-center gap-2.5 rounded-full border border-white/20 bg-[#041221]/70 backdrop-blur-sm px-4 py-2.5 font-archivo-expanded font-bold text-[#eeebe4] text-[10px] md:text-[11px] tracking-[0.16em] uppercase leading-none transition-colors hover:border-[#d86527] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d86527]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M11 5 6 9H2v6h4l5 4V5z" fill="currentColor" stroke="none" />
                {sound ? (
                  <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" strokeLinecap="round" />
                ) : (
                  <path d="m22 9-6 6M16 9l6 6" strokeLinecap="round" />
                )}
              </svg>
              {sound ? "Desativar som" : "Ativar som"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
