# Bilingual Vietnamese / English plan

## Goal

Make the full Learning Hub experience understandable and natural in both Vietnamese and English. Do not force-translate technical terms when the English term is clearer or more widely used; explain the term in the selected language instead.

## Language and terminology rules

- Write short, direct explanations and teach concepts through concrete examples.
- Prefer established Vietnamese translations where they sound natural. At first use, include the English term when it helps learners connect terminology across sources.
- Keep technical terms in English when translating them would be awkward or misleading, and explain them briefly in Vietnamese.
- Keep code, identifiers, API names, standard notation, and algorithm names intact unless a user-facing explanation needs localization.
- Prefer Python for instructional code examples: place Python first and show it by default when multiple implementations are available. Keep other languages as secondary tabs when useful.
- Write English copy as natural instructional English, not as a literal translation of Vietnamese copy.
- Maintain a small glossary of preferred translations and terms intentionally kept in English.

## Implementation plan

1. Add locale-aware routing for `vi` and `en`; make Vietnamese the default and preserve existing unprefixed URLs with redirects.
2. Make the document language and page metadata match the selected locale.
3. Add localized UI copy for the home page, navigation, lesson chrome, quizzes, diagrams, and visualizer controls.
4. Localize course, module, lesson, block, and quiz text while sharing stable slugs, ordering, code samples, visualizer behavior, and other structural data.
5. Add a language switch that stays on the equivalent page and does not silently display Vietnamese content under an English URL (or vice versa).
6. Validate translation completeness and matching lesson/quiz structure, then test route generation, navigation, content, metadata, and legacy redirects.

## Acceptance criteria

- Every supported route renders with the correct `lang`, UI language, and content language.
- Both locale versions preserve the same course/lesson structure, stable URLs, diagrams, code, visualizers, and quiz answer indices.
- Language switching opens the equivalent page in the other locale.
- No untranslated UI labels or missing lesson/quiz translations silently fall back to another language.
- Existing unprefixed routes continue to reach their Vietnamese equivalent.
- Glossary rules are followed consistently, prioritizing learner understanding over literal translation.

## Implementation status

- Locale-prefixed `/vi` and `/en` routes, Vietnamese default redirects, locale-specific document language, metadata, and language switching are in place.
- UI copy for the home page, lesson navigation, quiz controls, and visualizer controls is localized. The switcher labels are `English` and `Vietnamese`.
- Python is the first/default code tab whenever a lesson provides a Python implementation.
- English translations now cover the entire planned lesson set: both welcome lessons, all DSA lessons (Big O, Arrays & Strings, Hash Tables, Linked Lists, Stacks & Queues, Trees, Heaps, Sorting, Two Pointers, Binary Search, Sliding Window, Recursion & Backtracking, Graphs, and Dynamic Programming), and all System Design lessons (Foundations, Building Blocks, Data, and Reliability). No lesson batches remain untranslated.
- Diagram visualizers accept per-locale text overrides (title, pseudocode, legend); the Linked List, BST search, Graph BFS, Round Robin load-balancer, and Token Bucket rate-limiter visualizers (title, pseudo/comment, legend, frame notes, stats) are localized to English while Vietnamese remains the default. Array visualizers for Stack, Queue, and Binary Heap likewise localize their notes, legends, stats, and title; the Selection Sort, Insertion Sort, Two Sum, and Binary Search array visualizers localize their frame notes; and the Sliding Window and DP 1D array visualizers localize their English title/legends/frame notes/stats.
- The project subagent `.opencode/agents/lesson-research-advisor.md` researches and cross-checks technical claims against reputable sources before new lesson material is drafted.
- Lessons without a reviewed English translation show an explicit translation-in-progress page instead of silently displaying Vietnamese content.

## Sequential translation and Vietnamese-review queue

Work on **one batch at a time**, following this list. The next agent picks the first unchecked prerequisite, then the first unchecked lesson batch; mark it in progress and complete it only after both languages are reviewed and tests pass. Do not work on later batches in parallel because they share the translation registry and coverage tests.

For every batch:

0. When adding new material or materially changing a technical claim, use `.opencode/agents/lesson-research-advisor.md` first to research and cross-check the claim; keep its source-to-claim map in the task notes/final report, not as unschematized lesson UI copy. A translation-only batch still needs a technical accuracy review against its Vietnamese source.
1. Add complete, natural English translations for every listed lesson, including summaries, every visible prose block, quiz prompts/options/explanations, and diagram/visualizer text where present. Preserve slugs, ordering, code behavior, and quiz answer indices. If the current translation model cannot represent some visible text (for example, diagram labels), record and route the required technical change to a code agent rather than silently leaving Vietnamese in the English lesson.
2. Review and edit the Vietnamese source copy in the same module for clarity, naturalness, terminology consistency, and technical accuracy; avoid rewriting text that already meets the standard.
3. Extend translation completeness, locale navigation, quiz-answer, and no-Vietnamese-leak checks for the new lessons. Do not expose a partially translated lesson in English.
4. Run `npx vitest run src/content/translations.test.ts` and `npx tsc --noEmit`; run the full test suite/build when practical. Update this plan before picking the next batch.

### Shared localization prerequisites

- [x] Add English presentation overrides for natural-language text inside code/pseudocode snippets and diagram node/edge labels, then extend leak tests to cover code, diagrams, and quiz tags/code. Audited published English lessons and filled the detected Big O / Arrays & Strings code-comment gaps and `array-basics` diagram subtitles.
- [x] Added per-locale text overrides to diagram visualizer specs (`DiagramSpec.overrides` + `localizeDiagramSpec`), passed locale into `build`, and localized the Linked List search visualizer (title, legend, frame notes). Remaining visualizer batches localize their own text as they publish.

### DSA — course order

- [x] **Big O — remaining lessons** (`src/content/dsa/big-o.ts`): `big-o-best-worst-average`, `complexity-drill`, `complexity-quiz-easy`, `complexity-quiz-medium`, `complexity-quiz-hard` — English and Vietnamese copy reviewed; quiz/navigation checks pass.
- [x] **Hash Tables** (`src/content/dsa/hash-tables.ts`): `hash-table-basics`, `hash-map-patterns`, `hash-tables-quiz` — English translations and Vietnamese technical/copy review complete; Group Anagrams complexity corrected; quiz/navigation tests pass.
- [x] **Linked Lists** (`src/content/dsa/linked-list.ts`): `linked-list-basics`, `linked-list-operations`, `linked-list-quiz` — English translations and visualizer localization complete; quiz/navigation checks pass.
- [x] **Stacks & Queues** (`src/content/dsa/stacks-queues.ts`): `stack`, `queue`, `stacks-queues-quiz` — English translations complete; Stack/Queue array visualizers localized (notes, legends, stats, title) with Vietnamese as default; quiz/navigation/no-leak checks pass.
- [x] **Trees** (`src/content/dsa/trees.ts`): `tree-basics`, `binary-search-tree`, `tree-traversal`, `trees-quiz` — English translations complete; BST search visualizer localized (title, legend, frame notes) with Vietnamese as default; navigation/quiz/no-Vietnamese-leak checks pass.
- [x] **Heaps** (`src/content/dsa/heaps.ts`): `heap-basics`, `priority-queue`, `heaps-quiz` — English translations complete; static min/max heap diagram captions translated; binary-heap array visualizer localized (notes, legends, stats, title) with Vietnamese as default; quiz/navigation/no-Vietnamese-leak checks pass.
- [x] **Sorting — remaining lessons** (`src/content/dsa/sorting.ts`): `selection-sort`, `insertion-sort` — English translations complete; Selection/Insertion array visualizers localized (frame notes) with Vietnamese as default; navigation/no-Vietnamese-leak checks pass.
- [x] **Two Pointers** (`src/content/dsa/two-pointers.ts`): `two-sum`, `two-pointers-quiz` — English translations complete; Two Sum array visualizer localized (frame notes) with Vietnamese as default; quiz/navigation/no-Vietnamese-leak checks pass.
- [x] **Binary Search** (`src/content/dsa/binary-search.ts`): `binary-search`, `binary-search-quiz` — English translations complete; Binary Search array visualizer localized (frame notes) with Vietnamese as default; quiz/navigation/no-Vietnamese-leak checks pass.
- [x] **Sliding Window** (`src/content/dsa/sliding-window.ts`): `fixed-sliding-window`, `variable-sliding-window`, `sliding-window-quiz` — English translations complete; the fixed-window diagram (caption and node subtitles) is translated and the variable-size `sliding-window` array visualizer is localized (title, legends, frame notes) with Vietnamese as default; quiz/navigation/no-Vietnamese-leak checks pass.
- [x] **Recursion & Backtracking** (`src/content/dsa/recursion-backtracking.ts`): `recursion-basics`, `backtracking`, `recursion-backtracking-quiz` — English translations complete; the new `backtracking` subset decision-tree diagram (caption, node labels/subtitles, and edge labels) is translated; navigation/quiz/no-Vietnamese-leak checks pass.
- [x] **Graphs** (`src/content/dsa/graphs.ts`): `graph-basics`, `graph-traversal`, `graphs-quiz` — English translations complete; the new static `graph-basics` diagram (caption) is translated and the Graph BFS visualizer (title, legend, frame notes, stats labels/queue-empty value) is localized with Vietnamese as default; quiz/navigation/no-Vietnamese-leak checks pass.
- [x] **Dynamic Programming** (`src/content/dsa/dynamic-programming.ts`): `dp-basics`, `dp-patterns`, `dp-quiz` — English translations complete; the new static 2D knapsack table diagram (caption and row subtitles) is translated and the DP 1D array visualizer (legend, frame notes, stats labels) is localized with Vietnamese as default; quiz/navigation/no-Vietnamese-leak checks pass. This completes the DSA course.

### System Design — course order

- [x] **Foundations — remaining lessons** (`src/content/system-design/foundations.ts`): `sd-what-is-system-design`, `sd-top-30-concepts`, `sd-scalability`, `sd-latency-throughput` — English translations complete; the `sd-what-is-system-design` architecture diagram caption and `cdn-client` edge label and the Foundations `codeText` (photo-app API table and idempotency snippet, including English comments) are translated; navigation/no-Vietnamese-leak checks pass. Foundations is fully translated; later System Design groups remain.
- [x] **Building Blocks** (`src/content/system-design/building-blocks.ts`): `sd-load-balancing`, `sd-caching`, `sd-cdn` — English translations complete; the new `sd-caching` block 8 and `sd-cdn` block 6 diagrams (captions, node subtitles, edge labels) are translated with ids/topology preserved, and the `load-balancer-round-robin` visualizer (title, pseudocode comment, legend, frame notes, stats) is localized with Vietnamese as default; navigation/no-Vietnamese-leak checks pass. Data and Reliability remain.
- [x] **Data** (`src/content/system-design/data.ts`): `sd-sharding`, `sd-replication`, `sd-cap` — English translations complete; the three new static diagrams (`sd-sharding` block 8 consistent-hashing ring, `sd-replication` block 7 leader–followers, `sd-cap` block 6 CAP triangle) have translated captions, node labels/subtitles, and edge labels with ids/topology preserved; navigation/no-Vietnamese-leak checks pass. Reliability remains.
- [x] **Reliability** (`src/content/system-design/reliability.ts`): `sd-message-queues`, `sd-rate-limiting` — English translations complete; the `token-bucket` visualizer (title, pseudocode comment, legend, frame notes, stats) is localized with Vietnamese as default; navigation/no-Vietnamese-leak checks pass. This completes the planned DSA and System Design English translation rollout.

### Follow-up rollout work

- [ ] Replace JavaScript-only instructional code examples with Python, or add a reviewed Python implementation as the primary example; retain JavaScript as a secondary option where useful.
- [ ] Complete a terminology glossary with preferred Vietnamese equivalents and terms intentionally kept in English.
