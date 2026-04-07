import svgPaths from "../../assets/svg/sponsors";

export function LogoSvg({ clipId }: { clipId: string }) {
  return (
    <svg className="w-[122px] h-[49px]" fill="none" viewBox="0 0 122 49" role="img" aria-label="Logo de patrocinador">
      <g clipPath={`url(#${clipId})`}>
        <path d={svgPaths.p1a612d80} fill="#1D2633" />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect fill="white" height="49" width="122" />
        </clipPath>
      </defs>
    </svg>
  );
}
