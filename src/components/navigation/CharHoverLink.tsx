import { useRef } from "react";
import { useCharHover } from "../../hooks/useCharHover";

export function CharHoverLink({ href, label, className = "", hoverColor = "text-[#d86527]", ariaLabel }: { href: string; label: string; className?: string; hoverColor?: string; ariaLabel?: string }) {
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
