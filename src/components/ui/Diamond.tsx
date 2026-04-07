export function Diamond({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center size-5 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:rotate-[360deg] ${className}`} aria-hidden="true">
      <div className="-rotate-45">
        <div className="bg-[#a84814] rounded-[3px] size-3.5" />
      </div>
    </div>
  );
}
