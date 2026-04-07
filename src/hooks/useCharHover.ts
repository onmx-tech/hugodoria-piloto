import { useEffect } from "react";
import { gsap } from "gsap";

export function useCharHover(ref: React.RefObject<HTMLElement | null>) {
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
