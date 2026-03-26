# Kanini POC Hub — Frontend Reference

## Tech Stack
- **React 19** + **TypeScript 5.9** (strict mode, no emit)
- **Vite 8** with `@vitejs/plugin-react` + `@tailwindcss/vite`
- **Tailwind CSS 4** (utility-first, custom theme via CSS custom properties in `index.css`)
- **React Router DOM 7** (BrowserRouter)
- **@lottiefiles/dotlottie-react** for Lottie animations
- **Deployed on Vercel** (SPA rewrite in `vercel.json`)

## Project Structure
```
poc-hub/
├── src/
│   ├── App.tsx              # BrowserRouter: /login → LoginPage, /portal → PortalPage, /* → /login
│   ├── main.tsx             # Entry, mounts to #app
│   ├── index.css            # Tailwind + custom properties + keyframe animations
│   ├── style.css            # Supplementary styles
│   ├── components/
│   │   ├── Navbar.tsx       # Fixed header, hides on scroll-down (useHideyNavbar), condenses on mobile
│   │   ├── HeroSection.tsx  # Typing headline ("Explored. Proven. Launched.") + ParticleBurst canvas + stats
│   │   ├── ParticleBurst.tsx# 1050-particle canvas w/ Perlin noise + cursor repulsion
│   │   ├── SearchFilterBar.tsx # Search input + category filter pills (overlays hero -mt-7 z-20)
│   │   ├── PocCard.tsx      # POC card with status badge, domain tags, staggered scroll animation
│   │   ├── FeaturedPoc.tsx  # Featured POC spotlight (slide-from-left/right animations)
│   │   ├── PropelIQIntro.tsx# "Introducing Propel" + scroll-triggered typewriter text, left-aligned
│   │   ├── AiIdeSection.tsx # AI IDE showcase with cycling typewriter sentences + video/placeholder
│   │   ├── StatsStrip.tsx   # Global stats with count-up animation (4 stats in grid)
│   │   ├── LogoMarquee.tsx  # Infinite scrolling partner logos (10 partners, CSS marquee 30s)
│   │   ├── KaniniLogo.tsx   # SVG logo component (currentColor fill)
│   │   └── Footer.tsx       # Page footer
│   ├── data/
│   │   └── pocData.ts       # All app data: pocData[], categories[], heroStats[], globalStats[], featuredPoc, partnerLogos[]
│   ├── hooks/
│   │   ├── useCountUp.ts    # Animate 0→N on visibility (IntersectionObserver, rAF, cubic ease-out, 1500ms)
│   │   ├── useHideyNavbar.ts# Returns { hidden, scrolled } based on scroll direction/position
│   │   └── useScrollAnimation.ts # Observes .animate-on-scroll/.slide-from-left/.slide-from-right, adds .is-visible
│   └── pages/
│       ├── LoginPage.tsx    # 2-col login: left brand panel + right form → navigates to /portal
│       └── PortalPage.tsx   # Main dashboard: Navbar → Hero → Search → POC Grid → Featured → PropelIQ → AiIde → Stats → Logos → Footer
```

## Routing
| Route | Page | Notes |
|-------|------|-------|
| `/login` | LoginPage | Default redirect target |
| `/portal` | PortalPage | Main dashboard, all sections |
| `/*` | Redirect → `/login` | Catch-all |

## Styling Approach
- **Tailwind CSS** for layout and utilities; responsive breakpoints: `md` (768), `lg` (1024)
- **CSS custom properties** in `index.css` for theme colors, durations, easings
- **Inline styles** used in some components for dynamic values (font sizing with `clamp()`)
- **Scroll animations**: `.animate-on-scroll`, `.slide-from-left`, `.slide-from-right` toggled by `useScrollAnimation` hook adding `.is-visible`
- Common section padding: `px-6 lg:px-20 py-16`

### Key CSS Variables
```
--color-navy: #1A1A2E    --color-red: #E8303A
--color-teal: #00B5AD    --color-secondary: var(--color-teal)
--duration-fast: 150ms   --duration-normal: 300ms   --duration-slow: 600ms
--ease-spring: cubic-bezier(0.16, 1, 0.3, 1)
```

### Key Keyframe Animations
- `marquee` (30s logo scroll), `formEntry` (login form scale-in), `pillPop` (stat pills stagger)
- `ai-ide-blink`, `ai-ide-rotate-glow`, `ai-ide-float` (AI IDE section)
- `fadeIn`, `slideUp`, `fadeUpWord`, `pulseGlow`, `gradientShift`

## Data Model (pocData.ts)
```ts
type PocStatus = 'In Production' | 'Testing Phase' | 'Ideation' | 'Pilot'
interface PocItem { id, title, description, icon (Material Symbol), status, domain, tags[], team }
```
- **9 POC items** across domains: AI/ML, Cloud, Blockchain, IoT, Data Science
- **categories**: ['All POCs', 'AI/ML', 'Cloud', 'Blockchain', 'IoT', 'Data Science']
- **heroStats**: 42 Active POCs, 12 Tech Domains, 8 Active Teams
- **globalStats**: 128 Contributors, $2.4M Savings, 15 Patents, 92% Success Rate
- **partnerLogos**: Microsoft, AWS, Google Cloud, Snowflake, Databricks, Confluent, MongoDB, Docker, Kubernetes, Terraform

## Animation Patterns
- **Typewriter effects** (HeroSection, PropelIQIntro, AiIdeSection): `requestAnimationFrame` loops with character delay, ref-based state to avoid React re-render issues, blinking cursor that disappears on completion
- **Count-up numbers** (useCountUp): IntersectionObserver triggers once, rAF with cubic ease-out over 1500ms
- **Scroll-triggered visibility**: `useScrollAnimation` hook observes elements with specific classes, adds `.is-visible` once (one-shot)
- **ParticleBurst**: Canvas-based, Perlin noise + spring physics + cursor repulsion, teal/green palette

## PortalPage Section Order
1. Navbar (fixed)
2. HeroSection (typing + particles + stats)
3. SearchFilterBar (overlaid on hero bottom)
4. POC Grid — "Latest Pilots" (filtered by domain + search, 3-col grid)
5. FeaturedPoc spotlight
6. PropelIQIntro (scroll-triggered typewriter)
7. AiIdeSection (cycling sentences + video)
8. StatsStrip (global stats)
9. LogoMarquee (partner logos)
10. Footer

## Build & Dev
```bash
npm run dev      # Vite dev server
npm run build    # tsc + vite build
npm run preview  # Preview production build
```

## Conventions
- Fonts loaded via Google Fonts in index.html: Poppins, Public Sans, Syne, DM Sans
- Icons: Material Symbols Outlined (loaded via Google Fonts CDN)
- Root element: `<div id="app">`
- All animation hooks use IntersectionObserver with one-shot pattern (observe → trigger → unobserve)
- Typewriter components use `useRef` for mutable state to avoid stale closures in rAF loops
