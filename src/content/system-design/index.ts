import type { CourseModule } from "@/lib/course-types";
import { sdFoundationsModule } from "./foundations";
import { sdBuildingBlocksModule } from "./building-blocks";
import { sdDataModule } from "./data";
import { sdReliabilityModule } from "./reliability";

export const systemDesignModules: CourseModule[] = [
  sdFoundationsModule,
  sdBuildingBlocksModule,
  sdDataModule,
  sdReliabilityModule,
];
