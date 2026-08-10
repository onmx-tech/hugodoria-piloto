/**
 * Fonte única dos parceiros. `h` é a ALTURA DE TINTA em px (desktop) — não a altura
 * da caixa: cada logo foi recortado na bbox real, então altura declarada = altura
 * desenhada. Calibrado por tipologia (brasão/empilhado pedem mais altura que
 * wordmark horizontal) para o conjunto ler com o mesmo peso.
 */
export type Sponsor = { name: string; file: string; h: number };

export const SPONSORS: Sponsor[] = [
  { name: "NeuroVasC", file: "/logos/neurovasc.svg", h: 54 },
  { name: "EDGE", file: "/logos/edge.svg", h: 66 },
  // Categoria que ele disputa. A estrela cromada é a arte oficial da Mercedes — não se
  // altera; só o lettering foi levado para o azul da paleta para ler sobre o creme.
  { name: "Mercedes-AMG Cup Brasil", file: "/logos/amg-cup.png", h: 82 },
  { name: "Life Clean Lavanderia Técnica", file: "/logos/life-clean.svg", h: 64 },
  { name: "Fattore Contábil", file: "/logos/fattore.svg", h: 72 },
  { name: "Hípica Haras Funchal", file: "/logos/hipica.svg", h: 74 },
  { name: "R.O.M. Concept", file: "/logos/rom.svg", h: 78 },
];
