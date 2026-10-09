/**
 * A small grid with a glowing node that hops one cell per step (right → down
 * → left → up) on an infinite loop. Transform-only animation (see
 * `.node-hop-node` in globals.css) so it stays on the GPU.
 */
export function NodeHopBoard({ className = "" }: { className?: string }) {
  return (
    <div className={`node-hop-grid ${className}`} aria-hidden="true">
      <span className="node-hop-node" />
    </div>
  );
}
