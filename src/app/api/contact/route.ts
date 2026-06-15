/**
 * GET /api/contact
 * Sirve el archivo .vcf con headers correctos.
 * iOS Safari lo abre directo en Contactos. Android Chrome lo descarga y lo abre.
 */
import { NextResponse } from "next/server";
import { profile } from "@/config/profile";

export async function GET() {
  const { name, phone, email, website, position, company, address } = profile;

  const parts = name.trim().split(" ");
  const first = parts[0] ?? "";
  const last  = parts.slice(1).join(" ");

  const vcf = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${name}`,
    `N:${last};${first};;;`,
    position ? `TITLE:${position}`                     : "",
    company  ? `ORG:${company}`                        : "",
    phone    ? `TEL;TYPE=CELL,VOICE:${phone}`          : "",
    email    ? `EMAIL;TYPE=INTERNET,PREF:${email}`     : "",
    website  ? `URL;TYPE=WORK:${website}`              : "",
    address  ? `ADR;TYPE=WORK:;;${address};;;Perú`     : "",
    `NOTE:Tarjeta digital Condes Corporación`,
    "END:VCARD",
  ].filter(Boolean).join("\r\n");

  return new NextResponse(vcf, {
    headers: {
      "Content-Type":        "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${name.replace(/\s+/g, "_")}.vcf"`,
      "Cache-Control":       "no-cache",
    },
  });
}
