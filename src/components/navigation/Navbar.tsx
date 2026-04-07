import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NAV_LINKS } from "../../constants/navigation";
import { CharHoverLink } from "./CharHoverLink";
import { CTAButton } from "./CTAButton";

function NavLinks({ activeSection, onLightBg = false }: { activeSection: string; onLightBg?: boolean }) {
  return (
    <>
      {NAV_LINKS.map((item) => (
        <div key={item.id} className="px-4 py-2 shrink-0">
          <CharHoverLink
            href={`#${item.id}`}
            label={item.label}
            className={`font-archivo-condensed font-extrabold text-sm uppercase transition-colors duration-300 ${activeSection === item.id ? "text-white" : (onLightBg ? "text-white/60" : "text-[#949da6]")}`}
            ariaLabel={`Ir para secao ${item.label}`}
          />
        </div>
      ))}
    </>
  );
}

export function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [activeSection, setActiveSection] = useState("sobre");
  const [onLightBg, setOnLightBg] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const topNavRef = useRef<HTMLElement>(null);
  const bottomNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Set initial state: hidden below viewport
    gsap.set(bottomNavRef.current, { yPercent: 150, opacity: 0, visibility: "hidden" });
    requestAnimationFrame(() => {
      if (bottomNavRef.current) {
        bottomNavRef.current.style.visibility = "visible";
      }
    });

    // All triggers are created after lazy sections mount
    const triggers: ScrollTrigger[] = [];

    function createTriggers() {
      // Need #sobre to exist (lazy loaded)
      if (!document.getElementById("sobre")) return false;

      // Bottom nav appears when #sobre enters viewport
      triggers.push(ScrollTrigger.create({
        trigger: "#sobre",
        start: "top 80%",
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
      }));

      // Track active section
      NAV_LINKS.forEach((link) => {
        triggers.push(ScrollTrigger.create({
          trigger: `#${link.id}`,
          start: "top 80%",
          end: "bottom 80%",
          onEnter: () => setActiveSection(link.id),
          onEnterBack: () => setActiveSection(link.id),
        }));
      });

      // Track light background for sponsors section
      const lightBgEl = document.querySelector("#patrocinio > .bg-\\[\\#f9f6ee\\]");
      if (lightBgEl) {
        triggers.push(ScrollTrigger.create({
          trigger: lightBgEl,
          start: "top bottom-=80",
          end: "bottom bottom-=80",
          onEnter: () => setOnLightBg(true),
          onLeave: () => setOnLightBg(false),
          onEnterBack: () => setOnLightBg(true),
          onLeaveBack: () => setOnLightBg(false),
        }));
      }

      return true;
    }

    // Sections are lazy-loaded — wait for them to mount
    let observer: MutationObserver | null = null;
    if (!createTriggers()) {
      observer = new MutationObserver(() => {
        if (createTriggers()) {
          observer?.disconnect();
          ScrollTrigger.refresh();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      triggers.forEach((t) => t.kill());
      observer?.disconnect();
    };
  }, []);

  return (
    <>
      {/* Mobile nav — fixed */}
      <nav className="md:hidden fixed top-4 left-4 right-4 z-[60]">
        <div className="bg-white/12 backdrop-blur-[9.2px] flex items-center justify-between p-[6px] rounded-[4px]">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-center items-center w-[48px] h-[38px] px-[10px] py-3 gap-[6px] outline-none"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <span className={`w-7 h-1 bg-white transition-transform duration-300 ${menuOpen ? "translate-y-[5px] rotate-45" : ""}`} />
            <span className={`w-7 h-1 bg-white transition-transform duration-300 ${menuOpen ? "-translate-y-[5px] -rotate-45" : ""}`} />
          </button>
          <CTAButton>Contato</CTAButton>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden fixed top-[76px] left-4 right-4 z-[55]">
          <div className="bg-white/12 backdrop-blur-[9.2px] rounded-[4px] flex flex-col items-center py-10 px-6 gap-8 outline-none">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)}
                className={`font-archivo-condensed font-extrabold text-[22px] uppercase tracking-[-0.03em] outline-none ${activeSection === link.id ? "text-white" : "text-[#949da6]"}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Desktop top nav */}
      <nav
        ref={topNavRef}
        aria-label="Navegacao principal"
        className="hero_nav hidden md:block absolute top-4 left-4 right-4 z-50"
      >
        <div className="flex items-start justify-between">
          <div className="bg-white/12 flex items-center px-[17px] py-3 rounded-[6px] overflow-x-auto">
            <NavLinks activeSection={activeSection} />
          </div>
          <CTAButton>Contato</CTAButton>
        </div>
      </nav>

      {/* Desktop bottom sticky nav */}
      <nav
        ref={bottomNavRef}
        aria-label="Navegacao principal"
        className="hidden md:block fixed bottom-5 left-1/2 -translate-x-1/2 z-50"
      >
        <div className={`backdrop-blur-[20px] flex gap-[18px] items-center p-[6px] rounded-[6px] transition-colors duration-300 ${onLightBg ? "bg-[#0a1e36]/95" : "bg-white/7"}`} style={{ willChange: "transform", backfaceVisibility: "hidden" }}>
          <div className="flex items-center">
            <NavLinks activeSection={activeSection} onLightBg={onLightBg} />
          </div>
          <CTAButton>Contato</CTAButton>
        </div>
      </nav>
    </>
  );
}
