type BrandLogoProps = {
  className?: string;
  title?: string;
};

/** The approved existing Adnan Ai light full-logo artwork, rendered inline for reliable public hosting. */
export function BrandLogo({ className, title = "Adnan Ai" }: BrandLogoProps) {
  return (
    <svg className={className} viewBox="0 0 800 200" role="img" aria-label={title} preserveAspectRatio="xMinYMid meet">
      <g transform="translate(16 34) scale(2.0625)">
        <rect width="64" height="64" rx="16" fill="#080808" />
        <path d="M15 48 27 15h10l12 33h-9l-2.5-8H26.3L23.7 48h-9Zm14-16h5.8L32 23.2 29 32Z" fill="#f0ece6" />
        <path d="M42 16h7v32h-7z" fill="#a8ff3e" />
      </g>
      <text x="176" y="122" fill="#f0ece6" fontFamily="Georgia, Times New Roman, serif" fontSize="92" fontWeight="500" letterSpacing="2">Adnan Ai</text>
    </svg>
  );
}
