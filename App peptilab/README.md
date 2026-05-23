# PEPTILAB — PWA Premium

> **Science. Quality. Results.**  
> Aplicación web progresiva (PWA) para PEPTILAB.VE

---

## Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Estilos**: TailwindCSS 3
- **PWA**: next-pwa
- **Tipografías**: Cormorant Garamond + Jost + Space Mono (Google Fonts)
- **Deploy**: Vercel

---

## Instalación Local

```bash
# 1. Instalar dependencias
npm install

# 2. Correr en desarrollo
npm run dev

# 3. Build de producción
npm run build
npm start
```

Abre [http://localhost:3000](http://localhost:3000)

---

## Estructura del Proyecto

```
peptilab/
├── app/
│   ├── layout.tsx          ← Root layout + metadata SEO + PWA
│   ├── page.tsx            ← Página principal (estado global)
│   └── globals.css         ← Estilos base + animaciones
├── components/
│   ├── types.ts            ← TypeScript interfaces
│   ├── Navbar.tsx          ← Navegación fija + carrito
│   ├── Hero.tsx            ← Hero section con animaciones moleculares
│   ├── Catalog.tsx         ← Grid de productos con filtros
│   ├── Cart.tsx            ← Drawer de carrito + checkout WhatsApp
│   ├── Footer.tsx          ← Footer con contacto
│   ├── InstagramButton.tsx ← Botón flotante Instagram
│   └── InstallBanner.tsx   ← Prompt de instalación PWA
├── public/
│   ├── manifest.json       ← PWA manifest
│   ├── logo.jpg            ← Logo original
│   ├── logo-transparent.png← Logo sin fondo
│   ├── favicon.ico         ← Favicon
│   └── icons/              ← Íconos PWA (72px → 512px)
├── next.config.js          ← Config Next.js + PWA
├── tailwind.config.js      ← Config TailwindCSS (colores custom)
├── tsconfig.json
├── postcss.config.js
└── package.json
```

---

## Cómo Subir a GitHub

```bash
# Desde la carpeta del proyecto
git init
git add .
git commit -m "feat: PEPTILAB PWA v1.0"

# Crear repo en github.com/new y luego:
git remote add origin https://github.com/TU_USUARIO/peptilab.git
git branch -M main
git push -u origin main
```

---

## Cómo Desplegar en Vercel

### Opción A — Desde GitHub (recomendado)
1. Ve a [vercel.com](https://vercel.com) → **Add New Project**
2. Conecta tu repositorio de GitHub
3. Vercel detecta Next.js automáticamente
4. Click **Deploy** — en ~2 minutos tienes tu URL

### Opción B — CLI
```bash
npm i -g vercel
vercel --prod
```

> **Variables de entorno**: No se requieren para esta versión.

---

## Instalar PWA en iPhone

1. Abre Safari → navega a tu URL de Vercel
2. Toca el botón **Compartir** (cuadrado con flecha ↑)
3. Selecciona **"Agregar a pantalla de inicio"**
4. Toca **Agregar** — aparece el ícono de PEPTILAB

> ⚠️ Solo funciona en Safari en iOS. Chrome en iPhone no soporta instalación PWA nativa.

---

## Instalar PWA en Android

1. Abre Chrome → navega a tu URL
2. Aparece banner automático **"Instalar PEPTILAB"** (después de 3 seg)
3. También: menú ⋮ → **"Agregar a pantalla de inicio"**
4. Acepta → el ícono aparece en tu launcher

---

## Actualizar Productos en el Futuro

Edita el array `PRODUCTS` en `/app/page.tsx`:

```typescript
const PRODUCTS: Product[] = [
  { id: 1, name: 'Tirzepatida', presentation: '10 mg', price: 130, category: 'GLP-1' },
  // Agrega nuevos productos aquí:
  { id: 14, name: 'NUEVO PÉPTIDO', presentation: '5 mg', price: 90, category: 'Longevidad' },
];
```

**Categorías disponibles**: `GLP-1`, `Regenerativo`, `Longevidad`, `GH Secretagogo`, `Blend`, `Accesorio`

Luego haz commit y push — Vercel redespliega automáticamente en ~1 minuto.

---

## Cambiar Número de WhatsApp

En `/components/Cart.tsx`, línea con `wa.me/`:

```typescript
window.open(`https://wa.me/584129987858?text=${encoded}`, '_blank');
// Cambia 584129987858 por tu número (código de país sin +)
```

---

## SEO y Metadata

Edita `/app/layout.tsx` → objeto `metadata` para cambiar:
- Título, descripción, keywords
- URL canónica (Open Graph)
- Imágenes para redes sociales

---

## Licencia

© 2025 PEPTILAB.VE — Todos los derechos reservados.  
FOR RESEARCH USE ONLY.
