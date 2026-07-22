# Birthday Website Guide: React + Anime.js + Rive + Magic UI + Motion.dev

## 1. Project Setup

```bash
npm create vite@latest birthday-site -- --template react-ts
cd birthday-site
npm install motion @rive-app/react-canvas animejs
# Magic UI: copy components from magicui.design (no npm package — copy source)
```

**Structure:**
```
src/
  components/
    Hero/
    Gallery/
    Timeline/
    Message/
  animations/      # reusable anime.js timelines
  rive/            # .riv asset files
  hooks/           # useReducedMotion, useInView
  App.tsx
```

---

## 2. Tool Integration Strategy

| Tool | Role | When to Use |
|------|------|-------------|
| **Motion.dev** | Layout animations, page transitions, scroll-linked effects | Primary animation layer — use for most UI motion |
| **Anime.js** | Complex sequenced timelines, SVG path drawing, staggered text | When Motion.dev's API is insufficient for a sequence |
| **Rive** | Interactive state-machine animations (.riv files) | Looping illustrations, interactive characters |
| **Magic UI** | Pre-built animated components (shimmer, sparkles, meteors) | Decorative accents, backgrounds |

**Key rule:** Don't double-animate the same element. Assign ownership per element.

### Motion.dev (primary)
```tsx
import { motion, useScroll, useTransform } from "motion/react";

// Scroll-linked parallax
const { scrollYProgress } = useScroll();
const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
<motion.div style={{ y }} />
```

### Anime.js (sequenced timelines)
```tsx
import anime from "animejs";
useEffect(() => {
  anime.timeline({ easing: "easeOutExpo" })
    .add({ targets: ".title", opacity: [0, 1], translateY: [40, 0], duration: 800 })
    .add({ targets: ".subtitle", opacity: [0, 1], duration: 600 }, "-=400");
}, []);
```

### Rive (interactive illustrations)
```tsx
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
const { RiveComponent, rive } = useRive({ src: "/heart.riv", stateMachines: "HeartSM", autoplay: true });
const hoverInput = useStateMachineInput(rive, "HeartSM", "isHovered");
<RiveComponent onMouseEnter={() => hoverInput && (hoverInput.value = true)} />
```

---

## 3. Mobile Optimization

### Performance
- `will-change: transform` only on actively animating elements; remove after animation
- `prefers-reduced-motion`: wrap all animations
```tsx
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
```
- Lazy-load Rive canvases with `IntersectionObserver`
- Use `transform`/`opacity` only — never animate `width`, `height`, `top`, `left`
- Target 60fps: keep JS animation work < 8ms/frame

### Responsive
- Base font: `clamp(1rem, 4vw, 1.5rem)`
- Touch targets: minimum 44×44px
- Swipe gestures via Motion.dev's `drag` prop:
```tsx
<motion.div drag="x" dragConstraints={{ left: -300, right: 0 }} />
```
- Test on real devices (iOS Safari has animation quirks with `position: fixed`)

### Images
```html
<img srcset="photo-400.webp 400w, photo-800.webp 800w" sizes="(max-width: 600px) 100vw, 50vw" loading="lazy" />
```

---

## 4. Creative Sections & Animation Ideas

### A. Hero — Floating Name Reveal
- Anime.js letter-by-letter stagger on her name
- Rive: looping floating balloon or sparkle illustration behind text
- Motion.dev: subtle `y` parallax on scroll

```tsx
// Letter stagger
anime({ targets: ".hero-letter", opacity: [0,1], translateY: [20,0],
  delay: anime.stagger(80), easing: "easeOutBack" });
```

### B. Photo Gallery — Memory Unwrap
- Motion.dev `AnimatePresence` + staggered `scale`/`opacity` entrance
- Swipe navigation with `drag="x"`
- Rive heart pulses on photo hover/tap
- Lazy load with blur-up placeholder

### C. Relationship Timeline — Scroll Narrative
- Magic UI `ScrollReveal` (or Motion.dev `whileInView`) per milestone
- Anime.js SVG path draw for connecting line between milestones
- Rive mini-illustrations per milestone (coffee cup, movie ticket, etc.)
- Single-column on mobile, tap to expand details

```tsx
// SVG path draw
anime({ targets: ".timeline-path", strokeDashoffset: [anime.setDashoffset, 0],
  duration: 2000, easing: "easeInOutSine", autoplay: false });
// Trigger on IntersectionObserver
```

### D. Love Letter Section — Typewriter
- Anime.js character-by-character reveal on scroll trigger
- Magic UI `Shimmer` background
- Motion.dev `layoutId` for smooth expand/collapse

### E. Closing — Confetti + Wish
- Anime.js particle burst (CSS divs, no canvas needed for simple confetti)
- Motion.dev `AnimatePresence` exit animation
- Rive: looping cake with candles

---

## 5. Best Practices

**Emotional pacing:** Slow entrances (600–900ms) feel tender; fast exits (200ms) feel snappy. Don't rush the reveal.

**Color:** Warm palette (rose, peach, gold). Use CSS custom properties so Magic UI components inherit theme.

**Typography:** One display font (e.g. Playfair Display) + one body font. Load via `font-display: swap`.

**Accessibility:**
- `aria-label` on Rive canvases: `<RiveComponent aria-label="Animated heart" />`
- Ensure text contrast ≥ 4.5:1 over animated backgrounds
- All interactive elements keyboard-focusable

**Bundle size:**
- Anime.js: ~17KB gzip ✓
- Motion.dev: ~34KB gzip ✓  
- Rive runtime: ~40KB gzip — lazy import it
- Magic UI: zero bundle cost (you copy only what you use)

**Testing checklist:**
- [ ] iPhone Safari (check `backdrop-filter`, scroll behavior)
- [ ] Android Chrome
- [ ] `prefers-reduced-motion` enabled
- [ ] Slow 3G throttle in DevTools
- [ ] Lighthouse mobile score ≥ 90
