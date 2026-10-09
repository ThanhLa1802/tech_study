import DiagramSvg from "@/components/diagram-svg";
import type { DiagramEdge, DiagramNode } from "@/lib/diagram";

export default function DiagramBlock({
  nodes,
  edges,
  caption,
}: {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  caption?: string;
}) {
  return (
    <figure className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-3">
      <DiagramSvg nodes={nodes} edges={edges} />
      {caption ? (
        <figcaption className="mt-2 text-center text-xs text-zinc-400">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
