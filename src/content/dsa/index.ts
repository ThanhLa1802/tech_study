import type { CourseModule } from "@/lib/course-types";
import { welcomeModule } from "./welcome";
import { bigOModule } from "./big-o";
import { arraysStringsModule } from "./arrays-strings";
import { hashTablesModule } from "./hash-tables";
import { linkedListModule } from "./linked-list";
import { stacksQueuesModule } from "./stacks-queues";
import { treesModule } from "./trees";
import { heapsModule } from "./heaps";
import { sortingModule } from "./sorting";
import { twoPointersModule } from "./two-pointers";
import { binarySearchModule } from "./binary-search";
import { slidingWindowModule } from "./sliding-window";
import { recursionBacktrackingModule } from "./recursion-backtracking";
import { graphsModule } from "./graphs";
import { dynamicProgrammingModule } from "./dynamic-programming";

export const dsaModules: CourseModule[] = [
  welcomeModule,
  bigOModule,
  arraysStringsModule,
  hashTablesModule,
  linkedListModule,
  stacksQueuesModule,
  treesModule,
  heapsModule,
  sortingModule,
  twoPointersModule,
  binarySearchModule,
  slidingWindowModule,
  recursionBacktrackingModule,
  graphsModule,
  dynamicProgrammingModule,
];
