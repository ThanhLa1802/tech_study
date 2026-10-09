import type { CourseModule } from "@/lib/course-types";
import { sdFoundationsModule } from "./foundations";
import { sdCoreConceptsModule } from "./core-concepts";
import { sdNetworkingApisModule } from "./networking-apis";
import { sdBuildingBlocksModule } from "./building-blocks";
import { sdDataModule } from "./data";
import { sdReliabilityModule } from "./reliability";

export const systemDesignModules: CourseModule[] = [
  sdFoundationsModule,
  sdCoreConceptsModule,
  sdNetworkingApisModule,
  sdBuildingBlocksModule,
  sdDataModule,
  sdReliabilityModule,
];
