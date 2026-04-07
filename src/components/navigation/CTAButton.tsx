import React, { useRef, useEffect } from "react";
import { Diamond } from "../ui/Diamond";

export function CTAButton({ children = "Contato", href = "#contato", className = "" }: { children?: React.ReactNode; href?: string; className?: string }) {
  const textRef = useRef<HTMLSpanElement>(null);
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = textRef.current;
    const parent = wrapperRef.current;
    if (!el || !parent) return;

    const measure = () => {
      parent.style.setProperty("--text-w", `${el.offsetWidth}px`);
      parent.style.setProperty("--icon-w", "20px");
    };

    measure();
    // Re-measure after fonts load
    document.fonts.ready.then(measure);
  }, [children]);

  return (
    <a href={href} className={`group relative bg-[#d86527] hover:bg-[#ee671f] transition-colors duration-300 rounded-[6px] shrink-0 flex items-center self-stretch px-6 py-3 overflow-hidden ${className}`}>
      <span ref={wrapperRef} className="relative flex items-center gap-3">
        <span className="inline-flex transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-[calc(var(--text-w,60px)+12px)]">
          <Diamond />
        </span>
        <span
          ref={textRef}
          className="font-archivo-expanded font-extrabold text-[#eeebe4] text-[13px] tracking-[-0.39px] uppercase whitespace-nowrap leading-[1.127] transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-x-[calc(var(--icon-w,20px)+12px)]"
        >{children}</span>
      </span>
    </a>
  );
}
