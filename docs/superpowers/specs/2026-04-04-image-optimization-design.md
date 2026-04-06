# Image Optimization System — Design Spec

## Problem

The site ships ~64MB of unoptimized images (11 PNGs, many at 4096px) for a 1440px-wide single page. Three files are JPEGs disguised as `.png`. Users on mobile or slow connections will wait 10-30s for the page to become usable.

## Goal

Reduce served image payload to ~3-5MB via build-time optimization with automatic format conversion, responsive sizing, and blur placeholders.

## Architecture

### 1. Build-Time Script (`scripts/optimize-images.mjs`)

Reads all images from `src/assets/`, outputs optimized versions to `public/images/`.

**Input:** `src/assets/*.png` (original Figma exports, kept as source of truth)

**Output per image:**
- AVIF at 4 breakpoints: 2048px, 1440px, 768px, 480px (quality 65)
- WebP at 4 breakpoints: 2048px, 1440px, 768px, 480px (quality 75)
- JPEG at 1440px (fallback, quality 80)
- LQIP placeholder: 32px wide WebP, converted to base64

**Naming convention:**
```
public/images/{descriptive-name}-{width}.{avif|webp|jpg}
```

**Name mapping** (hash → descriptive name):
| Hash | Name | Used In |
|------|------|---------|
| 53e4c0... | creation-car-front | Gallery |
| fa2ef2... | creation-aerial | Gallery |
| 0c9f99... | creation-interior | Gallery |
| fb6588... | creation-engine | Gallery |
| 77e513... | driver-calm-race | Hero area |
| 42878b... | helmet-closeup | Gallery |
| 3f72ae... | driver-calm-standing | Hero BG |
| 267e44... | portrait-cinematic | Follow section |
| 4251cb... | helmet-dramatic | Oval image |
| 7dd01b... | driver-fullbody | Mindset BG |
| d79f81... | car-360-view | Car overlay |

**Manifest output:** `src/generated/image-manifest.ts`
```ts
export interface ImageEntry {
  avif: Record<number, string>;  // { 480: "/images/name-480.avif", ... }
  webp: Record<number, string>;
  jpg: string;                    // fallback
  placeholder: string;            // data:image/webp;base64,...
  width: number;                  // original width
  height: number;                 // original height
}
export const images: Record<string, ImageEntry>;
```

### 2. `<OptimizedImage />` Component

Location: `src/app/components/OptimizedImage.tsx`

**Props:**
```ts
interface OptimizedImageProps {
  name: string;              // key in manifest (e.g. "hero-bg")
  alt: string;
  sizes: string;             // responsive sizes attribute
  className?: string;
  priority?: boolean;        // true = eager load, no lazy (for hero)
  onLoad?: () => void;       // callback for GSAP integration
}
```

**Behavior:**
- Renders `<picture>` with AVIF → WebP → JPEG sources and `srcset` with all breakpoints
- `priority={false}` (default): `loading="lazy"` + `decoding="async"` + blur placeholder as inline background
- `priority={true}`: `loading="eager"` + `fetchpriority="high"`, no blur (hero images)
- On image load: removes blur placeholder with CSS transition (0.4s ease-out), adds `.is-loaded` class
- `.is-loaded` class enables future GSAP ScrollTrigger integration

**Rendered HTML (lazy):**
```html
<picture class="optimized-image">
  <source type="image/avif" srcset="...-480.avif 480w, ...-768.avif 768w, ...-1440.avif 1440w, ...-2048.avif 2048w" sizes="..." />
  <source type="image/webp" srcset="...-480.webp 480w, ...-768.webp 768w, ...-1440.webp 1440w, ...-2048.webp 2048w" sizes="..." />
  <img src="...-1440.jpg" alt="..." loading="lazy" decoding="async"
       style="background: url(data:image/webp;base64,...) center/cover no-repeat" />
</picture>
```

### 3. Integration in package.json

```json
{
  "scripts": {
    "optimize": "node scripts/optimize-images.mjs",
    "prebuild": "node scripts/optimize-images.mjs",
    "dev": "vite",
    "build": "vite build"
  }
}
```

`prebuild` runs automatically before `vite build`. During development, run `npm run optimize` manually after adding new images.

### 4. Dependencies

- `sharp` (devDependency) — image processing

### 5. Migration in App.tsx

Replace all direct image imports:
```tsx
// Before
import imgHero from "../assets/3f72ae...png";
<img src={imgHero} />

// After
import { OptimizedImage } from "./components/OptimizedImage";
<OptimizedImage name="driver-calm-standing" alt="Hugo Netto" sizes="100vw" priority />
```

## Breakpoint Strategy

| Breakpoint | Target | Reasoning |
|------------|--------|-----------|
| 480px | Mobile | Max content width on phone |
| 768px | Tablet | iPad portrait |
| 1440px | Desktop 1x | Site design width |
| 2048px | Desktop retina | 2x for common displays |

## Performance Targets

- Hero image (priority): < 200KB on desktop, < 80KB on mobile
- Gallery images (lazy): < 150KB each on desktop
- Total first-load payload: < 1MB of images (hero + above-fold)
- Blur placeholders: < 500 bytes each, inline in HTML

## Files Created/Modified

**New files:**
- `scripts/optimize-images.mjs` — build script
- `src/app/components/OptimizedImage.tsx` — image component
- `src/generated/image-manifest.ts` — auto-generated manifest

**Modified files:**
- `package.json` — add sharp dep + scripts
- `src/app/App.tsx` — replace img imports with OptimizedImage

**Generated at build:**
- `public/images/` — all optimized image variants
