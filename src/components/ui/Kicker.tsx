/**
 * Kicker editorial reutilizável: linha + label laranja + ◆ + sublabel opcional.
 * Base do sistema visual da v2 (mesma linguagem do hero).
 */
export function Kicker({
  label,
  sub,
  className = "",
  align = "left",
}: {
  label: string;
  sub?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""} ${className}`}
    >
      <span className="h-px w-8 md:w-12 bg-[#d86527]" />
      <p className="font-archivo-expanded font-bold text-[#d86527] text-[10px] md:text-[11px] tracking-[0.18em] uppercase leading-none">
        {label}
      </p>
      {sub && (
        <>
          <span className="text-[#d86527]/50 text-[10px]">◆</span>
          <p className="font-archivo-expanded font-bold text-[#e1dcd0]/70 text-[10px] md:text-[11px] tracking-[0.18em] uppercase leading-none">
            {sub}
          </p>
        </>
      )}
    </div>
  );
}
