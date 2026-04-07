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
