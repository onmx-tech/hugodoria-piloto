/** Fonte única dos canais de contato. Todo CTA de contato/parceria cai no WhatsApp. */
// ⚠️ A caixa ainda precisa ser criada no painel da HostGator (o domínio não tem
// MX publicado). Até lá, o WhatsApp é o canal que funciona de fato.
export const EMAIL = "contato@pilotohugonetto.com.br";

export const WHATSAPP_NUMBER = "5511992157407";

export const WHATSAPP =
  `https://wa.me/${WHATSAPP_NUMBER}?text=` +
  encodeURIComponent("Olá! Vim pelo site do Hugo Netto e gostaria de falar sobre uma parceria.");
