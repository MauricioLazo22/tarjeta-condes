import Image from "next/image";
import { User, Landmark, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Profile } from "@/config/profile";
import ProfileInfo   from "./ProfileInfo";
import ActionButtons from "./ActionButtons";
import BankAccounts  from "./BankAccounts";
import MapSection    from "./MapSection";
import QRModal       from "./QRModal";

interface ProfileCardProps {
  profile: Profile;
}

function SectionHeader({ Icon, label }: { Icon: LucideIcon; label: string }) {
  return (
    <div className="w-full flex items-center gap-3 px-5 my-5">
      <div className="flex-1 h-px bg-white/15" />
      <div className="flex items-center gap-2 shrink-0">
        <Icon className="w-3.5 h-3.5 text-white/45" />
        <span className="text-xs font-semibold text-white/45 uppercase tracking-widest whitespace-nowrap">
          {label}
        </span>
      </div>
      <div className="flex-1 h-px bg-white/15" />
    </div>
  );
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const hasBankAccounts = profile.bankAccounts && profile.bankAccounts.length > 0;
  const hasMap = !!(profile.address || profile.mapsEmbed);

  return (
    <main className="min-h-dvh flex flex-col items-center justify-start py-10 px-0 pb-28">
      <div className="w-full max-w-sm flex flex-col items-center">

        {/* Logo */}
        <Image
          src="/logo.png"
          alt={`Logo de ${profile.company}`}
          width={130}
          height={130}
          priority
          className="w-[130px] h-[130px] rounded-2xl object-contain mb-5 animate-scale-in"
        />

        {/* Nombre, cargo */}
        <ProfileInfo profile={profile} />

        {/* ── INFORMACIÓN DE CONTACTO ── */}
        <div className="w-full">
          <SectionHeader Icon={User} label="Información de contacto" />
          <ActionButtons profile={profile} />
        </div>

        {/* ── DATOS DE PAGO ── */}
        {hasBankAccounts && (
          <div className="w-full">
            <SectionHeader Icon={Landmark} label="Datos de pago" />
            <BankAccounts accounts={profile.bankAccounts!} />
          </div>
        )}

        {/* ── UBICACIÓN ── */}
        {hasMap && (
          <div className="w-full">
            <SectionHeader Icon={MapPin} label="Ubicación" />
            <MapSection
              address={profile.address ?? ""}
              mapsUrl={profile.mapsUrl ?? ""}
              mapsEmbed={profile.mapsEmbed ?? ""}
            />
          </div>
        )}

        {/* Footer */}
        <footer className="mt-6 mb-2 animate-fade-in delay-500">
          <p className="text-white/25 text-xs font-semibold tracking-[0.25em] uppercase select-none">
            CondesCapital
          </p>
        </footer>

      </div>

      {/* ── BOTÓN QR FLOTANTE + MODAL ── */}
      {/* Fuera del flujo de la tarjeta para no afectar layout */}
      <QRModal name={profile.name} />
    </main>
  );
}
