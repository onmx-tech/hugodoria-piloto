import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Kicker } from "../../components/ui/Kicker";
import { INSTAGRAM_MEDICO, INSTAGRAM_PILOTO, SITE_MEDICO } from "../../data/contact";

// Assessoria, 10/11/2026: a apresentação dele vem logo no começo da página.
// Fonte: proposta da Super Final. CFM: neurocirurgião sempre com CRM e RQE.
export function IntroSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".intro_reveal > *", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="apresentacao" ref={ref} className="relative bg-[#041221] border-t border-white/10 z-[2]">
      <div className="w-full max-w-[1400px] mx-auto px-5 md:px-10 lg:px-14 pt-20 md:pt-28 grid md:grid-cols-12 gap-10 md:gap-8">
        <div className="intro_reveal md:col-span-5">
          <Kicker label="Apresentação" className="mb-7" />
          <h2 className="font-archivo-expanded font-extrabold text-[#e1dcd0] text-[clamp(26px,3.6vw,44px)] uppercase tracking-[-0.03em] leading-[1]">
            Dr. Hugo Doria Netto
          </h2>
          <p className="font-archivo-expanded font-extrabold text-[#d86527] text-[clamp(16px,1.8vw,22px)] uppercase tracking-[-0.01em] leading-none mt-3">
            MD, PhD
          </p>
          <p className="font-['Inter',sans-serif] text-[12px] text-[rgba(238,235,228,0.62)] tracking-[0.04em] mt-4">
            CRM-SP 118350, RQE 48918
          </p>
        </div>

        <div className="intro_reveal md:col-span-6 md:col-start-7 md:pt-12">
          <p className="font-['Inter',sans-serif] text-[17px] md:text-[20px] text-[#eeebe4] leading-[1.55]">
            Neurocirurgião há mais de 20 anos, com trajetória científica internacional e atuação em hospitais de referência. Doutor, com pesquisa publicada na revista World Neurosurgery.
          </p>
          <p className="font-['Inter',sans-serif] text-[15px] md:text-base text-[rgba(238,235,228,0.78)] leading-[1.65] mt-5">
            Neurosurgic é o projeto de fellowships voltado à formação, ao intercâmbio científico e à conexão entre especialistas.
          </p>
          {/* Dr. Hugo, 11/11/2026: "em cima dos @ podemos colocar clique e saiba mais". */}
          <p className="mt-8 pt-6 border-t border-white/12 font-['Inter',sans-serif] text-[12px] uppercase tracking-[0.12em] text-[rgba(238,235,228,0.62)]">
            Clique e saiba mais
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 font-['Inter',sans-serif] text-[14px] font-medium text-[#eeebe4]">
            <a href={INSTAGRAM_PILOTO} target="_blank" rel="noopener noreferrer" className="hover:text-[#d86527] transition-colors">@pilotohugonetto</a>
            <a href={INSTAGRAM_MEDICO} target="_blank" rel="noopener noreferrer" className="hover:text-[#d86527] transition-colors">@drhugodoria</a>
            <a href={SITE_MEDICO} target="_blank" rel="noopener noreferrer" className="hover:text-[#d86527] transition-colors">hugodoria.com.br</a>
          </div>
        </div>
      </div>
    </section>
  );
}
