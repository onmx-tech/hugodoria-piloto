import React from "react";

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-archivo-expanded font-bold text-[#d86527] text-[10px] md:text-xs tracking-[-0.3px] uppercase leading-[1.127]">
      {children}
    </p>
  );
}
