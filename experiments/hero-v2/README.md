# Hero — Opção v2 (refinamentos)

Branch experimental a partir do commit que entregou a **hero v1** (`712469db`):
piloto coloca o capacete numa sequência de frames com a hero pinada no scroll.

Aqui ficam guardados os 3 ajustes pedidos para evoluir o efeito. **Ainda não aplicados** —
desenvolver nesta branch e só então mesclar na `main`.

## Ajustes pendentes

1. **Manter o fundo da hero (gradiente azul), não o preto chapado do vídeo.**
   A foto/vídeo tem fundo preto de estúdio. Recortar o piloto e pôr o gradiente
   azul da marca (`linear-gradient(180deg,#030B14,#083362,#041221)`) atrás.
   - Caminho recomendado: `remove_background` do Higgsfield em **vídeo**
     (`media_type: video`) → vídeo com alpha → extrair frames webp com canal alpha
     → desenhar no canvas sobre o gradiente (igual ao `mix-blend` mas sem clarear).
   - Alternativa barata (pior): `ffmpeg lumakey`/`colorkey` — arrisca comer o
     macacão azul-escuro e deixar halo.

2. **Fechar a viseira do capacete no final (parte de baixo do scroll).**
   Já gerado: **`helmet-visor-close.mp4`** (neste diretório).
   - Higgsfield job: `cd101c6f-c868-4f72-8655-e562009b2fcb` (Kling 3.0 Turbo, 5s, 16:9)
   - start_image media_id: `f25d8563-ee56-452f-92e4-4fd58f5c773a` (driver-calm-standing)
   - Substituir os frames de `public/hero-helmet/` pelos extraídos deste vídeo:
     `ffmpeg -i helmet-visor-close.mp4 -vf scale=1280:-1 -c:v libwebp -qscale 72 hXXX.webp`

3. **Seção de baixo (About) subindo sobre a hero como "card" no final.**
   Efeito cortina: ao terminar a sequência, a próxima seção desliza para cima
   cobrindo a hero, com cantos arredondados (card). A hero v1 trocou o `sticky`
   original por `pin` — para o card, coordenar o fim do pin com um translateY/
   border-radius da About (ScrollTrigger), ou voltar ao padrão sticky+overlay.

## Notas técnicas (v1 já no main)
- `src/features/hero/HeroSection.tsx`: canvas + 121 frames + ScrollTrigger pin.
- Frames v1: `public/hero-helmet/h001..h121.webp` (do job `119b5ea8`, sem viseira).
