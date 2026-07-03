# v2 — Landing Hugo Netto com fotos reais

**Data:** 2026-07-02
**Branch:** `v2-fotos-reais`

## Objetivo

Refazer a landing usando **apenas as 18 fotos reais** de corrida do Hugo Netto (AMG Cup Brasil), removendo todas as imagens geradas por IA (`portrait-cinematic`, `driver-calm-standing`, `car-360-view`, `helmet-dramatic`, `driver-fullbody`, `creation-interior`). O resultado deve parecer autêntico — material real de pista, pódio e o retrato "executivo↔piloto".

## Direção

O ativo narrativo mais forte das fotos é a **dualidade**: Hugo é executivo de terno **e** piloto de competição. A v2 mantém a estrutura de seções da v1 (hero → sobre → mentalidade → carreira → galeria → patrocínio → contato) e troca cada imagem de IA pela foto real que melhor serve a função, ajustando enquadramento (object-position/scale) onde a composição exigir.

## Mapa de substituição

| Seção | Nome atual (IA) | → Foto real | Papel |
|---|---|---|---|
| Hero | `driver-calm-standing` | `photo-driver-orange-car-standing` | figura triunfante em pé no carro, nome sobreposto |
| Sobre | `helmet-dramatic` (círculo) | `photo-helmet-mercedes-closeup` | capacete real "HUGO NETTO" no recorte circular |
| Mentalidade | `driver-fullbody` ×2 | `photo-driver-crouch-car` | fundo de grit/foco |
| Carreira | `car-360-view` | `photo-car-track-front` | showcase do carro (ajustar object-fit p/ cover) |
| Contato | `portrait-cinematic` ×2 | `photo-portrait-suit-seated` | o lado executivo, retrato real |
| Galeria | (já reais) | — | marquee das 18 fotos, sem mudança |

## Restrições

- Pipeline de imagens: as fotos reais já estão no manifest (a galeria usa `photo-*`). Não precisa rodar `optimize` a menos que se adicione arquivo novo.
- Nenhuma imagem de IA pode permanecer referenciada. Validar por grep após as trocas.
- Enquadramentos sensíveis (hero mobile usa `w-[340%]` bottom-anchored) precisam de ajuste fino e validação por screenshot.

## Critério de sucesso

1. `grep` por `driver-calm-standing|car-360-view|helmet-dramatic|driver-fullbody|portrait-cinematic|creation-interior` em `src/` retorna zero.
2. Todas as seções renderizam com foto real bem enquadrada em desktop e mobile.
3. v1 permanece intacta na `main`.
