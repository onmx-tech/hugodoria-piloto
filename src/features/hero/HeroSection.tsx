import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FitText } from "./FitText";

const FRAME_COUNT = 121;
const frameUrl = (i: number) => `/hero-helmet/h${String(i + 1).padStart(3, "0")}.webp`;

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    if (!hero || !canvas) return;
    const cctx = canvas.getContext("2d");
    if (!cctx) return;

    const images: HTMLImageElement[] = [];
    const state = { frame: 0 };
    let natW = 1280;
    let natH = 720;
    const isDesktop = window.innerWidth >= 768;

    const setSize = () => {
      const rect = hero.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      cctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = () => {
      const idx = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(state.frame)));
      const img = images[idx];
      const rect = hero.getBoundingClientRect();
      cctx.clearRect(0, 0, rect.width, rect.height);
      if (!img || !img.complete || !img.naturalWidth) return;
      // cover, alinhado ao topo (igual object-cover object-top da imagem original)
      const scale = Math.max(rect.width / natW, rect.height / natH);
      const w = natW * scale;
      const h = natH * scale;
      const dx = (rect.width - w) / 2;
      const dy = 0; // top-align
      cctx.drawImage(img, dx, dy, w, h);
    };

    let firstLoaded = false;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = frameUrl(i);
      img.onload = () => {
        if (!firstLoaded) {
          firstLoaded = true;
          natW = img.naturalWidth;
          natH = img.naturalHeight;
          setSize();
          render();
        }
      };
      images.push(img);
    }
    setSize();

    const ctx = gsap.context(() => {
      // Intro sequence — clearProps after to avoid residual inline styles
      const introTl = gsap.timeline({ delay: 0.2 });
      introTl
        .from(".hero_background", { scale: 1.3, duration: 2, ease: "power2.out" }, 0)
        .from(".hero_heading .font-light", { x: -200, opacity: 0, duration: 1.4, ease: "expo.out", clearProps: "all" }, 0.3)
        .from(".hero_heading .text-\\[\\#d86527\\]", { x: 200, opacity: 0, duration: 1.4, ease: "expo.out", clearProps: "all" }, 0.3)
        .from(".hero_subheading", { x: -60, opacity: 0, duration: 1, ease: "power3.out", clearProps: "all" }, 0.8)
        .from(".hero_description", { x: 60, opacity: 0, duration: 1, ease: "power3.out", clearProps: "all" }, 0.8)
        .from(".hero_nav", { y: -30, opacity: 0, duration: 0.8, ease: "power3.out", clearProps: "all" }, 0.5);

      if (isDesktop) {
        // Pin the hero and scrub the "putting the helmet on" sequence.
        // Page scroll resumes once the sequence completes.
        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "+=140%",
            scrub: 0.6,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
          },
        });
        pinTl
          .to(state, { frame: FRAME_COUNT - 1, ease: "none", onUpdate: render }, 0)
          // textos saem na segunda metade, deixando o piloto "pronto"
          .to(".hero_subheading", { opacity: 0, y: -40, ease: "none" }, 0.55)
          .to(".hero_description", { opacity: 0, y: -40, ease: "none" }, 0.55);
      }
    }, heroRef);

    const onResize = () => {
      setSize();
      render();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative h-[850px] md:h-screen overflow-hidden flex flex-col"
      style={{ background: "linear-gradient(180deg, #030B14 0%, #083362 60%, #041221 100%)" }}
    >
      {/* Background canvas (helmet sequence) with parallax */}
      <div className="hero_background absolute inset-0 md:scale-110">
        <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      </div>

      {/* Mobile: bottom gradient overlay */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 h-[392px] z-[1]" style={{ background: "linear-gradient(180deg, rgba(2,9,15,0) 19%, #02090F 80%)", opacity: 0.96 }} />

      {/* Mobile: Name overlapping image */}
      <div className="md:hidden absolute top-[112px] left-0 right-0 z-[2] px-4">
        <h1 className="hero_heading font-archivo-expanded text-[#e1dcd0] text-[clamp(48px,18.5vw,70px)] uppercase leading-[0.95] tracking-[-0.03em] text-center">
          <span className="font-light block">HUGO</span>
          <span className="font-extrabold text-[#d86527] block">NETTO</span>
        </h1>
      </div>

      {/* Mobile: Info at bottom */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 z-[2] flex flex-col items-center px-4 pb-14 pt-8 gap-4">
        <p className="hero_subheading font-archivo-expanded font-extrabold text-[#eeebe4] text-2xl uppercase tracking-[-0.03em] leading-[1.127] text-center">
          Piloto de Alta Performance
        </p>
        <p className="hero_description font-['Inter',sans-serif] font-semibold text-sm text-[#eeebe4] leading-[1.54] w-[271px] text-center">
          Velocidade, precisão e disciplina no limite. Uma jornada construída entre controle, técnica e adrenalina.
        </p>
      </div>

      {/* Desktop: content at bottom */}
      <div className="hidden md:block relative z-[2] mt-auto w-full">
        <div className="flex flex-row items-end justify-between gap-6 px-[6px] mb-6">
          <p className="hero_subheading font-archivo-expanded font-extrabold text-[#eeebe4] text-2xl uppercase tracking-[-0.72px] leading-[1.127] w-[251px] text-center">
            Piloto de Alta Performance
          </p>
          <p className="hero_description font-['Inter',sans-serif] font-semibold text-sm text-[#eeebe4] leading-[1.54] w-[249px] lg:mr-[18px]">
            Velocidade, precisão e disciplina no limite. Uma jornada construída entre controle, técnica e adrenalina.
          </p>
        </div>
        <FitText className="hero_heading" />
      </div>
    </section>
  );
}
