# hugodoria-piloto

Single-page (landing) do piloto **Hugo Netto** — exportado do Figma Make.
Repo: `onmx-tech/hugodoria-piloto`. Apesar do nome do repo, o piloto na tela é **Hugo Netto**.

## Stack
- Vite 6 + React 18 + TypeScript
- Tailwind v4 (`@tailwindcss/vite`)
- GSAP + ScrollTrigger (animações de scroll) e Lenis (smooth scroll)
- `sharp` para o pipeline de imagens

## Comandos
- `npm run dev` — dev server (porta 5173)
- `npm run optimize` — otimiza imagens e regenera o manifest (roda no `prebuild`)
- `npm run build` — `optimize` + `vite build`

## Estrutura
- `src/App.tsx` monta as seções: hero → about → mindset → stats → sponsors → gallery → follow
- Seções em `src/features/<nome>/`; UI compartilhada em `src/components/`

## Pipeline de imagens (IMPORTANTE — pegadinha)
Imagens NÃO são importadas direto. Fluxo:
1. Coloque o arquivo-fonte em `src/assets/` (jpg/png).
2. Rode `npm run optimize` (`scripts/optimize-images.mjs`). Ele:
   - lê tudo em `src/assets/`,
   - mapeia hash→nome via `NAME_MAP` (arquivos legados têm nome de hash); arquivos com nome já descritivo (ex. `photo-*.jpg`) usam o próprio nome de arquivo (sem extensão) como chave,
   - gera responsivos avif/webp/jpg em `public/images/` (breakpoints 480/768/1440/2048),
   - **regenera** `src/generated/image-manifest.ts` (auto-gerado — não editar à mão).
3. No componente use `<OptimizedImage name="..." alt="..." sizes="..." />`, onde `name` é a chave do manifest. Se o name não existir no manifest, o componente loga warning e renderiza nada.
- Cada entry do manifest tem `width`/`height` — use para derivar aspect-ratio (a galeria faz isso para acomodar retrato + paisagem sem corte).

## Galeria (`src/features/gallery/GallerySection.tsx`)
- Dois tickers em marquee (CSS keyframes `galleryRight`/`galleryLeft`, `translateX(-50%)` → o array é duplicado `[...row, ...row]`).
- Cards têm **altura fixa** e **largura por aspect-ratio real** (`aspectRatio: width/height` do manifest), por isso fotos retrato e paisagem ficam lado a lado sem cropar.
- Não remova as classes `gallery_row-top` / `gallery_row-bottom`: o GSAP faz parallax nelas.

## Dados de conteúdo (`src/data/`)
Fonte única — mexa aqui, não no JSX:
- `contact.ts` — WhatsApp e e-mail. **Todo CTA de contato/parceria cai no WhatsApp** (é o `href` default do `CTAButton`); `CTAButton`/`CharHoverLink` põem `target="_blank"` sozinhos quando o href é `http(s)`.
- `career.ts` — palmarés e pódios reais (nada de número redondo inventado).
- `sponsors.ts` — logos da fita. `h` é **altura de tinta** em px: cada SVG foi recortado na bbox real, então altura declarada = altura desenhada. Calibrado por tipologia (brasão/empilhado pedem mais altura que wordmark horizontal) para o conjunto ter o mesmo peso.

## Logos de patrocinador (`public/logos/`)
Os originais do cliente vêm em PDF/EPS/CDR/PNG e em cores incompatíveis entre si (um só existe em branco, outro é brasão colorido). Pipeline usado: rasterizar em alta → canal de tinta (`alpha × luminância`, invertendo nos logos claros) → `potrace -s` → SVG mono de 1 cor. Exceção: **AMG Cup** ficou em PNG — a estrela cromada da Mercedes é arte oficial e não se altera; só o lettering foi para o azul da paleta.

## Convenções
- Fotos do piloto vão para a galeria com nomes `photo-<descrição>` em `src/assets/`. Sempre rode `npm run optimize` depois de adicionar/remover.
- Antes de commit/push, confirmar identidade git (máquina tem 2 contas gh: `onmx-tech` e `thalysonblack`).
