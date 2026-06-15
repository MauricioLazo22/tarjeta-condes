/**
 * MapSection — Sección de ubicación estilo tarjeta (igual a BankAccounts).
 *
 * Muestra:
 *   • Tarjeta blanca con ícono de ubicación, label "Dirección", y botón "Ir"
 *   • Dirección física en recuadro interior
 *   • Iframe de Google Maps embed debajo
 *
 * Sin "use client" — el iframe es HTML estático.
 */

import { MapPin, Navigation } from "lucide-react";

interface MapSectionProps {
  address: string;
  mapsUrl: string;
  mapsEmbed: string;
}

export default function MapSection({ address, mapsUrl, mapsEmbed }: MapSectionProps) {
  if (!address && !mapsEmbed) return null;

  return (
    <section className="w-full px-5 pb-4 animate-fade-in-up delay-500" aria-label="Ubicación">

      {/* Tarjeta de dirección — estilo igual a AccountCard */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-3">

        {/* Cabecera: ícono + título + botón Ir */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">

            {/* Ícono de ubicación en cuadrado redondeado */}
            <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>

            <div>
              <p className="font-bold text-slate-800 text-sm leading-tight">Dirección</p>
              <p className="text-slate-500 text-xs">Arequipa, Perú</p>
            </div>
          </div>

          {/* Botón Ir */}
          {mapsUrl && (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir en Google Maps"
              className="tap-highlight-none shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-200 text-slate-600 text-xs font-semibold transition-all active:scale-90 hover:bg-slate-300"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Ir</span>
            </a>
          )}
        </div>

        {/* Dirección en recuadro gris — igual al número de cuenta */}
        {address && (
          <div className="bg-slate-50 rounded-xl px-3 py-2.5">
            <p className="text-xs text-slate-400 mb-0.5">Oficina principal</p>
            <p className="text-sm font-semibold text-slate-800 leading-snug">
              {address}
            </p>
          </div>
        )}
      </div>

      {/* Mapa embebido */}
      {mapsEmbed && (
        <div className="rounded-2xl overflow-hidden shadow-sm">
          <iframe
            src={mapsEmbed}
            width="100%"
            height="260"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa Condes Corporación"
          />
        </div>
      )}

    </section>
  );
}
