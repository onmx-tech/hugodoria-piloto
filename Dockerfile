# Build + serve da landing do Hugo Netto na VPS do cliente (Easypanel/Traefik).
#
# Diferente do site do Dr. Hugo Doria, aqui NÃO há prerender: é uma landing de
# página única, o HTML final já é o index.html do Vite. O que a imagem precisa
# garantir é o `npm run prebuild` (scripts/optimize-images.mjs, sharp) rodar —
# é ele que gera public/images/ e o manifest que os componentes leem.

# ─────────────────────────────── build ───────────────────────────────
FROM node:22-bookworm-slim AS build

WORKDIR /app

# camada de dependências separada: só reinstala quando o lock muda
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# prebuild (otimização de imagens + manifest) + vite build
RUN npm run build

# ─────────────────────────────── serve ───────────────────────────────
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Prova de vida do que importa: o bundle da aplicação está referenciado no HTML.
# Um nginx que responde 200 servindo diretório vazio continuaria "saudável".
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ | grep -q '/assets/index-' || exit 1
