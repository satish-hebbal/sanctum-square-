import type { SVGProps } from "react";

/**
 * Brand marks, drawn here because lucide-react no longer ships any — it
 * dropped every brand icon, so `Instagram` and `Linkedin` simply do not exist
 * in the package any more.
 *
 * These follow lucide's own geometry and conventions exactly (24x24 box,
 * `currentColor`, round caps and joins, stroke width passed in) so they sit
 * beside `Mail` and `Phone` without looking like they came from somewhere
 * else.
 */

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
  strokeWidth?: number;
};

function Icon({ size = 24, strokeWidth = 2, children, ...rest }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function Instagram(props: IconProps) {
  return (
    <Icon {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </Icon>
  );
}

export function Linkedin(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </Icon>
  );
}

/** Maps a social entry's label to its mark. */
export const socialIcons = {
  Instagram,
  LinkedIn: Linkedin,
} as const;
