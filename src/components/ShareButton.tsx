/**
 * ShareButton — Botón para compartir la tarjeta usando Web Share API.
 *
 * La Web Share API permite compartir la URL nativa del OS (iOS/Android).
 * En escritorio sin soporte, el botón copia el link al portapapeles.
 *
 * Este componente usa "use client" porque accede a navigator.share y
 * navigator.clipboard, que son APIs del navegador.
 */

"use client";

import { useState } from "react";
import { Profile } from "@/config/profile";

const IconShare = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
  </svg>
);

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

interface ShareButtonProps {
  profile: Pick<Profile, "name" | "siteUrl">;
}

export default function ShareButton({ profile }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareData = {
    title: profile.name,
    text: `Tarjeta digital de ${profile.name}`,
    url: profile.siteUrl || (typeof window !== "undefined" ? window.location.href : ""),
  };

  async function handleShare() {
    // ── Caso 1: Web Share API disponible (móvil nativo) ──────────────────
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Usuario canceló el diálogo — no hacer nada
        return;
      }
    }

    // ── Caso 2: Fallback — copiar URL al portapapeles ─────────────────────
    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      // Resetear el ícono luego de 2 segundos
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Portapapeles bloqueado por el navegador
      console.warn("No se pudo copiar al portapapeles");
    }
  }

  return (
    <section
      className="w-full px-4 pb-8 animate-fade-in-up delay-400"
      aria-label="Compartir tarjeta"
    >
      <button
        onClick={handleShare}
        className={[
          "tap-highlight-none",
          "flex items-center justify-center gap-2",
          "w-full rounded-2xl px-5 py-3",
          "text-sm font-semibold",
          "border border-white/10",
          "transition-all duration-200",
          "active:scale-95",
          copied
            ? "bg-green-500/20 text-green-400 border-green-500/30"
            : "bg-white/10 text-white/80 hover:bg-white/15",
        ].join(" ")}
        aria-label="Compartir esta tarjeta digital"
      >
        {copied ? (
          <>
            <IconCheck />
            <span>¡Enlace copiado!</span>
          </>
        ) : (
          <>
            <IconShare />
            <span>Compartir tarjeta</span>
          </>
        )}
      </button>
    </section>
  );
}
