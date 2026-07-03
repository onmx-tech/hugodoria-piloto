import { CountUp } from "./CountUp";

export function StatItem({ value, label }: { value: string; label: string }) {
  const num = parseInt(value);
  const suffix = value.replace(/\d/g, "");
  return (
    <div className="stats_item flex flex-col">
      <p className="font-archivo-expanded font-light text-[#d86527] text-[clamp(44px,12vw,72px)] tracking-[-0.03em] uppercase leading-[1.0]">
        <CountUp value={num} suffix={suffix} />
      </p>
      <div className="w-full h-px bg-white/18 mt-4 mb-3" />
      <p className="font-['Inter',sans-serif] font-medium text-[14px] text-[rgba(238,235,228,0.83)] uppercase leading-[1.54]">
        {label}
      </p>
    </div>
  );
}
