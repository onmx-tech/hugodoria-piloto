import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Kicker } from "../../components/ui/Kicker";
import { OptimizedImage } from "../../components/media/OptimizedImage";
import { CTAButton } from "../../components/navigation/CTAButton";
import { whatsappWith } from "../../data/contact";
import { COTAS, EVENT_FACTS, LEGAL, RENEWAL } from "../../data/superfinal";

export function SuperFinalSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".superfinal_heading > *", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".superfinal_heading", start: "top 82%" },
      });
      gsap.to(".superfinal_photo img", {
        yPercent: -6,
        ease: "none",
        scrollTrigger: { trigger: ".superfinal_stage", start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.from(".superfinal_cota", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".superfinal_cotas", start: "top 85%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="super-final" ref={ref} className="relative bg-[#041221] overflow-hidden z-[2]">
      {/* A foto abre sem texto em cima: o rosto, o #91 e os troféus precisam ser vistos. */}
      <div className="superfinal_stage">
        <div className="superfinal_photo relative w-full h-[62svh] md:h-[86svh] overflow-hidden">
          <OptimizedImage
            name="photo-numero-91-trofeus"
            alt="Hugo Netto ao lado do carro #91 com os troféus da temporada sobre o capô"
            sizes="max(100vw, 130svh)"
            imgClassName="absolute inset-0 object-cover size-full object-[22%_30%] scale-[1.08]"
          />
          <div className="absolute inset-x-0 bottom-0 h-[28%]" style={{ background: "linear-gradient(180deg, rgba(4,18,33,0) 0%, #041221 100%)" }} />
        </div>

        <div className="relative w-full max-w-[1400px] mx-auto px-5 md:px-10 lg:px-14 pt-6 md:pt-10">
          <div className="superfinal_heading">
            <Kicker label="Autódromo de Interlagos" sub="Paddock VIP" className="mb-7" />
            <h2 className="font-archivo-expanded font-extrabold text-[#e1dcd0] text-[clamp(30px,4.35vw,68px)] tracking-[-0.03em] uppercase leading-[0.98]">
              A grande final do ano.
              <span className="block text-[#d86527]">Sua última chance em 2026.</span>
            </h2>
            <p className="font-['Inter',sans-serif] text-[15px] md:text-lg text-[rgba(238,235,228,0.86)] leading-[1.6] mt-6 md:mt-8 max-w-[680px]">
              Camarote exclusivo dentro do Paddock VIP. A Super Final encerra a temporada como o maior evento do ano da AMG Cup Brasil. É a última oportunidade para sua marca se associar a um piloto vencedor, diante de um público seleto e com hospitalidade premium.
            </p>
          </div>

          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 mt-10 md:mt-14 pt-6 border-t border-white/15">
            {EVENT_FACTS.map((f) => (
              <div key={f.k}>
                <dt className="font-archivo-expanded font-bold text-[#d86527] text-[10px] tracking-[0.16em] uppercase leading-none mb-2">{f.k}</dt>
                <dd className="font-archivo-expanded font-extrabold text-[#e1dcd0] text-[clamp(15px,1.7vw,22px)] uppercase tracking-[-0.01em] leading-[1.1]">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Cotas */}
      <div className="w-full max-w-[1400px] mx-auto px-5 md:px-10 lg:px-14 pt-20 md:pt-28 pb-24 md:pb-32">
        <div className="max-w-[720px] mb-10 md:mb-14">
          <Kicker label="Parcerias 2026 e 2027" className="mb-6" />
          <h3 className="font-archivo-expanded font-extrabold text-[#e1dcd0] text-[clamp(24px,4vw,44px)] tracking-[-0.03em] uppercase leading-[1.02]">
            Sua marca no centro da experiência
          </h3>
          <p className="font-['Inter',sans-serif] text-[15px] md:text-base text-[rgba(238,235,228,0.78)] leading-[1.65] mt-5">
            Do carro ao camarote, do uniforme ao brinde, sua marca presente em cada momento da Super Final.
          </p>
        </div>

        <div className="superfinal_cotas grid lg:grid-cols-3 gap-4 md:gap-5 items-start">
          {COTAS.map((c) => (
            <article
              key={c.name}
              className={`superfinal_cota flex flex-col rounded-2xl p-6 md:p-8 ${
                c.featured ? "bg-[#f9f6ee] text-[#041221]" : "bg-[#0a2138] text-[#e1dcd0]"
              }`}
            >
              <h4 className="font-archivo-expanded font-bold text-[#d86527] text-[11px] tracking-[0.18em] uppercase leading-none">
                Cota {c.name}
              </h4>
              <p className="font-archivo-expanded font-light text-[clamp(38px,4.4vw,60px)] tracking-[-0.04em] leading-none mt-5">
                {c.price}
              </p>
              <ul className={`mt-7 border-t ${c.featured ? "border-[#041221]/15" : "border-white/12"}`}>
                {c.items.map((item) => (
                  <li
                    key={item}
                    className={`font-['Inter',sans-serif] text-[14px] leading-[1.4] py-2.5 border-b ${
                      c.featured ? "border-[#041221]/10 text-[#041221]/85" : "border-white/8 text-[rgba(238,235,228,0.82)]"
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-7 flex">
                <CTAButton href={whatsappWith(`Olá! Vim pelo site do Hugo Netto e gostaria de falar sobre a cota ${c.name} da Super Final.`)}>
                  Quero a cota {c.name}
                </CTAButton>
              </div>
            </article>
          ))}
        </div>

        <div className="grid lg:grid-cols-[auto_1fr] gap-x-16 gap-y-4 mt-8 md:mt-10">
          <p className="font-archivo-expanded font-bold text-[#e1dcd0] text-[13px] tracking-[0.02em] uppercase leading-[1.4] lg:max-w-[360px]">
            {RENEWAL}
          </p>
          <p className="font-['Inter',sans-serif] text-[12px] text-[rgba(238,235,228,0.62)] leading-[1.6]">
            {LEGAL}
          </p>
        </div>
      </div>
    </section>
  );
}
