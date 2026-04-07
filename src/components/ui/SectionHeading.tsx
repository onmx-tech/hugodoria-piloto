import React from "react";

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-archivo-expanded font-extrabold text-[#e1dcd0] text-2xl md:text-[32px] tracking-[-0.96px] uppercase leading-[1.127]">
      {children}
    </h2>
  );
}
