/**
 * ProfileInfo — Nombre, cargo, empresa y descripción.
 * Lee datos desde /src/config/profile.ts
 */

import { Profile } from "@/config/profile";

interface ProfileInfoProps {
  profile: Pick<Profile, "name" | "position" | "company" | "description">;
}

export default function ProfileInfo({ profile }: ProfileInfoProps) {
  const { name, position, company, description } = profile;

  return (
    <section className="text-center px-4 pb-1 animate-fade-in-up delay-100 w-full">

      {/* Nombre */}
      {name && (
        <h1 className="text-2xl font-bold text-white tracking-tight leading-snug">
          {name}
        </h1>
      )}

      {/* Cargo • Empresa */}
      {(position || company) && (
        <p className="mt-1 text-blue-200/80 text-sm font-medium">
          {position}
          {position && company && <span className="mx-1.5 text-white/30">·</span>}
          {company}
        </p>
      )}

      {/* Descripción */}
      {description && (
        <p className="mt-2 text-white/50 text-sm leading-relaxed max-w-xs mx-auto">
          {description}
        </p>
      )}

    </section>
  );
}
