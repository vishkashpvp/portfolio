import type { SimpleIcon } from "simple-icons";

export function BrandIcon({
  icon,
  className,
  useCurrentColor,
}: {
  icon: SimpleIcon;
  className?: string;
  /** When true, fill uses `currentColor` (inherits `color` from ancestors). */
  useCurrentColor?: boolean;
}) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden>
      <path
        d={icon.path}
        fill={useCurrentColor ? "currentColor" : `#${icon.hex}`}
      />
    </svg>
  );
}
