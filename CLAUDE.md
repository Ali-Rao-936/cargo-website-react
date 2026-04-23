# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # install dependencies (required before first run)
npm run dev        # dev server at http://localhost:3000
npm run build      # production build to dist/
npm run preview    # preview production build locally
npm run lint       # TypeScript type-check (tsc --noEmit) — no ESLint configured
npm run clean      # delete dist/
```

There is no test suite.

## Environment

Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY` with a valid Gemini API key. Vite injects it at build time as `process.env.GEMINI_API_KEY`. The `APP_URL` variable is used for self-referential links.

## Architecture

**Stack**: React 19 + TypeScript + Vite 6 + Tailwind CSS v4 + React Router v7 + `@google/genai` (Gemini).

**Routing** (`src/App.tsx`): Five routes — `/`, `/services`, `/quote`, `/tracking`, `/contact` — wrapped in a persistent layout: sticky `<Navbar>`, `<Footer>`, and a fixed floating `<WhatsAppLink>` button. The root `<div>` has `pt-20` to clear the sticky navbar.

**Pages** (`src/pages/`): Self-contained page components. The Quote form is frontend-only (no submission backend). The Tracking page returns mock data from a hardcoded constant — there is no real tracking API wired up yet.

**UI primitives** (`src/components/ui/`): `Button` accepts `variant` (`primary` | `secondary` | `outline` | `ghost`) and `size` (`sm` | `md` | `lg`) props. `Input` and `Textarea` are thin wrappers with consistent ring/border styling.

**Styling**: Tailwind CSS v4 with custom brand tokens defined in `src/index.css` via `@theme`:
- `brand-blue` → `#1e3a8a`
- `brand-orange` → `#f97316`
- `brand-light` → `#f8fafc`

Use `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge) for conditional class composition.

**Path alias**: `@` resolves to the project root (not `src/`). Current source files use relative imports; prefer relative imports to stay consistent.

**WhatsApp number** in `src/components/layout/WhatsAppLink.tsx` is a placeholder (`971501234567`) and should be replaced with the real business number before going live.
