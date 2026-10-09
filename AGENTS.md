<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Learning Hub — agent notes

Interactive **DSA & System Design** learning site. Next.js 16 (App Router) + React 19 + Tailwind v4 + TypeScript. All lesson content lives in **TypeScript files**, not MDX. UI and content are Vietnamese.

## Working principles

Condensed from `G:\STUDY\AI\ai_factory\CLAUDE.md` (a trusted behavioral guideline on this machine):

- **Think first** — state assumptions, surface trade-offs, ask when a request is ambiguous.
- **Simplicity first** — minimum code that solves the ask; no speculative abstractions, config, or error handling for impossible cases.
- **Surgical changes** — touch only what the task needs, match existing style, don't refactor/delete unrelated code.
- **Goal-driven** — restate the task as a verifiable result (usually a test) and loop until it passes.

## Commands

- `npm run dev` — Turbopack dev server at `http://localhost:3000`.
- `npm run build` — production build; runs `generateStaticParams`, so it validates/normalizes every lesson.
- `npm run lint` — runs bare `eslint` (flat config, whole project). Does **not** typecheck.
- `npx tsc --noEmit` — the only typecheck (documented in README; there is no npm script).
- `npm test` — `vitest run` (all unit tests). Single file: `npx vitest run src/lib/quiz.test.ts`. Single test: `npx vitest run -t "<name>"`.
- `npm run test:e2e` — Playwright; auto-starts `npm run dev` on :3000 and reuses a running server unless `CI`. Single spec: `npx playwright test e2e/quiz.spec.ts`.

## Architecture map

- `src/app/learn/[course]/[slug]/page.tsx` — lesson renderer. The `Blocks` function maps block types to components; the TOC is built from `h2` blocks (each gets `id="section-{blockIndex}"`), then a visualizer section (`#mo-phong`) and quiz (`#bai-kiem-tra`). Server component in `<Suspense>`; `generateStaticParams` pre-renders every lesson.
- `src/lib/course.ts` — eagerly validates all content with zod on import and exports `courses`, `findLesson`, `getAdjacentLessons` (flat prev/next across the whole course).
- `src/content/{dsa,system-design}/index.ts` — module registries. Each module is a `.ts` file exporting a `CourseModule`.
- `src/lib/course-types.ts` + `src/content/schema.ts` — the hand-kept type/validation pair (see gotchas).
- `src/components/visualizers/lesson-visualizer.tsx` — dispatches a lesson's `visualizer` to one of three engines (below).

## Authoring content (the main workflow)

- A new module = a new file exporting `CourseModule`, added to the course's `index.ts` array. Array order defines sidebar/prev-next order.
- `slug` must be kebab-case (regex-enforced); quiz `answer` must be a valid options index (superRefine).
- `parentSlug` nests a lesson under another — see the three `complexity-quiz-*` lessons under `complexity-drill` in `src/content/dsa/big-o.ts`. The sidebar filters top-level lessons (`!parentSlug`) and renders children beneath.
- Blocks are a discriminated union: `p | h2 | h3 | ul | code | diagram`. Only `h2` becomes a TOC entry; an unknown block type fails validation.
- Adding a `visualizer` value requires edits in **three synced places**: the zod enum in `src/content/schema.ts`, the `Visualizer` union in `src/lib/course-types.ts`, and a spec/registry plus a branch in `lesson-visualizer.tsx`.

## Visualizers

- DSA (animated bars): spec in `specs.ts`, engine `algorithm-visualizer.tsx`.
- `big-o-growth`: special-cased to `complexity-visualizer.tsx`; the math lives in `src/lib/complexity.ts`.
- System design (SVG diagrams): spec in `diagram-specs.ts`, engine `diagram-visualizer.tsx`; geometry helpers in `src/lib/diagram.ts`.
- All visualizers are `"use client"`. **No external animation/icon/UI libraries** — everything is hand-drawn SVG (README constraint); use the existing `Icon`/`course-icons.tsx`.

## Testing gotchas

- Vitest is `environment: "node"` and only includes `src/**/*.test.ts`. `.test.tsx`/DOM tests are silently **not** picked up; existing tests are pure logic only. There is no React-render test setup — verify UI via `npm run dev`.
- E2E specs in `e2e/` hit lesson slugs `complexity-drill` and `complexity-quiz-easy`, assert the quiz shows `2/10` (10 questions), and run an axe WCAG check. Changing those slugs or the quiz length breaks `npm run test:e2e`.

## Known edges

- Content is validated on **import**: one malformed lesson throws during `npm run build` and breaks the whole app, not just that route.
- Tailwind v4 has **no `tailwind.config`**; tokens are in `src/app/globals.css` (`@theme inline`). Use semantic classes like `bg-surface`, `text-accent` — plus the `@tailwindcss/turbopack` loader wired in `next.config.ts`.
- `next.config.ts` `cacheComponents`/`partialPrefetching` and the auto-generated Next.js block at the top of this file are intentional; `next dev` re-adds the block if removed.
- The README "Việc tiếp theo" checklist is the roadmap (remaining System Design lessons, more visualizers, progress persistence, mobile sidebar/search).
