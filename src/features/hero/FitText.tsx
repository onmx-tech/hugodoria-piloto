import { useEffect, useRef } from "react";

export function FitText({ className = "" }: { className?: string }) {
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

    // Mede de novo quando cada fonte chega: medir com a fonte de reserva corta o nome.
    document.fonts.ready.then(resize);
    document.fonts.addEventListener("loadingdone", resize);
    window.addEventListener("resize", resize);
    return () => {
      document.fonts.removeEventListener("loadingdone", resize);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={containerRef} className={`w-full overflow-hidden flex justify-center ${className}`}>
      <h1
        ref={textRef}
        className="font-archivo-expanded w-full text-[#e1dcd0] uppercase whitespace-nowrap leading-[0.867]"
        style={{ letterSpacing: "-0.03em", marginLeft: "-0.115em" }}
      >
        {/* No desktop o nome empilha para ocupar a coluna ao lado da foto */}
        <span className="font-light">HUGO </span>
        {/* <br> e não span em bloco: em bloco o transform da entrada (GSAP) entra na medida e o nome encolhe */}
        <br className="hidden md:inline" />
        <span className="font-extrabold text-[#d86527]">NETTO</span>
      </h1>
    </div>
  );
}
