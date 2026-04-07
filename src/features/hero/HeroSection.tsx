import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OptimizedImage } from "../../components/media/OptimizedImage";
import { FitText } from "./FitText";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro sequence — clearProps after to avoid residual inline styles
      const introTl = gsap.timeline({ delay: 0.2 });
      introTl
        .from(".hero_background img", { scale: 1.3, duration: 2, ease: "power2.out" }, 0)
        .from(".hero_heading .font-light", { x: -200, opacity: 0, duration: 1.4, ease: "expo.out", clearProps: "all" }, 0.3)
        .from(".hero_heading .text-\\[\\#d86527\\]", { x: 200, opacity: 0, duration: 1.4, ease: "expo.out", clearProps: "all" }, 0.3)
        .from(".hero_subheading", { x: -60, opacity: 0, duration: 1, ease: "power3.out", clearProps: "all" }, 0.8)
        .from(".hero_description", { x: 60, opacity: 0, duration: 1, ease: "power3.out", clearProps: "all" }, 0.8)
        .from(".hero_nav", { y: -30, opacity: 0, duration: 0.8, ease: "power3.out", clearProps: "all" }, 0.5);

      // Scroll parallax: desktop only
      if (window.innerWidth >= 768) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            onLeaveBack: () => {
              gsap.set(".hero_subheading", { yPercent: 0, opacity: 1, clearProps: "transform" });
              gsap.set(".hero_description", { yPercent: 0, opacity: 1, clearProps: "transform" });
            },
          },
        });
        scrollTl
          .to(".hero_background", { yPercent: 45, scale: 1.15 }, 0)
          .to(".hero_subheading", { yPercent: -80, opacity: 0 }, 0)
          .to(".hero_description", { yPercent: -80, opacity: 0 }, 0);
      }
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="inicio" ref={heroRef} className="relative h-[850px] md:min-h-screen overflow-hidden flex flex-col" style={{ position: "sticky", top: 0, zIndex: 0, background: "linear-gradient(180deg, #030B14 0%, #083362 60%, #041221 100%)" }}>
      {/* Background image with parallax */}
      <div className="hero_background absolute inset-0 md:scale-110">
        {/* Desktop */}
        <div className="hidden md:block absolute inset-0">
          <OptimizedImage name="driver-calm-standing" alt="Hugo Netto na pista" sizes="100vw" priority imgClassName="absolute inset-0 object-cover size-full object-top" />
        </div>
        {/* Mobile */}
        <div className="md:hidden absolute left-1/2 -translate-x-1/2 bottom-[0px] w-[340%]">
          <OptimizedImage name="driver-calm-standing" alt="Hugo Netto na pista" sizes="350vw" priority imgClassName="w-full h-auto" />
        </div>
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
