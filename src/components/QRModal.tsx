/**
 * QRModal — Botón flotante QR + modal deslizante.
 *
 * APERTURA: <a href="#qr-modal"> → CSS :target → sin JS requerido.
 *           Funciona en iOS Safari aunque React aún no haya hidratado.
 * CIERRE:   <a href="#qr-close"> → ancla invisible → :target deja de
 *           apuntar al modal → modal desaparece (CSS puro).
 * QR:       Se renderiza en <canvas> via useEffect (qrcode library).
 *           Apunta a window.location.href = esta misma tarjeta digital.
 */
"use client";

import { useEffect, useRef } from "react";
import { QrCode, Download, Share2 } from "lucide-react";

interface QRModalProps {
  /** Nombre del perfil — aparece en el modal y en el archivo descargado */
  name: string;
}

export default function QRModal({ name }: QRModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Renderizar el QR en el canvas al montar el componente
  useEffect(() => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (!url) return;

    import("qrcode").then((QRCode) => {
      if (!canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, url, {
        width: 220,
        margin: 2,
        color: { dark: "#0f172a", light: "#ffffff" },
        errorCorrectionLevel: "M",
      }).catch(() => {});
    });
  }, []);

  // ── Exportar QR con margen blanco ─────────────────────────────────────────
  function buildExportCanvas(): HTMLCanvasElement | null {
    const src = canvasRef.current;
    if (!src) return null;
    const pad = 24;
    const out = document.createElement("canvas");
    out.width  = src.width  + pad * 2;
    out.height = src.height + pad * 2;
    const ctx = out.getContext("2d");
    if (!ctx) return null;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, out.width, out.height);
    ctx.drawImage(src, pad, pad);
    return out;
  }

  // ── Descargar PNG ─────────────────────────────────────────────────────────
  function handleDownload() {
    const canvas = buildExportCanvas();
    if (!canvas) return;
    const a = document.createElement("a");
    a.href     = canvas.toDataURL("image/png");
    a.download = `QR-${name.replace(/\s+/g, "_")}.png`;
    a.click();
  }

  // ── Compartir / copiar URL ────────────────────────────────────────────────
  async function handleShare(e: React.MouseEvent<HTMLButtonElement>) {
    const btn  = e.currentTarget;
    const span = btn.querySelector("span");
    const url  = window.location.href;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: name, text: "Tarjeta digital", url });
        return;
      } catch { /* usuario canceló */ }
    }

    // Fallback: copiar URL al portapapeles
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const el = document.createElement("textarea");
      el.value = url;
      el.style.cssText = "position:fixed;top:0;left:0;width:1px;height:1px;opacity:.01";
      document.body.appendChild(el);
      el.focus(); el.select();
      try { document.execCommand("copy"); } catch {}
      document.body.removeChild(el);
    }

    // Feedback visual
    if (span) {
      span.textContent = "¡Copiado!";
      btn.style.backgroundColor = "#22c55e";
      btn.style.color = "#ffffff";
      setTimeout(() => {
        span.textContent = "Compartir";
        btn.style.removeProperty("background-color");
        btn.style.removeProperty("color");
      }, 2000);
    }
  }

  return (
    <>
      {/* Ancla invisible para cerrar el modal sin scroll */}
      <div
        id="qr-close"
        style={{ position: "absolute", top: 0, height: 0, overflow: "hidden" }}
        aria-hidden="true"
      />

      {/* ── Botón flotante — <a href> puro, no necesita JS ─────────────────── */}
      <a
        href="#qr-modal"
        aria-label="Ver código QR de la tarjeta"
        className={[
          "tap-highlight-none",
          "fixed bottom-6 right-5 z-40",
          "w-14 h-14 rounded-full",
          "bg-white shadow-2xl shadow-black/40",
          "flex items-center justify-center text-slate-800",
          "ring-2 ring-white/40",
          "transition-transform duration-200 hover:scale-110 active:scale-90",
        ].join(" ")}
      >
        <QrCode className="w-6 h-6" />
      </a>

      {/* ── Modal — oculto por defecto; visible via CSS :target ────────────── */}
      <div id="qr-modal" className="qr-modal-overlay" role="dialog" aria-modal="true" aria-label="Código QR">

        {/* Fondo oscuro — click cierra */}
        <a href="#qr-close" className="qr-modal-backdrop" aria-label="Cerrar modal" />

        {/* Panel */}
        <div className="qr-modal-panel">

          {/* Tirador visual */}
          <div className="w-10 h-1 rounded-full bg-slate-200 mx-auto mb-5" aria-hidden="true" />

          {/* Encabezado */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-slate-800 leading-tight">Código QR</h2>
              <p className="text-xs text-slate-400 mt-0.5">Escanea para abrir la tarjeta</p>
            </div>
            <a
              href="#qr-close"
              aria-label="Cerrar"
              className="tap-highlight-none w-8 h-8 rounded-full bg-slate-100
                flex items-center justify-center text-slate-500 text-xl leading-none
                transition-colors hover:bg-slate-200 active:scale-90 shrink-0 ml-3"
            >
              ×
            </a>
          </div>

          {/* Canvas QR */}
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
              <canvas
                ref={canvasRef}
                className="block rounded-lg"
                style={{ width: 220, height: 220 }}
                aria-label={`Código QR de ${name}`}
              />
            </div>
          </div>

          {/* Nombre */}
          <p className="text-center text-sm font-semibold text-slate-700 mb-5 truncate px-2">
            {name}
          </p>

          {/* Botones */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleDownload}
              className="tap-highlight-none flex-1 flex items-center justify-center gap-2
                rounded-2xl py-3.5 text-sm font-semibold
                bg-slate-800 text-white
                transition-all duration-150 active:scale-95 hover:bg-slate-700"
            >
              <Download className="w-4 h-4" />
              Descargar
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="tap-highlight-none flex-1 flex items-center justify-center gap-2
                rounded-2xl py-3.5 text-sm font-semibold
                bg-slate-100 text-slate-700
                transition-all duration-150 active:scale-95 hover:bg-slate-200"
            >
              <Share2 className="w-4 h-4" />
              <span>Compartir</span>
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
