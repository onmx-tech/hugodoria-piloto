export function FeatureCard({ num, title, desc }: { num: string; title: string; desc: string }) {
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
