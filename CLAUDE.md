# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Run production server
npm run lint     # Run ESLint
```

Note: `next.config.ts` intentionally ignores TypeScript and ESLint errors during builds (`ignoreBuildErrors: true`, `ignoreDuringBuilds: true`).

## Architecture

This is a **Next.js App Router** portfolio/agency landing page for "Vortex Digital" — an AI automation agency targeting Arabic-speaking markets.

### Page Structure

**`/`** (homepage) — single-page layout: Navbar → Hero → ProofBar → Services → Portfolio → Process → Testimonials → About → Pricing → Contact → Footer

**`/start-project`** — multi-step project intake form (3 steps + success screen), built with server actions and Zod validation.

### Key Architectural Patterns

**Scroll System**: Lenis (physics-based smooth scroll) wraps the entire app via `LenisProvider` in the root layout. Hero section is `500vh` tall with a sticky canvas — Framer Motion `useScroll` + `useTransform` drive all parallax effects.

**Animations**: Framer Motion throughout. `useInView` triggers entrance animations. `useScroll`/`useTransform` drive parallax. `useCountUp` (custom hook in `/hooks/`) animates numbers on scroll into view.

**Server Actions**: Form submissions in `/app/actions/contact.ts` — no API routes. Actions currently simulate delays and log to console; email integration (Resend/Nodemailer) is a TODO.

**Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`). Design tokens in `styles/vortex.css` — background `#00050A`, accent `#00E5FF`. `.glass`, `.neon-border`, `.text-gradient` utility classes defined there.

**Path alias**: `@/` maps to project root (e.g., `@/components/Navbar`).

### Component Notes

- `Hero/` — three files: `VortexCanvas.tsx` (WebGL 3D canvas), `ContentOverlays.tsx` (scroll-animated text), `index.tsx` (composes them)
- `Services/TiltCards.tsx` — 3D tilt effect via mouse tracking + CSS `perspective`/`transform-style: preserve-3d`; service videos autoplay on hover
- `Navbar.tsx` — includes background music player (`/public/back-music/Simulated_Serenity.mp3`) with fade in/out, and Intersection Observer for active section highlighting
- `CustomCursor.tsx` and `WhatsAppButton.tsx` — global overlays rendered at the top of `app/page.tsx`

### Internationalization

UI contains bilingual content (Arabic + English). Arabic error messages in server actions. Some components use `dir="rtl"`.
