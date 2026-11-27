# Magyar Learning MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the production-quality, static Hungarian vocabulary-learning MVP described in the supplied specification.

**Architecture:** A Vite React SPA keeps curriculum in typed local modules and progress in a versioned browser adapter. Pure domain functions own spelling normalization, mastery, review, metrics, quiz generation, and backup validation so the UI remains thin and the rules are independently testable.

**Tech Stack:** React, Vite, TypeScript, Tailwind CSS, Vitest, Testing Library, jsdom

**Spec:** `C:\Users\Legion\Downloads\Magyar_Learning_Website_MVP_Spec.md`

## Global Constraints

- Static frontend only: no backend, accounts, billing, API keys, database, or third-party services.
- Only `verified: true` curriculum items may enter student-facing activities; seed content remains clearly provisional pending language QA.
- Spelling uses Unicode NFC, case folding, trimming, and whitespace collapse without removing Hungarian accents.
- Mastery requires two correct meaning/listening responses and one correct spelling response from assessed attempts.
- Persistence and backups use schema version 1 and store IDs/outcomes, not curriculum text.
- Mobile-first, keyboard-accessible UI with reduced-motion support and graceful speech fallback.

## Review Focus

- Corrupt or unavailable localStorage returns safe empty progress without erasing valid data.
- Duplicate errors keep one review item and mastered words demote only after two consecutive errors.
- Unknown, oversized, or incompatible backups are rejected before overwrite.
- Modules with fewer than four unique answers still generate usable activities without duplicate distractors.
- Speech-unavailable flows expose text fallback and never block assessment.

---

### Task 1: Skeleton, curriculum, and navigation

**Files:** Create Vite/Tailwind configuration, `src/data/*`, `src/App.tsx`, `src/components/*`, `src/index.css`, and `src/test/navigation.test.tsx`.

**Interfaces:** Produces typed `MODULES`, filtered `VERIFIED_VOCABULARY`, and Dashboard/Learn/Progress routes controlled in app state.

- [ ] Write navigation and verified-content tests, then run them to observe failure.
- [ ] Add the scaffold, six module definitions, approved provisional seed vocabulary, responsive shell, persistent desktop header, and mobile bottom navigation.
- [ ] Run focused tests and commit-ready review.

### Task 2: Domain rules and study modes

**Files:** Create `src/domain/spelling.ts`, `src/domain/progress.ts`, `src/domain/quiz.ts`, mode components, and matching tests.

**Interfaces:** Produces `normalizeSpelling`, `isSpellingCorrect`, `recordAssessment`, `getWordStatus`, `calculateMetrics`, and deterministic quiz helpers.

- [ ] Write failing tests for accents, whitespace, mastery thresholds, demotion, review clearing, empty metrics, and no-duplicate quiz selection.
- [ ] Implement the pure rules and confirm the focused tests pass.
- [ ] Add Flashcards, Listening, Spelling, Quiz, Review Mistakes, keyboard controls, and `hu-HU`-preferred speech with fallback.
- [ ] Run mode and domain tests and commit-ready review.

### Task 3: Persistence, progress, and backups

**Files:** Create `src/domain/storage.ts`, `src/domain/backup.ts`, `src/hooks/useProgress.ts`, Progress UI, and matching tests.

**Interfaces:** Produces `loadProgress`, `saveProgress`, `exportProgress`, and `parseBackup` with preview-before-confirm import.

- [ ] Write failing tests for refresh persistence, schema validation, size limits, unknown IDs, and non-destructive invalid import.
- [ ] Implement versioned persistence and backup validation; confirm focused tests pass.
- [ ] Wire assessed attempts, module completion at 80%, per-mode stats, review queue, import confirmation, export, and reset confirmation.
- [ ] Run persistence/UI tests and commit-ready review.

### Task 4: Documentation and release verification

**Files:** Create `README.md`; update tests and accessible UI where acceptance review finds gaps.

**Interfaces:** Produces developer, content-entry, QA, TTS, backup, and static deployment guidance.

- [ ] Add acceptance-level tests for basic navigation and key user flows.
- [ ] Document local commands, curriculum review workflow, language QA, TTS limitations, backup behavior, and static hosting.
- [ ] Run the full test suite, typecheck/build, and lint; inspect final diff against every spec acceptance item.

