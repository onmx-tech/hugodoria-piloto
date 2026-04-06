import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import svgPaths from "../imports/Piloto-1/svg-ncf91yh9cy";
import { OptimizedImage } from "./components/OptimizedImage";
import { GrainOverlay } from "./components/GrainOverlay";

gsap.registerPlugin(ScrollTrigger);

/* ─── Decorative diamond icon ─── */
function Diamond({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center size-5 ${className}`}>
      <div className="-rotate-45">
        <div className="bg-[#a84814] rounded-[3px] size-3.5" />
      </div>
    </div>
  );
}

/* ─── Down arrow SVG ─── */
function DownArrow() {
  return (
    <svg className="size-6" fill="none" viewBox="0 0 24 24">
      <path d="M6.5 17L11.5 12L6.5 7" opacity="0.4" stroke="#D86527" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M12.5 17L17.5 12L12.5 7" stroke="#D86527" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

/* ─── Section label (e.g. "MENTALIDADE") ─── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-['Archivo_Expanded',sans-serif] font-bold text-[#d86527] text-[10px] md:text-xs tracking-[-0.3px] uppercase leading-[1.127]">
      {children}
    </p>
  );
}

/* ─── Section heading ─── */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-['Archivo_Expanded',sans-serif] font-extrabold text-[#e1dcd0] text-2xl md:text-[32px] tracking-[-0.96px] uppercase leading-[1.127]">
      {children}
    </h2>
  );
}

/* ─── Navbar ─── */
function Navbar() {
  return (
    <nav className="absolute top-5 left-5 right-5 md:left-7 md:right-7 flex items-center justify-between z-10">
      <div className="bg-white/12 flex items-center px-3 md:px-4 py-3 rounded-md gap-0 overflow-x-auto">
        {["Sobre", "Títulos"].map((item) => (
          <a key={item} href="#" className="px-3 md:px-4 py-2 shrink-0">
            <span className={`font-['Archivo_Condensed',sans-serif] font-extrabold text-sm uppercase ${item === "Sobre" ? "text-white" : "text-[#949da6]"}`}>
              {item}
            </span>
          </a>
        ))}
        <a href="#" className="flex gap-0.5 items-center px-3 md:px-4 py-2 shrink-0">
          <span className="font-['Archivo_Condensed',sans-serif] font-extrabold text-[#949da6] text-sm uppercase">Campeonato</span>
          <svg className="size-6" fill="none" viewBox="0 0 24 24">
            <path d="M8 10L12 14L16 10" stroke="#B7BDC4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </a>
        <a href="#" className="px-3 md:px-4 py-2 shrink-0 hidden sm:block">
          <span className="font-['Archivo_Condensed',sans-serif] font-extrabold text-[#949da6] text-sm uppercase">Novidades</span>
        </a>
      </div>
      <a href="#" className="bg-[#d86527] rounded-md shrink-0 flex gap-3 items-center px-5 md:px-6 py-3">
        <Diamond />
        <span className="font-['Archivo_Expanded',sans-serif] font-extrabold text-[#eeebe4] text-[13px] tracking-[-0.39px] uppercase whitespace-nowrap leading-[1.127]">Contato</span>
      </a>
    </nav>
  );
}

/* ─── FitText — auto-sizes HUGO NETTO to fill container width ─── */
function FitText({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const resize = () => {
      const container = containerRef.current;
      const text = textRef.current;
      if (!container || !text) return;
      const containerWidth = container.clientWidth;
      // Binary search for the right font size
      let lo = 10, hi = 500;
      while (hi - lo > 1) {
        const mid = (lo + hi) / 2;
        text.style.fontSize = `${mid}px`;
        if (text.scrollWidth > containerWidth) {
          hi = mid;
        } else {
          lo = mid;
        }
      }
      text.style.fontSize = `${lo}px`;
    };

    document.fonts.ready.then(() => {
      resize();
      window.addEventListener("resize", resize);
    });
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div ref={containerRef} className={`w-full overflow-hidden ${className}`}>
      <h1
        ref={textRef}
        className="font-['Archivo_Expanded',sans-serif] text-[#e1dcd0] uppercase whitespace-nowrap leading-[0.85]"
        style={{ letterSpacing: "-0.03em" }}
      >
        <span className="font-light">HUGO </span>
        <span className="font-extrabold text-[#d86527]">NETTO</span>
      </h1>
    </div>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
      });
      gsap.from(".hero-subtitle", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.6,
      });
      gsap.from(".hero-desc", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.8,
      });
      gsap.to(".hero-bg", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen bg-[#051026] overflow-hidden flex flex-col">
      {/* Background image with parallax */}
      <div className="hero-bg absolute inset-0 scale-110">
        <div className="absolute inset-0 bg-gradient-to-b from-[#02080e]/60 via-transparent to-[#041221] z-[1]" />
        <OptimizedImage name="driver-calm-standing" alt="Hugo Netto na pista" sizes="100vw" priority imgClassName="absolute inset-0 object-cover size-full object-top" />
      </div>

      <Navbar />

      {/* Bottom content: subtitle + description row, HUGO NETTO below */}
      <div className="relative z-[2] mt-auto w-full">
        {/* Subtitle left / Description right */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 px-5 md:px-10 lg:px-14 mb-6 md:mb-8">
          <p className="hero-subtitle font-['Archivo_Expanded',sans-serif] font-extrabold text-[#eeebe4] text-sm md:text-base uppercase tracking-[-0.48px] leading-[1.127] max-w-[260px]">
            Piloto de Alta<br />Performance
          </p>
          <p className="hero-desc font-['Inter',sans-serif] font-semibold text-xs md:text-sm text-[#eeebe4] leading-[1.54] max-w-[260px] sm:text-right">
            Velocidade, precisão e disciplina no limite. Uma jornada construída entre controle, técnica e adrenalina.
          </p>
        </div>

        {/* Giant HUGO NETTO edge-to-edge — auto-fits viewport width */}
        <FitText className="hero-title" />
      </div>
    </section>
  );
}

/* ─── About Section ─── */
function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-heading", {
        x: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-heading", start: "top 80%" },
      });
      gsap.from(".about-accent", {
        x: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-accent", start: "top 80%" },
      });
      gsap.from(".about-desc", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-desc", start: "top 85%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative bg-[#041221] overflow-hidden min-h-screen flex items-center">
      {/* Vertical grid lines background */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none max-w-[1293px] mx-auto left-0 right-0">
        <div className="absolute inset-y-0 left-0 w-px bg-[#E1DCD0]/8" />
        <div className="absolute inset-y-0 left-1/4 w-px bg-[#E1DCD0]/8" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-[#E1DCD0]/8" />
        <div className="absolute inset-y-0 left-3/4 w-px bg-[#E1DCD0]/8" />
        <div className="absolute inset-y-0 right-0 w-px bg-[#E1DCD0]/8" />
      </div>

      <div className="relative w-full max-w-[1440px] mx-auto px-5 md:px-[7.78%] py-20">
        <div className="grid grid-cols-1 md:grid-cols-[40.4%_20.2%_1fr] items-center gap-8 md:gap-[4.2%]">
          {/* Left: Headline — Figma: 492/1216 = 40.4% */}
          <div className="about-heading">
            <h2 className="font-['Archivo_Expanded',sans-serif] font-extrabold text-[#e1dcd0] text-[clamp(1.5rem,2.78vw,2.5rem)] tracking-[-1.2px] uppercase leading-[1.127]">
              Alta<br />performance<br />não é só correr.
            </h2>
            <div className="about-accent flex items-center gap-3 mt-3 ml-[0.5em]">
              <Diamond />
              <p className="font-['Archivo_Expanded',sans-serif] font-extrabold text-[#d86527] text-[clamp(1.5rem,2.78vw,2.5rem)] tracking-[-1.2px] uppercase leading-[1.127]">
                É dominar
              </p>
            </div>
          </div>

          {/* Center: Oval helmet image — Figma: 246/1216 = 20.2% */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-[246.3px] aspect-[246.3/140.8] rounded-[179.5px] pointer-events-none">
              <div aria-hidden="true" className="absolute inset-0 rounded-[179.5px] overflow-hidden">
                <div className="absolute bg-[#07315f] inset-0 rounded-[179.5px]" />
                <OptimizedImage name="helmet-dramatic" alt="Capacete" sizes="246px" imgClassName="absolute inset-0 object-cover size-full rounded-[179.5px]" />
              </div>
              <div aria-hidden="true" className="absolute border border-black inset-0 rounded-[179.5px]" />
            </div>
          </div>

          {/* Right: Description — Figma: 374/1216 = 30.7% (1fr) */}
          <div className="about-desc max-w-[374px]">
            <div className="bg-[#a84814] w-[44px] h-[4px] rounded-[3px] mb-5" />
            <p className="font-['Inter',sans-serif] font-semibold text-[14px] text-[rgba(238,235,228,0.83)] leading-[1.54]">
              Hugo Netto é piloto de alta performance, movido por disciplina, estratégia e controle emocional. Nas pistas, cada curva exige precisão absoluta e tomada de decisão em milésimos.{" "}
              <span className="text-[#eeebe4]">Mais do que velocidade, sua jornada é sobre performance real sob pressão.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Mindset Section ─── */
function FeatureCard({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="feature-card relative">
      <div className="flex gap-[32px] items-start overflow-clip px-[8px] py-[32px]">
        <div className="flex flex-col gap-[13px] items-start pt-[6px] shrink-0">
          <span className="font-['Archivo_Expanded',sans-serif] font-extrabold text-[#e1dcd0] text-[16px] tracking-[-0.48px] uppercase leading-[1.127]">{num}</span>
          <div className="bg-[#d86527] h-[1px] w-[36px]" />
        </div>
        <div className="flex-1 flex flex-col gap-[12px]">
          <p className="font-['Archivo',sans-serif] font-bold text-[#e1dcd0] text-[20px] tracking-[-0.2px] uppercase leading-[30px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>{title}</p>
          <p className="font-['Inter',sans-serif] font-medium text-[14px] text-[rgba(255,255,255,0.59)] leading-[1.54]">{desc}</p>
        </div>
      </div>
      <div className="absolute inset-0 border-b border-[rgba(255,255,255,0.2)] pointer-events-none" />
    </div>
  );
}

function MindsetSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".mindset-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".mindset-title", start: "top 80%" },
      });
      gsap.from(".feature-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".feature-card", start: "top 85%" },
      });
      gsap.to(".mindset-bg", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const leftFeatures = [
    { num: "01", title: "Foco Total", desc: "Concentração extrema em cada segundo. Nenhuma distração — apenas o objetivo à frente." },
    { num: "03", title: "Resiliência", desc: "Superar adversidades nas pistas e fora delas com mentalidade de campeão." },
  ];
  const rightFeatures = [
    { num: "02", title: "Disciplina", desc: "Rotina rigorosa de treinos, alimentação e preparação mental. Cada detalhe conta." },
    { num: "04", title: "Estratégia", desc: "Cada ultrapassagem é calculada. Cada frenagem, precisa. Inteligência na pista." },
  ];

  return (
    <section ref={ref} className="relative bg-gradient-to-b from-[#041221] to-[#072a51] overflow-hidden" style={{ aspectRatio: "1440/1073", minHeight: "900px" }}>
      {/* Full-bleed pilot image — Figma: 1797×1316, centered, bottom: -341px */}
      <div className="mindset-bg absolute inset-0 pointer-events-none z-[0] overflow-hidden">
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-32%] w-[124.8%] h-[122.6%]">
          <OptimizedImage
            name="driver-fullbody"
            alt=""
            sizes="100vw"
            className="absolute inset-0 block size-full"
            imgClassName="absolute h-full left-[-14%] max-w-none top-0 w-[128%]"
          />
        </div>
      </div>

      {/* Title — Figma: "MENTALIDADE" at top:92.5px, heading at top:164px */}
      <div className="mindset-title absolute top-[92px] left-1/2 -translate-x-1/2 text-center z-[3] w-full">
        <p className="font-['Archivo_Expanded',sans-serif] font-bold text-[#d86527] text-[10px] tracking-[-0.3px] uppercase leading-[1.127]">MENTALIDADE</p>
        <h2 className="font-['Archivo_Expanded',sans-serif] font-extrabold text-[#e1dcd0] text-[32px] tracking-[-0.96px] uppercase leading-[1.127] mt-[40px] max-w-[568px] mx-auto">
          O que define um piloto de alta performance?
        </h2>
      </div>

      {/* Cards — Figma: left at 7.78%, right at 67.85%, top row 44.1%, bottom row 74% */}
      <div className="absolute inset-0 z-[2]">
        {/* Desktop */}
        <div className="hidden md:block">
          <div className="absolute left-[7.78%] top-[44.1%] w-[24.3%]">
            <FeatureCard {...leftFeatures[0]} />
          </div>
          <div className="absolute right-[7.78%] top-[44.1%] w-[24.3%]">
            <FeatureCard {...rightFeatures[0]} />
          </div>
          <div className="absolute left-[7.78%] top-[74%] w-[24.3%]">
            <FeatureCard {...leftFeatures[1]} />
          </div>
          <div className="absolute right-[7.78%] top-[74%] w-[24.3%]">
            <FeatureCard {...rightFeatures[1]} />
          </div>
        </div>

        {/* Mobile: cards stacked at bottom */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 px-5 pb-10 flex flex-col bg-gradient-to-t from-[#041221] via-[#041221]/90 to-transparent pt-10">
          {[...leftFeatures, ...rightFeatures].map((f) => (
            <FeatureCard key={f.num} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Stats Section ─── */
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="stat-item flex flex-col">
      <p className="font-['Archivo_Expanded',sans-serif] font-light text-[#d86527] text-[clamp(3rem,6.67vw,96px)] tracking-[-2.88px] uppercase leading-[1.127]">
        {value}
      </p>
      <div className="w-[217px] h-px bg-white/18 mt-4 mb-3" />
      <p className="font-['Inter',sans-serif] font-medium text-[14px] text-[rgba(238,235,228,0.83)] uppercase leading-[1.54]">
        {label}
      </p>
    </div>
  );
}

function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ref.current?.querySelectorAll(".stat-item").forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
      gsap.to(".car-parallax", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative bg-[#041221] py-20 md:py-32 overflow-hidden">
      {/* Vertical grid lines */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none max-w-[1293px] mx-auto left-0 right-0">
        <div className="absolute inset-y-0 left-0 w-px bg-[#E1DCD0]/8" />
        <div className="absolute inset-y-0 left-1/4 w-px bg-[#E1DCD0]/8" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-[#E1DCD0]/8" />
        <div className="absolute inset-y-0 left-3/4 w-px bg-[#E1DCD0]/8" />
        <div className="absolute inset-y-0 right-0 w-px bg-[#E1DCD0]/8" />
      </div>

      {/* Trajectory heading */}
      <div className="relative text-center max-w-[689px] mx-auto px-5 mb-20 md:mb-28">
        <SectionLabel>carreira nas pistas</SectionLabel>
        <h2 className="font-['Archivo_Expanded',sans-serif] font-extrabold text-[#e1dcd0] text-2xl md:text-[32px] tracking-[-0.96px] uppercase leading-[1.127] mt-6">
          TRAJETÓRIA NO AUTOMOBILISMO
        </h2>
        <p className="font-['Inter',sans-serif] font-semibold text-sm text-[rgba(238,235,228,0.83)] leading-[1.54] mt-6">
          Competindo em ambientes de alta exigência, Hugo desenvolveu uma presença forte dentro e fora das pistas, unindo técnica e mentalidade competitiva.
        </p>
      </div>

      {/* Stats + car */}
      <div className="relative max-w-[1440px] mx-auto px-5 md:px-[7.78%]">
        {/* Row 1: 50+ left | 12+ right */}
        <div className="flex justify-between">
          <StatItem value="50+" label="Categorias disputadas" />
          <StatItem value="12+" label="Pódios" />
        </div>

        {/* Car image centered between stat rows */}
        <div className="car-parallax relative mx-auto -mt-8 md:-mt-16 max-w-[1198px] aspect-[1198/684] mix-blend-screen pointer-events-none">
          <OptimizedImage name="car-360-view" alt="Carro de corrida 360" sizes="(max-width: 768px) 100vw, 1198px" imgClassName="absolute inset-0 object-contain size-full" />
        </div>

        {/* Row 2: 15+ left | 10+ right */}
        <div className="flex justify-between -mt-8 md:-mt-16">
          <StatItem value="15+" label="Autódromos" />
          <StatItem value="10+" label="Primeiro Lugar" />
        </div>
      </div>
    </section>
  );
}

/* ─── Gallery Section ─── */
function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-title", {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".gallery-title", start: "top 80%" },
      });
      gsap.from(".gallery-item", {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".gallery-grid", start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const topRow = [
    { name: "driver-calm-race", alt: "Piloto antes da corrida" },
    { name: "creation-car-front", alt: "Carro de corrida" },
    { name: "creation-interior", alt: "Interior do carro" },
  ];
  const bottomRow = [
    { name: "helmet-closeup", alt: "Capacete em close" },
    { name: "creation-aerial", alt: "Vista aérea do carro" },
    { name: "creation-engine", alt: "Motor do carro" },
  ];

  return (
    <section ref={ref} className="relative bg-[#041221] py-20 md:py-32 overflow-hidden">
      {/* Vertical grid lines */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none max-w-[1293px] mx-auto left-0 right-0">
        <div className="absolute inset-y-0 left-0 w-px bg-[#E1DCD0]/8" />
        <div className="absolute inset-y-0 left-1/4 w-px bg-[#E1DCD0]/8" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-[#E1DCD0]/8" />
        <div className="absolute inset-y-0 left-3/4 w-px bg-[#E1DCD0]/8" />
        <div className="absolute inset-y-0 right-0 w-px bg-[#E1DCD0]/8" />
      </div>

      <div className="gallery-grid relative">
        {/* Top row ticker — scrolls RIGHT */}
        <div className="overflow-hidden">
          <div className="flex gap-4 md:gap-6 animate-gallery-right w-max">
            {[...topRow, ...topRow, ...topRow, ...topRow].map((img, i) => (
              <div key={`top-${i}`} className="gallery-item aspect-video w-[45vw] md:w-[612px] shrink-0 rounded-xl overflow-hidden relative bg-[#192a3c]">
                <OptimizedImage name={img.name} alt={img.alt} sizes="612px" imgClassName="absolute inset-0 object-cover size-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Title overlay — mix-blend-difference */}
        <div className="absolute inset-0 z-[3] flex items-center justify-center pointer-events-none" style={{ mixBlendMode: "difference" }}>
          <h2 className="gallery-title font-['Archivo_Expanded',sans-serif] font-extrabold text-[#e1dcd0] text-3xl md:text-5xl lg:text-[58px] text-center tracking-[-1.76px] uppercase leading-[1.127] max-w-[533px] px-5">
            Entre velocidade e precisão
          </h2>
        </div>

        {/* Gap between rows */}
        <div className="h-4 md:h-6" />

        {/* Bottom row ticker — scrolls LEFT */}
        <div className="overflow-hidden">
          <div className="flex gap-4 md:gap-6 animate-gallery-left w-max">
            {[...bottomRow, ...bottomRow, ...bottomRow, ...bottomRow].map((img, i) => (
              <div key={`bot-${i}`} className="gallery-item aspect-video w-[45vw] md:w-[612px] shrink-0 rounded-xl overflow-hidden relative bg-[#192a3c]">
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
        .animate-gallery-right {
          animation: galleryRight 30s linear infinite;
        }
        .animate-gallery-left {
          animation: galleryLeft 30s linear infinite;
        }
      `}</style>
    </section>
  );
}

/* ─── Sponsors Section ─── */
function LogoSvg({ clipId }: { clipId: string }) {
  return (
    <svg className="w-[122px] h-[49px]" fill="none" viewBox="0 0 122 49">
      <g clipPath={`url(#${clipId})`}>
        <path d={svgPaths.p1a612d80} fill="#1D2633" />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect fill="white" height="49" width="122" />
        </clipPath>
      </defs>
    </svg>
  );
}

function SponsorsSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sponsor-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".sponsor-card", start: "top 85%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative bg-[#041221] px-5 md:px-10 py-10">
      <div className="bg-[#f9f6ee] rounded-2xl md:rounded-3xl py-16 md:py-20 px-5 md:px-10 mx-auto overflow-hidden">
        {/* Heading */}
        <div className="text-center max-w-[669px] mx-auto mb-12 md:mb-16">
          <p className="font-['Archivo_Expanded',sans-serif] font-bold text-[#d86527] text-[10px] tracking-[-0.3px] uppercase leading-[1.127]">PATROCÍNIO</p>
          <p className="font-['Archivo_Expanded',sans-serif] font-extrabold text-[#041221] text-2xl md:text-[32px] tracking-[-0.96px] uppercase leading-[1.127] mt-6">
            Marcas que aceleram junto
          </p>
          <p className="font-['Inter',sans-serif] font-semibold text-sm text-black/83 leading-[1.54] mt-6 max-w-[513px] mx-auto">
            O automobilismo é uma plataforma única de visibilidade, performance e posicionamento premium. Hugo busca parcerias com marcas que compartilham valores como excelência, disciplina e inovação.
          </p>
        </div>

        {/* Sponsor logos ticker */}
        <div className="relative mb-12 md:mb-16 overflow-hidden" style={{ mask: "linear-gradient(90deg, transparent, black 5%, black 95%, transparent)", WebkitMask: "linear-gradient(90deg, transparent, black 5%, black 95%, transparent)" }}>
          <div className="flex animate-ticker gap-4 w-max">
            {[...Array(2)].map((_, set) =>
              [0, 1, 2, 3, 4].map((i) => (
                <div key={`${set}-${i}`} className="sponsor-card bg-black/4 rounded w-[240px] md:w-[280px] aspect-[340/269] flex items-center justify-center flex-shrink-0">
                  <LogoSvg clipId={`clip_logo_${set}_${i}`} />
                </div>
              ))
            )}
          </div>
          <style>{`
            @keyframes ticker {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-ticker {
              animation: ticker 20s linear infinite;
            }
            .animate-ticker:hover {
              animation-play-state: paused;
            }
          `}</style>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <a href="#" className="bg-[#d86527] flex gap-3 items-center px-6 py-4 rounded-md hover:bg-[#c05a22] transition-colors">
            <Diamond />
            <span className="font-['Archivo_Expanded',sans-serif] font-extrabold text-[#eeebe4] text-[13px] tracking-[-0.39px] uppercase whitespace-nowrap leading-[1.127]">SEJA UM PARCEIRO</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Follow / Contact Section ─── */
function FollowSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".follow-title", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".follow-title", start: "top 80%" },
      });
      gsap.from(".follow-links > *", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".follow-links", start: "top 85%" },
      });
      gsap.to(".follow-bg", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative bg-gradient-to-b from-[#041221] to-[#07294f] overflow-hidden h-screen max-h-[935px] min-h-[600px]">
      {/* Portrait image — Figma: 878×724, centered with offset, top 26% */}
      <div className="follow-bg absolute left-[calc(50%+3.4%)] -translate-x-1/2 top-[26%] w-[61%] max-w-[878px] h-[77.4%] pointer-events-none">
        <OptimizedImage name="portrait-cinematic" alt="Retrato do piloto" sizes="878px" imgClassName="absolute inset-0 object-cover size-full" />
      </div>

      {/* Title */}
      <div className="follow-title absolute top-[10%] left-1/2 -translate-x-1/2 text-center z-[1] max-w-[90vw]">
        <h2 className="font-['Archivo_Expanded',sans-serif] text-[#e1dcd0] text-[clamp(2rem,4.9vw,70.4px)] text-center tracking-[-2.11px] uppercase leading-[0.867]">
          <span className="font-light block">ACOMPANHE</span>
          <span className="font-light">HUGO </span>
          <span className="font-extrabold text-[#d86527]">netto</span>
        </h2>
      </div>

      {/* Links — positioned at edges */}
      <div className="follow-links absolute top-[55.8%] left-0 right-0 z-[1] flex flex-col sm:flex-row justify-between px-[7.78%]">
        <div className="text-center">
          <p className="font-['Archivo_Expanded',sans-serif] font-bold text-[#d86527] text-[10px] tracking-[-0.3px] uppercase leading-[1.127]">REDES SOCIAIS</p>
          <div className="flex flex-col gap-[6px] mt-[18px] font-['Archivo_Expanded',sans-serif] font-extrabold text-[#e1dcd0] text-[clamp(1rem,1.67vw,24px)] tracking-[-0.72px] uppercase text-center">
            <a href="#" className="hover:text-[#d86527] transition-colors leading-[1.127]">INSTAGRAM</a>
            <a href="#" className="hover:text-[#d86527] transition-colors leading-[1.127]">YOUTUBE</a>
            <a href="#" className="hover:text-[#d86527] transition-colors leading-[1.127]">tiktok</a>
          </div>
        </div>
        <div className="text-center">
          <p className="font-['Archivo_Expanded',sans-serif] font-bold text-[#d86527] text-[10px] tracking-[-0.3px] uppercase leading-[1.127]">contatos</p>
          <div className="flex flex-col gap-[6px] mt-[18px] font-['Archivo_Expanded',sans-serif] font-extrabold text-[#e1dcd0] text-[clamp(1rem,1.67vw,24px)] tracking-[-0.72px] uppercase text-center">
            <a href="#" className="hover:text-[#d86527] transition-colors leading-[1.127]">parcerias</a>
            <a href="#" className="hover:text-[#d86527] transition-colors leading-[1.127]">media kit</a>
            <a href="#" className="hover:text-[#d86527] transition-colors leading-[1.127]">email</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="bg-[#041221] py-3">
      <div className="max-w-[1430px] mx-auto px-[38px] flex items-center justify-between">
        <p className="font-['Geist',sans-serif] font-normal text-[12px] text-white leading-normal whitespace-nowrap">
          Copyright &copy; 2026 Hugo Netto. Todos os direitos reservados
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex gap-[8px] items-center group"
        >
          <span className="font-['Geist',sans-serif] font-medium text-[12px] text-white leading-[1.5] whitespace-nowrap group-hover:text-[#d86527] transition-colors">Voltar ao topo</span>
          <div className="flex items-center justify-center size-[24px]">
            <div className="-rotate-90">
              <DownArrow />
            </div>
          </div>
        </button>
      </div>
    </footer>
  );
}

/* ─── App ─── */
export default function App() {
  return (
    <div className="bg-[#041221] overflow-x-hidden">
      <GrainOverlay />
      <HeroSection />
      <AboutSection />
      <MindsetSection />
      <StatsSection />
      <GallerySection />
      <SponsorsSection />
      <FollowSection />
      <Footer />
    </div>
  );
}
