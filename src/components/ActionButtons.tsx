/**
 * ActionButtons — Botones de acción principal de la tarjeta.
 *
 * Orden:
 *   1. WhatsApp (verde)
 *   2. Llamar
 *   3. Correo
 *   4. Sitio web
 *   5. Guardar contacto → /api/contact (vCard con headers HTTP correctos)
 */

import { Phone, Mail, Globe, UserPlus } from "lucide-react";
import { Profile } from "@/config/profile";

// ── Ícono WhatsApp inline (no está en lucide-react) ──────────────────────────
const IconWhatsApp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.853L.054 23.25a.75.75 0 0 0 .92.92l5.44-1.476A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0Zm0 22.5c-1.98 0-3.825-.537-5.41-1.47l-.387-.23-4.01 1.087 1.09-3.981-.24-.396A10.45 10.45 0 0 1 1.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12 17.799 22.5 12 22.5Z" />
  </svg>
);

// ── Estilos ───────────────────────────────────────────────────────────────────
const btnWhite =
  "tap-highlight-none flex items-center gap-3 w-full rounded-2xl px-4 py-3.5 " +
  "bg-white text-slate-800 font-semibold text-xs " +
  "transition-all duration-150 active:scale-[0.97] hover:bg-slate-50 shadow-sm";

const btnWA =
  "tap-highlight-none flex items-center gap-3 w-full rounded-2xl px-4 py-3.5 " +
  "bg-[#25D366] text-white font-semibold text-xs " +
  "transition-all duration-150 active:scale-[0.97] hover:bg-[#1ebe5d] shadow-sm";

// ── Props ─────────────────────────────────────────────────────────────────────
interface ActionButtonsProps {
  profile: Pick<Profile, "name" | "phone" | "whatsapp" | "email" | "website" | "position" | "company" | "siteUrl" | "address">;
}

// ── Componente ────────────────────────────────────────────────────────────────
export default function ActionButtons({ profile }: ActionButtonsProps) {
  return (
    <div className="w-full px-5 flex flex-col gap-3 animate-fade-in-up delay-300">

      {/* 1. WhatsApp */}
      {profile.whatsapp && (
        <a
          href={`https://wa.me/${profile.whatsapp}?text=Hola%20${encodeURIComponent(profile.name)},%20vi%20tu%20tarjeta%20digital%20y%20me%20gustar%C3%ADa%20contactarme`}
          target="_blank"
          rel="noopener noreferrer"
          className={btnWA}
          aria-label="Abrir chat de WhatsApp"
        >
          <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
            <IconWhatsApp />
          </span>
          <span>Escríbenos por WhatsApp</span>
        </a>
      )}

      {/* 2. Llamar */}
      {profile.phone && (
        <a href={`tel:${profile.phone}`} className={btnWhite} aria-label={`Llamar a ${profile.phone}`}>
          <span className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Phone className="w-4 h-4" />
          </span>
          <span className="truncate">{profile.phone}</span>
        </a>
      )}

      {/* 3. Correo */}
      {profile.email && (
        <a
          href={`mailto:${profile.email}?subject=Contacto desde tarjeta digital de ${encodeURIComponent(profile.name)}`}
          className={btnWhite}
          aria-label={`Enviar correo a ${profile.email}`}
        >
          <span className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
            <Mail className="w-4 h-4" />
          </span>
          <span className="truncate">{profile.email}</span>
        </a>
      )}

      {/* 4. Sitio web */}
      {profile.website && (
        <a
          href={profile.website}
          target="_blank"
          rel="noopener noreferrer"
          className={btnWhite}
          aria-label="Visitar sitio web"
        >
          <span className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
            <Globe className="w-4 h-4" />
          </span>
          <span className="truncate">{profile.website.replace(/^https?:\/\//, "")}</span>
        </a>
      )}

      {/* 5. Guardar contacto
          /api/contact sirve el .vcf con Content-Type: text/vcard correctos.
          iOS Safari lo abre directo en Contactos.
          Android Chrome lo descarga y ofrece abrirlo. */}
      {profile.name && (
        <a
          href="/api/contact"
          className={btnWhite}
          aria-label="Guardar contacto en tu teléfono"
        >
          <span className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <UserPlus className="w-4 h-4" />
          </span>
          <span>Guardar Contacto</span>
        </a>
      )}

    </div>
  );
}
