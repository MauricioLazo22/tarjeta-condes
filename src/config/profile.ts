/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║              ARCHIVO DE CONFIGURACIÓN — TARJETA DIGITAL                 ║
 * ║  Único archivo a editar para personalizar la tarjeta.                   ║
 * ║  Campos vacíos ("") ocultan el botón o sección correspondiente.         ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 */

// ── Cuenta bancaria ───────────────────────────────────────────────────────────
export interface BankAccount {
  bank: string;
  type: string;
  number: string;
  cci?: string;
  icon?: string;
  logoSrc?: string;
}

// ── Perfil completo ───────────────────────────────────────────────────────────
export interface Profile {
  name: string;
  position: string;
  company: string;
  description: string;

  phone: string;
  whatsapp: string;
  email: string;
  website: string;

  address?: string;
  mapsUrl?: string;
  mapsEmbed?: string;

  instagram: string;
  facebook: string;
  linkedin: string;
  tiktok: string;
  youtube: string;

  bankAccounts?: BankAccount[];

  seoTitle?: string;
  seoDescription?: string;
  siteUrl?: string;
}

/**
 * ════════════════════════════════════════════════════════════
 *   ✏️  DATOS DEL PERFIL — EDITAR AQUÍ
 * ════════════════════════════════════════════════════════════
 */
export const profile: Profile = {
  name:        "Renato Prado Cardenas",
  position:    "Gerente General",
  company:     "Condes Corporación",
  description: "",

  phone:    "+51 968 798 597",
  whatsapp: "51968798597",
  email:    "condescapital@condescorporacion.com",
  website:  "https://condescorporacion.com",

  address:   "Calle Parque Las Condes 123 - Cercado",
  mapsUrl:   "https://maps.app.goo.gl/QkRGfGkmeSChcfF1A",
  mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d676.5895357332439!2d-71.52799767467505!3d-16.406106433917547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424b005cef0717%3A0x2d2bcf9f2f230f2d!2sCondes%20Corporaci%C3%B3n!5e0!3m2!1ses-419!2spe!4v1781543585586!5m2!1ses-419!2spe",

  instagram: "",
  facebook:  "",
  linkedin:  "",
  tiktok:    "",
  youtube:   "",

  bankAccounts: [
    {
      bank:    "BBVA",
      type:    "Cuenta Soles",
      number:  "0011-0222-0100051920",
      icon:    "B",
      logoSrc: "/bbva.png",
    },
    {
      bank:    "BBVA",
      type:    "Cuenta Dólares",
      number:  "0011-0222-0100051939",
      icon:    "B",
      logoSrc: "/bbva.png",
    },
    {
      bank:    "Yape / Plin",
      type:    "Número de celular",
      number:  "968 798 597",
      icon:    "Y",
      logoSrc: "/yape.png",
    },
  ],

  seoTitle:       "Renato Prado Cardenas — Gerente General | Condes Corporación",
  seoDescription: "Tarjeta digital de Renato Prado Cardenas, Gerente General de Condes Corporación, Arequipa.",
  siteUrl:        "https://condescorporacion.com",
};
