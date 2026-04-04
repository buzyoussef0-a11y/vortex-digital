# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000) — uses Turbopack
npm run build    # Production build
npm run start    # Run production server
npm run lint     # Run ESLint
```

`next.config.ts` intentionally ignores TypeScript and ESLint errors during builds (`ignoreBuildErrors: true`, `ignoreDuringBuilds: true`). Remote images are whitelisted for `images.unsplash.com` and `plus.unsplash.com`.

## Architecture

**Next.js 16 App Router** agency landing page for "Vortex Digital" — an AI automation agency targeting Arabic-speaking markets.

### Page Structure

**`/`** — single-page layout: Navbar → Hero → ProofBar → Services → Portfolio → Process → Testimonials → About → Pricing → Contact → Footer. Global overlays (`CustomCursor`, `WhatsAppButton`) are rendered at the top of `app/page.tsx`.

**`/start-project`** — 3-step wizard (client-side state, `AnimatePresence` slide transitions) that calls a server action on Step 3 submission. Form state lives in `app/start-project/components/types.ts` (`ProjectFormData` + `defaultFormData`). Steps are split across two files: `Steps12.tsx` and `Steps3Success.tsx`.

### Key Architectural Patterns

**Scroll System**: `LenisProvider` (`components/LenisProvider.tsx`) wraps the entire app in the root layout — it uses `useLayoutEffect` + manual `requestAnimationFrame` loop, not Lenis's built-in RAF integration. Hero section is `500vh` tall with a sticky canvas — Framer Motion `useScroll` + `useTransform` drive all parallax effects.

**Animations**: Framer Motion throughout. `useInView` triggers entrance animations (one-shot, `-60px` margin). `useScroll`/`useTransform` drive parallax. `useCountUp` (`hooks/useCountUp.ts`) animates numbers with cubic ease-out on scroll into view.

**Server Actions** (`app/actions/contact.ts`) — three exports, no API routes:
- `submitProjectForm` — used by `/start-project` Step 3
- `sendProjectForm` — used by `ContactSection` embedded form
- `sendContactForm` — legacy, kept for backward compat only

All three **simulate** email sending (setTimeout + console.log). Email integration (Resend/Nodemailer) is a TODO.

**Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`). Design tokens in `styles/vortex.css`:
- Background: `#00050A` (`--vortex-bg`)
- Accent: `#00E5FF` (`--vortex-accent`), muted: `#00606B`
- Utility classes: `.glass` (frosted backdrop), `.neon-border` (cyan glow), `.text-gradient` (white→cyan)
- Lenis scroll classes also defined here

**Fonts**: `Outfit` (primary body, `--font-outfit`) and `Space Grotesk` (`--font-space-grotesk`) — loaded via `next/font/google` in `app/layout.tsx`.

**Path alias**: `@/` maps to project root.

### Component Notes

- `Hero/` — three files: `VortexCanvas.tsx` (WebGL 3D canvas), `ContentOverlays.tsx` (scroll-animated text), `index.tsx` (composes them)
- `Services/TiltCards.tsx` — 3D tilt via mouse tracking + CSS `perspective`/`transform-style: preserve-3d`; videos autoplay on hover
- `Navbar.tsx` — background music player (`/public/back-music/Simulated_Serenity.mp3`) with fade in/out; Intersection Observer for active section highlighting

### Internationalization

Bilingual (Arabic + English). Arabic error messages in server actions. Some components use `dir="rtl"`. Arabic text targets Moroccan dialect (Darija).

---

## UI/UX Design Intelligence

**Apply these rules whenever the user asks to change, improve, or add any visual or interactive element.** This is the design standard for the Vortex Digital project.

### Project Design Identity

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#00050A` | All page backgrounds |
| Accent | `#00E5FF` | CTAs, highlights, borders, active states |
| Accent muted | `#00606B` | Subtle accent elements |
| Secondary | `rgba(123, 97, 255, 0.x)` | Atmospheric orbs only |
| Glass | `rgba(255,255,255,0.03)` + `backdrop-blur-[14px]` | Cards, panels |
| Neon border | `border-[#00E5FF]` + `shadow-[0_0_10px_rgba(0,229,255,0.2)]` | Key interactive elements |
| Text gradient | white → `#00E5FF` via `bg-clip-text` | Hero headings, section titles |
| Font primary | `Outfit` | Body, UI text |
| Font secondary | `Space Grotesk` | Mono labels, tags |
| Style identity | **Dark glassmorphism + cyberpunk neon** | Never mix with flat/light design |

### Design Priority Rules (follow 1→10 order)

| Priority | Category | Key Checks | Anti-Patterns |
|----------|----------|------------|---------------|
| 1 | **Accessibility** | Contrast ≥4.5:1, keyboard nav, aria-labels on icon buttons | Removing focus rings, icon-only buttons without labels |
| 2 | **Touch & Interaction** | Min 44×44px targets, 8px+ spacing, loading feedback on async | Hover-only interactions, 0ms state changes |
| 3 | **Performance** | `transform`/`opacity` only in animations, lazy load below fold, WebP images | Layout thrashing, animating `width`/`height`, no `loading="lazy"` |
| 4 | **Style Consistency** | All components follow dark glassmorphism identity, one icon set (Lucide) | Mixing light/dark styles, emoji as icons, random shadow values |
| 5 | **Layout & Responsive** | Mobile-first, no horizontal scroll, `min-h-dvh` not `100vh` | Fixed px widths, disabling zoom, horizontal overflow |
| 6 | **Typography & Color** | Base 16px body, line-height 1.5–1.75, semantic color tokens only | Text <12px, gray-on-gray, raw hex in component code |
| 7 | **Animation** | 150–300ms micro-interactions, ease-out enter / ease-in exit, `prefers-reduced-motion` | `>500ms` transitions, decorative-only animation, animating layout properties |
| 8 | **Forms & Feedback** | Visible labels, error below field, loading→success/error on submit | Placeholder-only labels, errors only at top, no submit feedback |
| 9 | **Navigation** | Active state highlighted, back behavior predictable, modals have close affordance | Mixed nav patterns at same level, modals for primary navigation |
| 10 | **Data & Charts** | Legend visible, tooltips on hover/tap, accessible color pairs | Color-only meaning, no empty state, cramped axis labels |

### Animation Rules (Framer Motion — this project)

- **Enter**: `opacity: 0 → 1` + `y: 30 → 0`, duration `0.6s`, ease `[0.22, 1, 0.36, 1]` (expo out)
- **Exit**: shorter than enter (~60–70% of enter duration), ease-in
- **Hover**: `scale: 1.02–1.05` on cards, `y: -2` on buttons — never both at once
- **Stagger**: 30–50ms per item for lists/grids
- **Parallax**: `useScroll` + `useTransform` — translate only, never scale on scroll
- **Spring physics**: prefer `type: "spring", stiffness: 300, damping: 30` for interactive elements
- **Always** add `whileInView` with `viewport={{ once: true, margin: "-60px" }}`
- **Always** respect `prefers-reduced-motion` — wrap heavy animations in a `useReducedMotion()` check

### Tailwind v4 Patterns (this project)

```tsx
// Glass card — standard pattern
<div className="bg-white/[0.03] backdrop-blur-[14px] border border-white/5 rounded-2xl p-6">

// Neon CTA button
<button className="border border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF]/10 transition-all duration-300 px-6 py-3 rounded-full font-mono tracking-widest text-sm">

// Section heading pattern
<p className="text-[#00E5FF] font-mono text-xs tracking-[0.3em] uppercase mb-4">[ LABEL ]</p>
<h2 className="text-4xl md:text-6xl font-bold text-white">Heading</h2>

// Gradient text
<span className="bg-gradient-to-r from-white to-[#00E5FF] bg-clip-text text-transparent">

// Atmospheric orb (background atmosphere only, z-index: -1)
<div className="absolute w-[50vw] h-[50vw] rounded-full"
  style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 70%)', filter: 'blur(100px)' }} />
```

### Responsive Breakpoints

Always mobile-first. Breakpoints used in this project:
- `sm` → 640px
- `md` → 768px  
- `lg` → 1024px
- `xl` → 1280px

Section padding standard: `py-20 md:py-32 px-6 md:px-20`

### When to Apply Design Changes

When the user asks for any visual/UI change:

1. **Identify** which section/component is affected
2. **Check** the design identity table — does the change fit dark glassmorphism?
3. **Apply** the priority rules (accessibility first, then style consistency)
4. **Animate** with Framer Motion following the animation rules above
5. **Test** mobile layout — no horizontal scroll, touch targets ≥44px
6. **Preserve** the accent color `#00E5FF` as the single primary action color per screen

### Style Vocabulary

When the user says one of these words, interpret as follows:

| User says | Design meaning in this project |
|-----------|-------------------------------|
| "أكثر احترافية" / "more professional" | Tighten spacing, increase contrast, reduce clutter, sharper typography |
| "أكثر إبداعاً" / "more creative" | Add subtle animation, atmospheric orbs, gradient accents, glassmorphism depth |
| "أبسط" / "simpler" | Remove decorative elements, increase whitespace, flatten hierarchy |
| "أقوى" / "more impactful" | Larger headings, stronger contrast, bold accent usage, scale animation on hover |
| "modern" / "عصري" | Sharper corners, monospace labels, neon micro-details, tech grid patterns |
| "luxury" / "فخم" | More whitespace, refined typography, subtle gradients, fewer but bolder elements |

---

## Framer Motion — Confirmed Bugs & Rules (learned from real mistakes)

These are errors that actually happened in this project. Read before touching any animation.

### ❌ NEVER: `position: sticky` + `h-screen` with Lenis

```tsx
// BROKEN — Lenis controls scroll itself, sticky conflicts with it
<div className="sticky top-0 h-screen overflow-hidden">...</div>
```

Lenis intercepts native scroll events and replays them. This breaks `position: sticky` because the browser's sticky calculation no longer matches actual scroll position. The result: massive empty black spaces, content not visible, sections appearing shrunken.

**✅ Instead:** Use `useScroll({ target: sectionRef, offset: ["start end", "end start"] })` on a normal-flow section with `minHeight`. Lenis works perfectly with this approach.

---

### ❌ NEVER: `whileInView` inside `overflow-hidden`

```tsx
// BROKEN — element is clipped, IntersectionObserver may not detect it
<div className="overflow-hidden">
  <motion.span initial={{ y: "110%" }} whileInView={{ y: "0%" }} viewport={{ margin: "-120px" }}>
    Title
  </motion.span>
</div>
```

`IntersectionObserver` (used by Framer Motion `whileInView`) checks the element's layout bounding box. Inside `overflow-hidden`, elements translated with `y: "110%"` may not register as "in view" — especially with negative `margin`. The animation never fires and the text stays invisible.

**✅ Instead:** Use `useTransform` on the scroll spring directly:
```tsx
const wordY = useTransform(s, [0.05, 0.20], ["110%", "0%"]);
<motion.span style={{ y: wordY }}>Title</motion.span>
```

---

### ❌ NEVER: Call `useTransform` / `useMotionTemplate` inside JSX render

```tsx
// BROKEN — creates a new MotionValue on every render → memory leak + bugs
<motion.div style={{ filter: useMotionTemplate`blur(${blurValue}px)` }} />
```

React hooks must not be called conditionally or inside JSX. `useTransform` and `useMotionTemplate` are hooks.

**✅ Instead:** Create all MotionValues in the component body, then reference them in JSX:
```tsx
// In component body:
const filterStr = useMotionTemplate`blur(${blurValue}px)`;

// In JSX:
<motion.div style={{ filter: filterStr }} />
```

---

### ❌ NEVER: Duplicate `style` prop on `motion.div`

```tsx
// BROKEN — second style silently overrides the first
<motion.div
  style={{ y: scrollY, rotateX: springX }}   // ← ignored
  style={{ transformStyle: "preserve-3d" }}  // ← wins
/>
```

**✅ Instead:** Merge into one object:
```tsx
<motion.div style={{ y: scrollY, rotateX: springX, transformStyle: "preserve-3d" }} />
```

---

### ❌ NEVER: Use `.get()` on a MotionValue inside `animate` prop

```tsx
// BROKEN — .get() reads value once at render time, not reactively
<motion.span animate={headerO.get() > 0 ? { y: "0%" } : {}} />
```

**✅ Instead:** Use `style` with the MotionValue directly, or use a separate state + `useEffect` to subscribe.

---

---

## ✅ Global Animated Background — Proven Pattern (NEBULA NETWORK)

When the user asks for a spectacular animated background, use this architecture:

**Stack:**
- `position: fixed, inset: 0, z-index: 25, mix-blend-mode: screen` on the canvas
- Dark canvas pixels = transparent (clearRect) → sections show through naturally
- White text is NEVER affected by screen blend (screen with white = white)
- Particles glow additively through any section background without modifying text

**Three layers that always look great:**
1. **Aurora blobs** — 5 large elliptical radial gradients (cyan + purple), drifting via sin/cos at 7–10e-5 speed, 3–5% opacity each → `source-over`
2. **Neural network** — 40–50 nodes with velocity bounce, connection lines within 150–160px at 8–10% opacity, data pulses along edges → `lighter` blend
3. **Comets** — 8–12 fast streaks at 36–58° angle, fade-in/out lifecycle, 5% "ultra comet" (longer trail, double bloom glow) → `lighter` blend

**Key canvas settings:**
```tsx
// Aurora: source-over (doesn't over-add)
// Network + comets: lighter (additive glow where particles overlap)
// Element CSS: mix-blend-mode: screen (transparent on dark, glow on dark areas)
ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // always use this for DPR, not ctx.scale
```

**Why mix-blend-mode: screen works:**
- Canvas z-index: 25 sits above sections (z-20)
- Screen formula: `1 - (1-canvas)(1-page)` → dark canvas = transparent, bright = additive glow
- Hero covered by its own `bg-[#00050A]` background naturally — canvas invisible in hero ✓

---

### ✅ Scroll Animation Checklist (before implementing)

Before adding any scroll-driven animation to this project:

1. **No sticky + Lenis** — use `useScroll` on a normal section instead
2. **All `useTransform` calls in component body** — never inside JSX
3. **Title reveals inside `overflow-hidden`** — use scroll spring, not `whileInView`
4. **Calculate content height** before using a fixed-height container — if cards + header > viewport height, the layout will break
5. **Test with `minHeight` sections** — set `minHeight` to give scroll animations enough room (e.g. `160vh` for sequential reveals)
6. **One spring for all** — use a single `useSpring(scrollYProgress, ...)` and derive all transforms from it for consistent feel
