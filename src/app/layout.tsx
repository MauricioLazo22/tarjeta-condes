/**
 * layout.tsx — Layout raíz del App Router de Next.js 15.
 *
 * Define:
 *   - Metadatos SEO (title, description, Open Graph, Twitter Card)
 *   - Viewport optimizado para móviles
 *   - Fuentes del sistema (sin Google Fonts → carga más rápida)
 *   - Estilos globales
 */

import type { Metadata, Viewport } from "next";
import { profile } from "@/config/profile";
import "./globals.css";

// ── Metadatos SEO ────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  // Título: usa seoTitle si está definido, sino genera automáticamente
  title: profile.seoTitle || `${profile.name} — ${profile.position}`,

  // Descripción: usa seoDescription si está definido, sino usa description
  description: profile.seoDescription || profile.description,

  // ── Open Graph (para compartir en redes sociales) ────────────────────────
  openGraph: {
    type: "profile",
    title: profile.seoTitle || `${profile.name} — ${profile.position}`,
    description: profile.seoDescription || profile.description,
    siteName: profile.company,
    url: profile.siteUrl,
    images: profile.siteUrl
      ? [
          {
            url: `${profile.siteUrl}/logo.webp`,
            width: 240,
            height: 240,
            alt: `Logo de ${profile.company}`,
          },
        ]
      : undefined,
  },

  // ── Twitter / X Card ─────────────────────────────────────────────────────
  twitter: {
    card: "summary",
    title: profile.seoTitle || profile.name,
    description: profile.seoDescription || profile.description,
  },

  // ── Robots ───────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
  },

  // ── Otros metadatos ───────────────────────────────────────────────────────
  authors: [{ name: profile.name }],
  creator: profile.company,
};

// ── Viewport optimizado para móvil ───────────────────────────────────────────

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,    // Permite zoom de accesibilidad
  themeColor: "#0f172a", // Color de la barra del navegador en Android
};

// ── Layout ───────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" style={{ background: "#1e3040" }}>
      <body style={{ background: "transparent" }}>
        {/* Fondo fijo — inline style, no puede quedar cacheado en CSS externo */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: -1,
            backgroundImage: "url('/fondo.png')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#1e3040",
          }}
        />
        {children}
      </body>
    </html>
  );
}
