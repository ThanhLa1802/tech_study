import type { CSSProperties, ReactNode } from "react";

export type GlowColor = "green" | "blue" | "violet";

/**
 * Wraps content in a thin ring drawn with an animated conic-gradient, so the
 * border appears to rotate. Pure CSS (see `.glow-card` in globals.css) — no
 * client JavaScript or animation library required.
 */
export function GlowCard({
  children,
  color = "green",
  speed = 8,
  className = "",
  innerClassName = "",
}: {
  children: ReactNode;
  color?: GlowColor;
  /** Seconds per full border revolution. */
  speed?: number;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div
      className={`glow-card ${className}`}
      data-color={color}
      style={{ "--glow-speed": `${speed}s` } as CSSProperties}
    >
      <div className={`glow-inner ${innerClassName}`}>{children}</div>
    </div>
  );
}
