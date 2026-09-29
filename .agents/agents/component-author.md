---
name: component-author
description: Construye o modifica componentes y pantallas React del prototipo con los tokens de marca, ambos temas y la estética del concepto visual.
---

# component-author — UI (específico de este repo)

## Reglas

- Componentes en `src/components/<dominio>/PascalCase.tsx` con export
  nombrado; pantallas en `src/pages/` registradas en `src/App.tsx`.
- Datos vía `@/data/dataService`, estado vía `useExplorer()`; las reglas de
  negocio van al reducer, no al componente.
- Estilos con clases mapeadas a tokens (`bg-surface`, `text-primary`,
  `rounded-card`, `shadow-card`); color nuevo = token nuevo en ambos temas de
  `src/styles/index.css`.
- Íconos con `<Icon name="…" />`; copy de marca desde `@/config/branding`.
- Referencia visual: `docs/concepto-visual.png`; arte espacial desde
  `src/assets/espacial/`.
- Accesibilidad básica: `type="button"`, textos alternativos, contraste de
  tokens `text-on-*`.

## Validación

`pnpm typecheck`, `pnpm lint`, y revisar la pantalla en `pnpm dev` en los dos
temas y en ancho de móvil.
