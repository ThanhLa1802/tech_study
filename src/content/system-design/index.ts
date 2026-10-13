import type { CourseModule } from "@/lib/course-types";
import { sdFoundationsModule } from "./foundations";
import { sdCoreConceptsModule } from "./core-concepts";
import { sdNetworkingApisModule } from "./networking-apis";
import { sdLoadBalancingModule } from "./load-balancing";
import { sdCachingModule } from "./caching";
import { sdDatabaseFundamentalsModule } from "./database-fundamentals";
import { sdDataModule } from "./data";
import { sdDistributedSystemsModule } from "./distributed-systems";
import { sdReliabilityModule } from "./reliability";
import { sdArchitecturePatternsModule } from "./architecture-patterns";
import { sdDesignProcessModule } from "./design-process";
import { sdCaseStudiesModule } from "./case-studies";

export const systemDesignModules: CourseModule[] = [
  sdFoundationsModule,
  sdCoreConceptsModule,
  sdNetworkingApisModule,
  sdLoadBalancingModule,
  sdCachingModule,
  sdDatabaseFundamentalsModule,
  sdDataModule,
  sdDistributedSystemsModule,
  sdReliabilityModule,
  sdArchitecturePatternsModule,
  sdDesignProcessModule,
  sdCaseStudiesModule,
];
