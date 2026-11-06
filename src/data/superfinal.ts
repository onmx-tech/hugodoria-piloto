/**
 * Super Final 2026. Texto, valores e entregáveis vêm da proposta comercial de
 * Flavia Aiala (Hugo_Netto_91_Super_Final_Proposta.pdf, 03/11/2026). Não editar sem ela.
 */
export const EVENT_FACTS = [
  { k: "Evento", v: "Super Final" },
  { k: "Data", v: "20 de dezembro" },
  { k: "Local", v: "Autódromo de Interlagos" },
  { k: "Atração musical", v: "César Menotti & Fabiano" },
];

export type Cota = { name: string; price: string; items: string[]; featured?: boolean };

export const COTAS: Cota[] = [
  {
    name: "Silver",
    price: "R$ 25 mil",
    items: [
      "5 convites VIP",
      "Marca no carro e uniforme",
      "1 post + story no Instagram",
      "Experiência Paddock + Box",
      "1 vídeo exclusivo + fotos",
      "Relatório de resultados",
    ],
  },
  {
    name: "Gold",
    price: "R$ 50 mil",
    items: [
      "8 convites VIP",
      "Destaque no carro e uniforme",
      "4 posts no Instagram",
      "2 meses no site do piloto",
      "Experiência Paddock + Box",
      "2 vídeos exclusivos + fotos",
      "Ativação e vídeo no camarote",
      "Relatório e reunião de resultados",
      "Prioridade de renovação 2027",
    ],
  },
  {
    name: "Signature",
    price: "R$ 100 mil",
    featured: true,
    items: [
      "16 convites VIP",
      "Máximo destaque no carro",
      "12 posts no Instagram (3 meses)",
      "Site do piloto durante 2027",
      "Jantar exclusivo com o Dr. Hugo",
      "Diagnóstico de PR (Flavia Aiala)",
      "Experiência Paddock + Box",
      "4 vídeos exclusivos + fotos",
      "Ativação no camarote em destaque",
      "Brindes personalizados",
      "Conexões estratégicas no camarote",
      "Relatório e reunião de resultados",
      "Prioridade de renovação 2027",
    ],
  },
];

export const RENEWAL = "Quem renovar para 2027 mantém os valores de 2026.";

export const LEGAL =
  "Entregáveis sujeitos à aprovação, às regras da competição e à disponibilidade operacional. Etapas de 2027, acessos e ativações serão detalhados em contrato. Esta é uma parceria com o piloto e não implica patrocínio ou endosso oficial da Mercedes-Benz.";
