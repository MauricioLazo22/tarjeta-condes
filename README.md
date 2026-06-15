# 📇 Tarjeta Digital — Guía de personalización

Proyecto de tarjeta digital profesional construido con **Next.js 15**, **TypeScript** y **Tailwind CSS**. Diseño mobile-first con carga ultrarrápida.

---

## 🚀 Inicio rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Modo desarrollo
npm run dev

# 3. Build para producción
npm run build
npm start
```

Abre [http://localhost:3000](http://localhost:3000) para ver la tarjeta.

---

## ✏️ Cómo personalizar

### 1. Cambiar los datos de la tarjeta

**Archivo:** `src/config/profile.ts`

Este es el **único archivo** que necesitas editar para cambiar toda la información:

```ts
export const profile = {
  name: "Tu Nombre Completo",
  position: "Tu Cargo",
  company: "Tu Empresa",
  description: "Descripción breve...",
  phone: "+51999999999",
  whatsapp: "51999999999",   // Sin el "+"
  email: "tu@email.com",
  website: "https://tuempresa.com",
  instagram: "https://instagram.com/tuusuario",
  facebook: "",   // Dejar vacío para ocultar el botón
  linkedin: "",
  tiktok: "",
  youtube: "",
};
```

> **Campos opcionales:** si dejas un campo vacío `""`, ese botón o sección **no aparece** en la tarjeta.

---

### 2. Cambiar el logo

**Archivo:** `public/logo.webp`

1. Prepara tu logo (fondo transparente recomendado)
2. Conviértelo a formato WebP para mejor rendimiento:
   - Herramienta gratuita: [squoosh.app](https://squoosh.app)
   - Tamaño recomendado: **240×240 px**, menor a **50 KB**
3. Guárdalo como `public/logo.webp` (reemplaza el archivo placeholder)

> El componente `src/components/LogoSection.tsx` carga la imagen automáticamente.

---

### 3. Cambiar los colores del fondo

**Archivo:** `src/app/globals.css`

Busca las variables CSS al inicio del archivo:

```css
:root {
  --gradient-from: #0f172a;  /* Color inicial del degradado */
  --gradient-via:  #1e3a8a;  /* Color central del degradado */
  --gradient-to:   #0f172a;  /* Color final del degradado   */
  --accent: #3b82f6;          /* Color de acentos y botones  */
}
```

Puedes usar cualquier color hexadecimal. Herramienta para generar degradados: [uigradients.com](https://uigradients.com)

---

### 4. Cambiar el color de los botones

**Archivo:** `src/components/ActionButtons.tsx`

Busca las variables `btnPrimary` y `btnWhatsApp` al inicio del archivo y ajusta las clases de Tailwind.

---

## 📁 Estructura de carpetas

```
/
├── public/
│   └── logo.webp              ← ★ REEMPLAZAR con el logo del cliente
│
├── src/
│   ├── app/
│   │   ├── globals.css        ← Estilos globales y variables de color
│   │   ├── layout.tsx         ← Metadatos SEO y configuración del HTML
│   │   └── page.tsx           ← Página principal (ensamblado)
│   │
│   ├── components/
│   │   ├── ProfileCard.tsx    ← Tarjeta contenedora principal
│   │   ├── LogoSection.tsx    ← Sección del logo
│   │   ├── ProfileInfo.tsx    ← Nombre, cargo, empresa, descripción
│   │   ├── ActionButtons.tsx  ← Botones de acción (llamar, email, etc.)
│   │   ├── SocialLinks.tsx    ← Botones de redes sociales
│   │   └── ShareButton.tsx    ← Botón "Compartir" (Web Share API)
│   │
│   └── config/
│       └── profile.ts         ← ★ EDITAR AQUÍ los datos del cliente
│
├── next.config.ts             ← Configuración de Next.js
├── tailwind.config.ts         ← Paleta de colores y animaciones
└── tsconfig.json              ← Configuración de TypeScript
```

---

## 🔮 Conexión futura con Supabase

La arquitectura está preparada. Para conectar con Supabase:

1. Instala el cliente: `npm install @supabase/supabase-js`
2. En `src/app/page.tsx`, reemplaza la importación de `profile.ts` por:

```ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function Home() {
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('slug', 'mi-slug')
    .single()

  return <ProfileCard profile={profile} />
}
```

3. Los componentes (`ProfileCard`, `ActionButtons`, etc.) **no requieren cambios**.

---

## ⚡ Rendimiento

| Métrica | Valor esperado |
|---------|---------------|
| Lighthouse Performance | 95–100 |
| LCP (Largest Contentful Paint) | < 1.5s |
| Bundle JS cliente | < 15 KB |
| Sin fuentes externas | ✅ |
| Sin librerías de íconos | ✅ (SVG inline) |

---

## 📦 Despliegue en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel --prod
```

O conecta el repositorio en [vercel.com](https://vercel.com) para deploys automáticos.
