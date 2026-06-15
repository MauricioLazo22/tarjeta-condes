/**
 * Página principal — renderiza ProfileCard con los datos de profile.ts
 *
 * Server Component (sin "use client") para aprovechar SSR de Next.js 15.
 */

import { profile } from "@/config/profile";
import ProfileCard from "@/components/ProfileCard";

// Esta función puede ser async si en el futuro obtienes datos de Supabase
export default function Home() {
  return <ProfileCard profile={profile} />;
}
