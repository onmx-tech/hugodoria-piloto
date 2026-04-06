import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import svgPaths from "../imports/Piloto-1/svg-ncf91yh9cy";
import { OptimizedImage } from "./components/OptimizedImage";
import { GrainOverlay } from "./components/GrainOverlay";

gsap.registerPlugin(ScrollTrigger);

/* ─── Decorative diamond icon ─── */
function Diamond({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center size-5 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:rotate-[360deg] ${className}`} aria-hidden="true">
      <div className="-rotate-45">
        <div className="bg-[#a84814] rounded-[3px] size-3.5" />
      </div>
    </div>
  );
}

/* ─── Down arrow SVG ─── */
function DownArrow() {
  return (
    <svg className="size-6" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.5 17L11.5 12L6.5 7" opacity="0.4" stroke="#D86527" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M12.5 17L17.5 12L12.5 7" stroke="#D86527" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

/* ─── Section label (e.g. "MENTALIDADE") ─── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-archivo-expanded font-bold text-[#d86527] text-[10px] md:text-xs tracking-[-0.3px] uppercase leading-[1.127]">
      {children}
    </p>
  );
}

/* ─── Section heading ─── */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-archivo-expanded font-extrabold text-[#e1dcd0] text-2xl md:text-[32px] tracking-[-0.96px] uppercase leading-[1.127]">
      {children}
    </h2>
  );
}

/* ─── Navbar ─── */
const NAV_LINKS = [
  { label: "Sobre", id: "sobre" },
  { label: "Carreira", id: "carreira" },
  { label: "Galeria", id: "galeria" },
  { label: "Patrocínio", id: "patrocinio" },
];

/* ─── Reusable char-by-char hover effect ─── */
function useCharHover(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const topChars = el.querySelectorAll<HTMLSpanElement>(".char-top");
    const bottomChars = el.querySelectorAll<HTMLSpanElement>(".char-bottom");

    const onEnter = () => {
      gsap.to(topChars, { yPercent: -100, stagger: 0.025, duration: 0.4, ease: "power3.out", overwrite: true });
      gsap.to(bottomChars, { yPercent: -100, stagger: 0.025, duration: 0.4, ease: "power3.out", overwrite: true });
    };
    const onLeave = () => {
      gsap.to(topChars, { yPercent: 0, stagger: 0.025, duration: 0.4, ease: "power3.out", overwrite: true });
      gsap.to(bottomChars, { yPercent: 0, stagger: 0.025, duration: 0.4, ease: "power3.out", overwrite: true });
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [ref]);
}

function CharHoverLink({ href, label, className = "", hoverColor = "text-[#d86527]", ariaLabel }: { href: string; label: string; className?: string; hoverColor?: string; ariaLabel?: string }) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  useCharHover(linkRef);
  const chars = label.split("");
  return (
    <a ref={linkRef} href={href} aria-label={ariaLabel} className={`cursor-pointer ${className}`}>
      <span className="relative block overflow-hidden">
        <span className="flex">
          {chars.map((c, i) => <span key={i} className="char-top inline-block" style={{ whiteSpace: c === " " ? "pre" : undefined }}>{c}</span>)}
        </span>
        <span className={`flex absolute left-0 top-full ${hoverColor}`}>
          {chars.map((c, i) => <span key={i} className="char-bottom inline-block" style={{ whiteSpace: c === " " ? "pre" : undefined }}>{c}</span>)}
        </span>
      </span>
    </a>
  );
}

function NavLinks({ activeSection }: { activeSection: string }) {
  return (
    <>
      {NAV_LINKS.map((item) => (
        <div key={item.id} className="px-4 py-2 shrink-0">
          <CharHoverLink
            href={`#${item.id}`}
            label={item.label}
            className={`font-archivo-condensed font-extrabold text-sm uppercase ${activeSection === item.id ? "text-white" : "text-[#949da6]"}`}
            ariaLabel={`Ir para secao ${item.label}`}
          />
        </div>
      ))}
    </>
  );
}

function CTAButton({ children = "Contato", href = "#contato", className = "" }: { children?: React.ReactNode; href?: string; className?: string }) {
  return (
    <a href={href} className={`group relative bg-[#d86527] hover:bg-[#ee671f] transition-colors duration-300 rounded-[6px] shrink-0 flex items-center self-stretch px-6 py-3 overflow-hidden ${className}`}>
      <span className="relative flex items-center gap-3">
        <span className="inline-flex transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-[calc(var(--text-w)+12px)]">
          <Diamond />
        </span>
        <span
          className="font-archivo-expanded font-extrabold text-[#eeebe4] text-[13px] tracking-[-0.39px] uppercase whitespace-nowrap leading-[1.127] transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-x-[calc(var(--icon-w)+12px)]"
          ref={(el) => {
            if (el) {
              const parent = el.parentElement;
              if (parent) {
                parent.style.setProperty("--text-w", `${el.offsetWidth}px`);
                parent.style.setProperty("--icon-w", "20px");
              }
            }
          }}
        >{children}</span>
      </span>
    </a>
  );
}

function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [activeSection, setActiveSection] = useState("sobre");
  const [onLightBg, setOnLightBg] = useState(false);
  const topNavRef = useRef<HTMLElement>(null);
  const bottomNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Set initial state: hidden below viewport but visibility preserved for GPU layer
    gsap.set(bottomNavRef.current, { yPercent: 150, opacity: 0, visibility: "hidden" });
    requestAnimationFrame(() => {
      if (bottomNavRef.current) {
        bottomNavRef.current.style.visibility = "visible";
      }
    });

    const trigger = ScrollTrigger.create({
      trigger: ".hero_heading",
      start: "bottom top",
      onEnter: () => {
        setSticky(true);
        gsap.to(topNavRef.current, { y: -60, opacity: 0, duration: 0.4, ease: "power2.in", overwrite: true });
        gsap.to(bottomNavRef.current, { yPercent: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.1, overwrite: true });
      },
      onLeaveBack: () => {
        setSticky(false);
        gsap.to(topNavRef.current, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", overwrite: true });
        gsap.to(bottomNavRef.current, { yPercent: 150, opacity: 0, duration: 0.4, ease: "power2.in", overwrite: true });
      },
    });

    // Track active section
    const sectionTriggers = NAV_LINKS.map((link) => {
      return ScrollTrigger.create({
        trigger: `#${link.id}`,
        start: "top 80%",
        end: "bottom 80%",
        onEnter: () => setActiveSection(link.id),
        onEnterBack: () => setActiveSection(link.id),
      });
    });

    // Track light background — targets the inner light container in patrocinio
    const lightBgEl = document.querySelector("#patrocinio > .bg-\\[\\#f9f6ee\\]");
    const lightBgTrigger = lightBgEl ? ScrollTrigger.create({
      trigger: lightBgEl,
      start: "top bottom-=80",
      end: "bottom bottom-=80",
      onEnter: () => setOnLightBg(true),
      onLeave: () => setOnLightBg(false),
      onEnterBack: () => setOnLightBg(true),
      onLeaveBack: () => setOnLightBg(false),
    }) : null;

    return () => {
      trigger.kill();
      sectionTriggers.forEach((t) => t.kill());
      lightBgTrigger?.kill();
    };
  }, []);

  return (
    <>
      {/* Top nav (hero) */}
      <nav
        ref={topNavRef}
        aria-label="Navegacao principal"
        className="hero_nav absolute top-3 left-3 right-3 flex items-start justify-between z-50"
      >
        <div className="bg-white/12 flex items-center px-[17px] py-3 rounded-[6px] overflow-x-auto">
          <NavLinks activeSection={activeSection} />
        </div>
        <CTAButton>Contato</CTAButton>
      </nav>

      {/* Bottom sticky nav */}
      <nav
        ref={bottomNavRef}
        aria-label="Navegacao principal"
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50"
      >
        <div className={`backdrop-blur-[20px] flex gap-[18px] items-center p-[6px] rounded-[6px] transition-colors duration-300 ${onLightBg ? "bg-[#0a1e36]/95" : "bg-white/7"}`} style={{ willChange: "transform", backfaceVisibility: "hidden" }}>
          <div className="flex items-center">
            <NavLinks activeSection={activeSection} />
          </div>
          <CTAButton>Contato</CTAButton>
        </div>
      </nav>
    </>
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
    <div ref={containerRef} className={`w-full overflow-hidden flex justify-center ${className}`}>
      <h1
        ref={textRef}
        className="font-archivo-expanded w-full text-[#e1dcd0] uppercase whitespace-nowrap leading-[0.867]"
        style={{ letterSpacing: "-0.03em", marginLeft: "-18px" }}
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
      // Intro sequence — clearProps after to avoid residual inline styles
      const introTl = gsap.timeline({ delay: 0.2 });
      introTl
        .from(".hero_background img", { scale: 1.3, duration: 2, ease: "power2.out" }, 0)
        .from(".hero_heading", { y: 120, opacity: 0, duration: 1.4, ease: "expo.out", clearProps: "all" }, 0.3)
        .from(".hero_subheading", { x: -60, opacity: 0, duration: 1, ease: "power3.out", clearProps: "all" }, 0.8)
        .from(".hero_description", { x: 60, opacity: 0, duration: 1, ease: "power3.out", clearProps: "all" }, 0.8)
        .from(".hero_nav", { y: -30, opacity: 0, duration: 0.8, ease: "power3.out", clearProps: "all" }, 0.5);

      // Scroll parallax: image zooms + moves, content fades
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onLeaveBack: () => {
            // Force reset when scrolled back to top
            gsap.set(".hero_subheading", { yPercent: 0, opacity: 1, clearProps: "transform" });
            gsap.set(".hero_description", { yPercent: 0, opacity: 1, clearProps: "transform" });
          },
        },
      });
      scrollTl
        .to(".hero_background", { yPercent: 30, scale: 1.1 }, 0)
        .to(".hero_subheading", { yPercent: -80, opacity: 0 }, 0)
        .to(".hero_description", { yPercent: -80, opacity: 0 }, 0);
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="inicio" ref={heroRef} className="relative min-h-screen bg-[#051026] overflow-hidden flex flex-col" style={{ position: "sticky", top: 0, zIndex: 0 }}>
      {/* Background image with parallax */}
      <div className="hero_background absolute inset-0 scale-110">
        <OptimizedImage name="driver-calm-standing" alt="Hugo Netto na pista" sizes="100vw" priority imgClassName="absolute inset-0 object-cover size-full object-top" />
      </div>

      {/* Bottom content */}
      <div className="relative z-[2] mt-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 px-3 md:px-[6px] mb-4 md:mb-6">
          <p className="hero_subheading font-archivo-expanded font-extrabold text-[#eeebe4] text-base md:text-2xl uppercase tracking-[-0.72px] leading-[1.127] w-[251px] text-center">
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

/* ─── About Section ─── */
function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading slides in from left with clip-path reveal
      gsap.from(".about_heading h2", {
        x: -120,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: { trigger: ".about_heading", start: "top 75%", end: "top 40%", scrub: 1 },
      });
      // "É dominar" slides in from right after heading
      gsap.from(".about_accent", {
        x: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about_accent", start: "top 80%", end: "top 50%", scrub: 1 },
      });
      // Helmet scales up
      gsap.from(".about_image", {
        scale: 0,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about_image", start: "top 80%" },
      });
      // Description fades up
      gsap.from(".about_description", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about_description", start: "top 80%", end: "top 50%", scrub: 1 },
      });
      // Orange line grows
      gsap.from(".about_divider", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about_divider", start: "top 85%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="sobre" ref={ref} className="relative bg-[#041221] overflow-hidden min-h-screen flex items-center z-[2]">

      <div className="relative w-full max-w-[1920px] mx-auto px-5 md:px-[7.78%] py-20">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_1fr] items-center gap-8 md:gap-[3%]">
          {/* Left: Headline — Figma: 492/1216 = 40.4% */}
          <div className="about_heading">
            <h2 className="font-archivo-expanded font-extrabold text-[#e1dcd0] text-[clamp(1.5rem,2.78vw,2.5rem)] tracking-[-1.2px] uppercase leading-[1.127] whitespace-nowrap">
              Alta<br />performance<br />não é só correr.
            </h2>
            <div className="about_accent flex items-center gap-2 -mt-0.5 ml-[3.3em]">
              <Diamond />
              <p className="font-archivo-expanded font-extrabold text-[#d86527] text-[clamp(1.5rem,2.78vw,2.5rem)] tracking-[-1.2px] uppercase leading-[1.127]">
                É dominar
              </p>
            </div>
          </div>

          {/* Center: Oval helmet image */}
          <div className="about_image flex justify-center items-center">
            <div className="relative w-full max-w-[320px] aspect-[246.3/140.8] rounded-[179.5px] pointer-events-none">
              <div aria-hidden="true" className="absolute inset-0 rounded-[179.5px] overflow-hidden">
                <div className="absolute bg-[#07315f] inset-0 rounded-[179.5px]" />
                <OptimizedImage name="helmet-dramatic" alt="Capacete de corrida de Hugo Netto em iluminacao dramatica" sizes="246px" imgClassName="absolute inset-0 object-cover size-full rounded-[179.5px]" />
              </div>
              <div aria-hidden="true" className="absolute border border-black inset-0 rounded-[179.5px]" />
            </div>
          </div>

          {/* Right: Description — Figma: 374/1216 = 30.7% (1fr) */}
          <div className="about_description max-w-[374px]">
            <div className="about_divider bg-[#a84814] w-[44px] h-[4px] rounded-[3px] mb-5" />
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
    <div className="mindset_card relative">
      <div className="flex gap-[32px] items-start overflow-clip px-[8px] py-[32px]">
        <div className="flex flex-col gap-[13px] items-start pt-[6px] shrink-0">
          <span className="font-archivo-expanded font-extrabold text-[#e1dcd0] text-[16px] tracking-[-0.48px] uppercase leading-[1.127]">{num}</span>
          <div className="bg-[#d86527] h-[1px] w-[36px]" />
        </div>
        <div className="flex-1 flex flex-col gap-[12px]">
          <h3 className="font-['Archivo',sans-serif] font-bold text-[#e1dcd0] text-[20px] tracking-[-0.2px] uppercase leading-[30px] whitespace-nowrap">{title}</h3>
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
      // Title reveal
      gsap.from(".mindset_heading", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".mindset_heading", start: "top 85%" },
      });

      // Pin section and reveal cards sequentially with scrub
      const cards = gsap.utils.toArray(".mindset_card");
      cards.forEach((card, i) => {
        gsap.from(card as Element, {
          y: 80,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: `${20 + i * 10}% center`,
            end: `${30 + i * 10}% center`,
            scrub: 1,
          },
        });
      });

      // Parallax on pilot image
      gsap.to(".mindset_background", {
        yPercent: 15,
        scale: 1.05,
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
    <section id="mentalidade" ref={ref} className="relative bg-gradient-to-b from-[#041221] to-[#072a51] overflow-hidden z-[2]" style={{ aspectRatio: "1440/1073", minHeight: "900px" }}>

      {/* Full-bleed pilot image — Figma: 1797×1316, centered, bottom: -341px */}
      <div className="mindset_background absolute inset-0 pointer-events-none z-[0] overflow-hidden">
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-32%] w-[124.8%] h-[122.6%]">
          <OptimizedImage
            name="driver-fullbody"
            alt="Hugo Netto em pose de corpo inteiro com traje de piloto"
            sizes="100vw"
            className="absolute inset-0 block size-full"
            imgClassName="absolute h-full left-[-14%] max-w-none top-0 w-[128%]"
          />
        </div>
      </div>

      {/* Title — Figma: "MENTALIDADE" at top:92.5px, heading at top:164px */}
      <div className="mindset_heading absolute top-[92px] left-1/2 -translate-x-1/2 text-center z-[3] w-full">
        <p className="font-archivo-expanded font-bold text-[#d86527] text-[10px] tracking-[-0.3px] uppercase leading-[1.127]">MENTALIDADE</p>
        <h2 className="font-archivo-expanded font-extrabold text-[#e1dcd0] text-[32px] tracking-[-0.96px] uppercase leading-[1.127] mt-[40px] max-w-[568px] mx-auto">
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
function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = `${Math.round(eased * value)}${suffix}`;
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

function StatItem({ value, label }: { value: string; label: string }) {
  const num = parseInt(value);
  const suffix = value.replace(/\d/g, "");
  return (
    <div className="stats_item flex flex-col">
      <p className="font-archivo-expanded font-light text-[#d86527] text-[clamp(3rem,6.67vw,96px)] tracking-[-2.88px] uppercase leading-[1.127]">
        <CountUp value={num} suffix={suffix} />
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
      // Stats heading reveal
      gsap.from(".stats_heading", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".stats_heading", start: "top 80%" },
      });

      // Each stat slides in from alternating sides
      const stats = gsap.utils.toArray(".stats_item");
      stats.forEach((el, i) => {
        gsap.from(el as Element, {
          x: i % 2 === 0 ? -80 : 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el as Element, start: "top 85%" },
        });
      });

      // Car: dramatic parallax + slight rotation
      gsap.fromTo(".stats_image", {
        yPercent: 20,
        scale: 0.9,
      }, {
        yPercent: -15,
        scale: 1,
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
    <section id="carreira" ref={ref} className="relative bg-[#041221] py-20 md:py-32 overflow-hidden z-[2]">

      {/* Trajectory heading */}
      <div className="stats_heading relative text-center max-w-[689px] mx-auto px-5 mb-20 md:mb-28">
        <SectionLabel>carreira nas pistas</SectionLabel>
        <h2 className="font-archivo-expanded font-extrabold text-[#e1dcd0] text-2xl md:text-[32px] tracking-[-0.96px] uppercase leading-[1.127] mt-6">
          TRAJETÓRIA NO AUTOMOBILISMO
        </h2>
        <p className="font-['Inter',sans-serif] font-semibold text-sm text-[rgba(238,235,228,0.83)] leading-[1.54] mt-6">
          Competindo em ambientes de alta exigência, Hugo desenvolveu uma presença forte dentro e fora das pistas, unindo técnica e mentalidade competitiva.
        </p>
      </div>

      {/* Stats + car */}
      <div className="relative max-w-[1920px] mx-auto px-5 md:px-[7.78%]">
        {/* Row 1: 50+ left | 12+ right */}
        <div className="flex justify-between">
          <StatItem value="50+" label="Categorias disputadas" />
          <StatItem value="12+" label="Pódios" />
        </div>

        {/* Car image centered between stat rows */}
        <div className="stats_image relative mx-auto -mt-8 md:-mt-16 max-w-[1198px] aspect-[1198/684] mix-blend-screen pointer-events-none">
          <OptimizedImage name="car-360-view" alt="Carro de corrida de Hugo Netto em vista 360 graus com adesivagem de patrocinadores" sizes="(max-width: 768px) 100vw, 1198px" imgClassName="absolute inset-0 object-contain size-full" />
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
      // Title fades in with scrub
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

      // Both rows fade in together
      gsap.from(".gallery_grid", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".gallery_grid", start: "top 85%" },
      });

      // Parallax: top row moves right, bottom moves left on scroll
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
    }, ref);
    return () => ctx.revert();
  }, []);

  const topRow = [
    { name: "driver-calm-race", alt: "Hugo Netto concentrado antes da largada em dia de corrida" },
    { name: "creation-car-front", alt: "Vista frontal do carro de corrida de Hugo Netto com adesivagem completa" },
    { name: "creation-interior", alt: "Interior do cockpit do carro de corrida com volante e painel" },
  ];
  const bottomRow = [
    { name: "helmet-closeup", alt: "Detalhe do capacete personalizado de Hugo Netto com pintura exclusiva" },
    { name: "creation-aerial", alt: "Vista aerea do carro de corrida de Hugo Netto na pista" },
    { name: "creation-engine", alt: "Motor preparado do carro de competicao de Hugo Netto" },
  ];

  return (
    <section id="galeria" ref={ref} className="relative bg-[#041221] overflow-hidden h-screen flex flex-col justify-center z-[2]">

      <div className="gallery_grid relative">
        {/* Top row ticker — scrolls RIGHT */}
        <div className="gallery_row-top overflow-hidden">
          <div className="flex gap-3 md:gap-6 is-gallery-right w-max">
            {[...topRow, ...topRow, ...topRow, ...topRow].map((img, i) => (
              <div key={`top-${i}`} className="gallery_item aspect-video w-[70vw] sm:w-[45vw] md:w-[612px] shrink-0 rounded-lg md:rounded-xl overflow-hidden relative bg-[#192a3c]">
                <OptimizedImage name={img.name} alt={img.alt} sizes="612px" imgClassName="absolute inset-0 object-cover size-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Title overlay — mix-blend-difference */}
        <div className="absolute inset-0 z-[3] flex items-center justify-center pointer-events-none" style={{ mixBlendMode: "difference" }}>
          <h2 className="gallery_heading font-archivo-expanded font-extrabold text-[#e1dcd0] text-[clamp(1.5rem,4vw,58px)] text-center tracking-[-1.76px] uppercase leading-[1.127] max-w-[533px] px-5">
            Entre velocidade e precisão
          </h2>
        </div>

        {/* Gap between rows */}
        <div className="h-3 md:h-6" />

        {/* Bottom row ticker — scrolls LEFT */}
        <div className="gallery_row-bottom overflow-hidden">
          <div className="flex gap-3 md:gap-6 is-gallery-left w-max">
            {[...bottomRow, ...bottomRow, ...bottomRow, ...bottomRow].map((img, i) => (
              <div key={`bot-${i}`} className="gallery_item aspect-video w-[70vw] sm:w-[45vw] md:w-[612px] shrink-0 rounded-lg md:rounded-xl overflow-hidden relative bg-[#192a3c]">
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
        .is-gallery-right {
          animation: galleryRight 30s linear infinite;
        }
        .is-gallery-left {
          animation: galleryLeft 30s linear infinite;
        }
      `}</style>
    </section>
  );
}

/* ─── Sponsors Section ─── */
function LogoSvg({ clipId }: { clipId: string }) {
  return (
    <svg className="w-[122px] h-[49px]" fill="none" viewBox="0 0 122 49" role="img" aria-label="Logo de patrocinador">
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
      gsap.from(".sponsors_card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".sponsors_card", start: "top 85%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="patrocinio" ref={ref} className="relative bg-[#041221] px-5 md:px-10 py-20 md:py-32 z-[2]">
      <div className="bg-[#f9f6ee] rounded-2xl md:rounded-3xl py-16 md:py-20 px-5 md:px-10 mx-auto overflow-hidden">
        {/* Heading */}
        <div className="text-center max-w-[669px] mx-auto mb-12 md:mb-16">
          <p className="font-archivo-expanded font-bold text-[#d86527] text-[10px] tracking-[-0.3px] uppercase leading-[1.127]">PATROCÍNIO</p>
          <h2 className="font-archivo-expanded font-extrabold text-[#041221] text-2xl md:text-[32px] tracking-[-0.96px] uppercase leading-[1.127] mt-6">
            Marcas que aceleram junto
          </h2>
          <p className="font-['Inter',sans-serif] font-semibold text-sm text-black/83 leading-[1.54] mt-6 max-w-[513px] mx-auto">
            O automobilismo é uma plataforma única de visibilidade, performance e posicionamento premium. Hugo busca parcerias com marcas que compartilham valores como excelência, disciplina e inovação.
          </p>
        </div>

        {/* Sponsor logos ticker */}
        <div className="relative mb-12 md:mb-16 overflow-hidden" style={{ mask: "linear-gradient(90deg, transparent, black 5%, black 95%, transparent)", WebkitMask: "linear-gradient(90deg, transparent, black 5%, black 95%, transparent)" }}>
          <div className="flex is-ticker gap-4 w-max">
            {[...Array(2)].map((_, set) =>
              [0, 1, 2, 3, 4].map((i) => (
                <div key={`${set}-${i}`} className="sponsors_card bg-black/4 rounded w-[240px] md:w-[280px] aspect-[340/269] flex items-center justify-center flex-shrink-0">
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
            .is-ticker {
              animation: ticker 20s linear infinite;
            }
            .is-ticker:hover {
              animation-play-state: paused;
            }
          `}</style>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <CTAButton href="#contato">Seja um Parceiro</CTAButton>
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
      // Title fades in synced to scroll
      gsap.from(".follow_heading", {
        y: 80,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        },
      });

      // Links slide in from their sides
      gsap.from(".follow_nav-left", {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".follow_nav", start: "top 80%" },
      });
      gsap.from(".follow_nav-right", {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".follow_nav", start: "top 80%" },
      });

      // Portrait parallax
      gsap.to(".follow_background", {
        yPercent: 8,
        scale: 1.05,
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
    <section id="contato" ref={ref} className="relative bg-gradient-to-b from-[#041221] to-[#07294f] overflow-hidden h-screen min-h-[600px] z-[2]">
      {/* Portrait image — centered */}
      <div className="follow_background absolute top-[25%] bottom-0 left-0 right-0 pointer-events-none flex justify-center overflow-hidden">
        <OptimizedImage name="portrait-cinematic" alt="Retrato cinematografico de Hugo Netto" sizes="100vw" imgClassName="absolute inset-0 object-cover object-top opacity-70 h-full w-auto max-w-[900px] 2xl:max-w-[65%] mx-auto" />
      </div>

      {/* Title */}
      <div className="follow_heading absolute top-[10%] left-1/2 -translate-x-1/2 text-center z-[1] max-w-[90vw]">
        <h2 className="font-archivo-expanded text-[#e1dcd0] text-[clamp(2rem,4.9vw,70.4px)] text-center tracking-[-2.11px] uppercase leading-[1]">
          <span className="font-light block">ACOMPANHE</span>
          <span className="font-light">HUGO </span>
          <span className="font-extrabold text-[#d86527]">netto</span>
        </h2>
      </div>

      {/* Links — positioned at edges */}
      <nav aria-label="Redes sociais e contatos" className="follow_nav absolute top-[55.8%] left-0 right-0 z-[1] flex flex-col sm:flex-row justify-between px-[7.78%]">
        <div className="follow_nav-left text-center">
          <p className="font-archivo-expanded font-bold text-[#d86527] text-[10px] tracking-[-0.3px] uppercase leading-[1.127]">REDES SOCIAIS</p>
          <div className="flex flex-col items-center gap-[6px] mt-[18px] font-archivo-expanded font-extrabold text-[#e1dcd0] text-[clamp(1rem,1.67vw,24px)] tracking-[-0.72px] uppercase">
            <CharHoverLink href="#" label="INSTAGRAM" className="text-[#e1dcd0] leading-[1.127]" ariaLabel="Seguir Hugo Netto no Instagram" />
            <CharHoverLink href="#" label="YOUTUBE" className="text-[#e1dcd0] leading-[1.127]" ariaLabel="Assistir Hugo Netto no YouTube" />
            <CharHoverLink href="#" label="TIKTOK" className="text-[#e1dcd0] leading-[1.127]" ariaLabel="Seguir Hugo Netto no TikTok" />
          </div>
        </div>
        <div className="follow_nav-right text-center">
          <p className="font-archivo-expanded font-bold text-[#d86527] text-[10px] tracking-[-0.3px] uppercase leading-[1.127]">contatos</p>
          <div className="flex flex-col items-center gap-[6px] mt-[18px] font-archivo-expanded font-extrabold text-[#e1dcd0] text-[clamp(1rem,1.67vw,24px)] tracking-[-0.72px] uppercase">
            <CharHoverLink href="#" label="PARCERIAS" className="text-[#e1dcd0] leading-[1.127]" ariaLabel="Informacoes sobre parcerias" />
            <CharHoverLink href="#" label="MEDIA KIT" className="text-[#e1dcd0] leading-[1.127]" ariaLabel="Baixar media kit" />
            <CharHoverLink href="#" label="EMAIL" className="text-[#e1dcd0] leading-[1.127]" ariaLabel="Enviar email" />
          </div>
        </div>
      </nav>

      {/* Footer inside FollowSection */}
      <footer className="absolute bottom-0 left-0 right-0 z-[2] py-3" role="contentinfo">
        <div className="max-w-[1920px] mx-auto px-[38px] flex items-center justify-between">
        <p className="font-['Geist',sans-serif] font-normal text-[12px] text-white leading-normal whitespace-nowrap">
          Copyright &copy; 2026 Hugo Netto. Todos os direitos reservados
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Voltar ao topo da pagina"
          className="flex gap-[8px] items-center group"
        >
          <span className="font-['Geist',sans-serif] font-medium text-[12px] text-white leading-[1.5] whitespace-nowrap group-hover:text-[#d86527] transition-colors">Voltar ao topo</span>
          <div className="flex items-center justify-center size-[24px]" aria-hidden="true">
            <div className="-rotate-90">
              <DownArrow />
            </div>
          </div>
        </button>
        </div>
      </footer>
    </section>
  );
}


/* ─── App ─── */
export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => lenis.destroy();
  }, []);

  return (
    <main className="bg-[#041221] overflow-x-hidden">
      <GrainOverlay />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MindsetSection />
      <StatsSection />
      <GallerySection />
      <SponsorsSection />
      <FollowSection />
    </main>
  );
}
