/**
 * LogoSection — Sección superior: "Logo Principal"
 *
 * ╔══════════════════════════════════════════════════════════╗
 * ║  REEMPLAZAR ESTE ARCHIVO POR EL LOGO DEL CLIENTE        ║
 * ║                                                          ║
 * ║  1. Convierte el logo a formato WebP para mejor         ║
 * ║     rendimiento (usa squoosh.app o similar).             ║
 * ║  2. Copia el archivo como:  /public/logo.webp            ║
 * ║  3. Tamaño recomendado del archivo: < 50 KB              ║
 * ║  4. Dimensiones de imagen: 240×240 px mínimo            ║
 * ╚══════════════════════════════════════════════════════════╝
 */

import Image from "next/image";

export default function LogoSection() {
  return (
    /* ── Sección: Logo Principal ─────────────────────────────────────────── */
    <section
      className="flex flex-col items-center pt-8 pb-4 animate-scale-in"
      aria-label="Logo principal"
    >
      {/* ── Contenedor del logo con efecto de brillo sutil ───────────────── */}
      <div className="relative">
        {/* Halo de luz detrás del logo */}
        <div
          className="absolute inset-0 rounded-full bg-blue-400/20 blur-xl scale-110"
          aria-hidden="true"
        />

        {/* ─────────────────────────────────────────────────────────────────
            LOGO DEL CLIENTE
            ─────────────────────────────────────────────────────────────────
            ▶ REEMPLAZAR: coloca tu logo en /public/logo.webp
            ▶ El componente Image de Next.js lo optimiza automáticamente
            ▶ priority=true → se carga en el primer paint (LCP óptimo)
        ───────────────────────────────────────────────────────────────── */}
        <Image
          src="/logo.png"
          alt="Logo de la empresa"  /* ← Personaliza este texto alternativo */
          width={120}
          height={120}
          priority            /* Carga prioritaria → mejora LCP */
          className={[
            "relative z-10",
            "rounded-full",             /* Forma circular — cambiar a rounded-xl para cuadrado */
            "ring-2 ring-white/20",     /* Borde sutil */
            "shadow-lg shadow-black/30",
            "object-cover",
            "w-[120px] h-[120px]",      /* Tamaño fijo: 120px × 120px */
          ].join(" ")}
        />
      </div>
    </section>
  );
}
