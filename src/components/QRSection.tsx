/**
 * QRSection — QR code siempre visible en la tarjeta (no modal).
 * Genera el QR una sola vez con useEffect.
 * Botones: Compartir (Web Share API / copy URL) + Descargar PNG.
 */
"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";
import { Download, Share2 } from "lucide-react";

interface QRSectionProps {
  siteUrl?: string;
  name: string;
}

export default function QRSection({ siteUrl, name }: QRSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shareRef  = useRef<HTMLButtonElement>(null);

  // URL a codificar: la del perfil o la del browser en dev
  const qrUrl = siteUrl || (typeof window !== "undefined" ? window.location.href : "");

  useEffect(() => {
    if (!canvasRef.current) return;
    const url = siteUrl || window.location.href;
    QRCode.toCanvas(canvasRef.current, url, {
      width: 200,
      margin: 2,
      color: { dark: "#0f172a", light: "#ffffff" },
      errorCorrectionLevel: "M",
    }).catch(() => {});
  }, [siteUrl]);

  // Canvas con padding blanco para exportar/compartir
  function buildExportCanvas() {
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

  function handleDownload() {
    const canvas = buildExportCanvas();
    if (!canvas) return;
    const a = document.createElement("a");
    a.href     = canvas.toDataURL("image/png");
    a.download = `QR-${name.replace(/\s+/g, "_")}.png`;
    a.click();
  }

  async function handleShare() {
    const btn  = shareRef.current;
    const span = btn?.querySelector("span");
    const url  = siteUrl || window.location.href;

    const setFeedback = (msg: string, bg: string) => {
      if (!btn || !span) return;
      span.textContent = msg;
      btn.style.backgroundColor = bg;
    };
    const reset = () => {
      if (!btn || !span) return;
      span.textContent = "Compartir";
      btn.style.backgroundColor = "#0f172a";
    };

    // Intentar Web Share con imagen
    const canvas = buildExportCanvas();
    if (canvas && navigator?.share) {
      try {
        const blob = await new Promise<Blob | null>((res) =>
          canvas.toBlob(res, "image/png")
        );
        if (blob) {
          const file = new File([blob], `QR-${name}.png`, { type: "image/png" });
          if (navigator.canShare?.({ files: [file] })) {
            await navigator.share({
              title: `Tarjeta de ${name}`,
              text: `Escanea para ver la tarjeta digital de ${name}`,
              files: [file],
            });
            return;
          }
        }
        // fallback share solo URL
        await navigator.share({ title: name, url });
        return;
      } catch { /* usuario canceló o no soportado */ }
    }

    // Fallback: copiar URL
    try { await navigator.clipboard.writeText(url); } catch {}
    setFeedback("¡Enlace copiado!", "#22c55e");
    setTimeout(reset, 2000);
  }

  return (
    <div className="w-full px-5 pb-4 animate-fade-in-up delay-500">
      <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col items-center gap-4">

        {/* QR code */}
        <canvas
          ref={canvasRef}
          className="rounded-xl"
          aria-label={`Código QR de ${name}`}
        />

        {/* URL debajo del QR */}
        <p className="text-xs text-slate-400 truncate w-full text-center px-2">
          {qrUrl || "Cargando..."}
        </p>

        {/* Botones */}
        <div className="flex gap-3 w-full">
          <button
            type="button"
            onClick={handleDownload}
            className="tap-highlight-none flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold active:scale-95 transition-all"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>Descargar</span>
          </button>

          <button
            ref={shareRef}
            type="button"
            onClick={handleShare}
            className="tap-highlight-none flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white text-xs font-semibold active:scale-95 transition-all"
            style={{ backgroundColor: "#0f172a", transition: "background-color 0.15s" }}
          >
            <Share2 className="w-4 h-4 shrink-0" />
            <span>Compartir</span>
          </button>
        </div>
      </div>
    </div>
  );
}
