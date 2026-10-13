"use client";

import type { Visualizer } from "@/lib/course";
import type { Locale } from "@/lib/locale";
import AlgorithmVisualizer from "./algorithm-visualizer";
import ComplexityVisualizer from "./complexity-visualizer";
import DiagramVisualizer from "./diagram-visualizer";
import SequenceVisualizer from "./sequence-visualizer";
import ConsistentHashingRing from "./consistent-hashing-ring";
import RateLimitWindow from "./rate-limit-window";
import RequestFlow from "./request-flow";
import FixedSlidingWindowMotion from "./fixed-sliding-window-motion";
import SlidingWindowMotion from "./sliding-window-motion";
import { diagramVisualizers } from "./diagram-specs";
import { sequenceVisualizers } from "./sequence-specs";
import { visualizers } from "./specs";
import {
  structureArrayVisualizers,
  structureDiagramVisualizers,
} from "./structure-specs";

export default function LessonVisualizer({
  type,
  locale,
}: {
  type: Visualizer;
  locale: Locale;
}) {
  if (type === "big-o-growth") {
    return <ComplexityVisualizer locale={locale} />;
  }
  if (type === "sliding-window") {
    return <SlidingWindowMotion locale={locale} />;
  }
  if (type === "fixed-sliding-window") {
    return <FixedSlidingWindowMotion locale={locale} />;
  }
  if (type === "consistent-hashing-ring") {
    return <ConsistentHashingRing locale={locale} />;
  }
  if (type === "rate-limit-window") {
    return <RateLimitWindow locale={locale} />;
  }
  if (type === "request-flow") {
    return <RequestFlow locale={locale} />;
  }
  if (type in structureDiagramVisualizers) {
    return (
        <DiagramVisualizer
        spec={
          structureDiagramVisualizers[
            type as keyof typeof structureDiagramVisualizers
          ]
        }
        locale={locale}
      />
    );
  }
  if (type in structureArrayVisualizers) {
    return (
        <AlgorithmVisualizer
        spec={
          structureArrayVisualizers[
            type as keyof typeof structureArrayVisualizers
          ]
        }
        locale={locale}
      />
    );
  }
  if (type in diagramVisualizers) {
    return (
      <DiagramVisualizer
        spec={diagramVisualizers[type as keyof typeof diagramVisualizers]}
        locale={locale}
      />
    );
  }
  if (type in sequenceVisualizers) {
    return (
      <SequenceVisualizer
        spec={sequenceVisualizers[type as keyof typeof sequenceVisualizers]}
        locale={locale}
      />
    );
  }
  return (
    <AlgorithmVisualizer
      spec={visualizers[type as keyof typeof visualizers]}
      locale={locale}
    />
  );
}
