# src/styles — estilos globales y tokens de tema

Un archivo por responsabilidad; `index.css` solo ordena los `@import`.

| Archivo / carpeta | Responsabilidad |
|---|---|
| `index.css` | Punto de entrada: Tailwind → fuentes → tokens → puente → base → movimiento |
| `fuentes.css` | Noto Sans y Material Symbols auto-hospedados (sin red) |
| `tokens/` | Valores de color, sombra y forma de cada tema (`covalto.css`, `espacial.css`) |
| `tailwind-tema.css` | `@theme inline`: conecta cada token con su utilidad de Tailwind |
| `base.css` | `html`/`body`: fondo y texto del tema, transición al alternar |
| `movimiento.css` | `prefers-reduced-motion`: sin animaciones ni transiciones decorativas |
| `contraste/` | Contrato de accesibilidad de los temas y su prueba automática |

## Tokens semánticos (qué usar para qué)

| Uso | Utilidad | Nota |
|---|---|---|
| Texto normal / secundario | `text-text`, `text-text-muted` | ≥ 4.5:1 |
| Botón primario | `bg-primary text-text-on-primary` | |
| Ámbar de fondo (botones, chips) | `bg-accent text-text-on-accent` | |
| Ámbar como texto o ícono | `text-accent-text` | **nunca** `text-accent` sobre superficies |
| Error | `text-danger` (o `<MensajeError>`) | |
| Borde decorativo | `border-border` | separadores |
| Borde que delimita (inputs, nodos) | `border-border-strong` | ≥ 3:1 |
| Medallas del ranking | `text-medalla-oro/plata/bronce` | |

**Prohibido:** colores fijos en componentes (`text-red-600`, `bg-black/…`,
hex). Si falta un color, agrega un token en **ambos** archivos de `tokens/`,
su utilidad en `tailwind-tema.css` y, si se usa como texto o borde, su par en
`contraste/paresTema.ts`.

**Pruebas:** `pnpm exec vitest run src/styles` — falla si algún tema deja texto
o bordes por debajo del mínimo WCAG.
