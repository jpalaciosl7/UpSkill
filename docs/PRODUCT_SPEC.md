# PRODUCT_SPEC — Covalto³ · Ruta de Formación IA ("Explorador IA")

> Especificación de producto: **qué** es este repositorio, **para quién** y
> **por qué** existe. El *cómo* está en [`ARCHITECTURE.md`](ARCHITECTURE.md).
>
> Este documento es el antiguo `CLAUDE.md` (fuente de verdad del build),
> movido aquí el 2026-09-28 al adoptar `AGENTS.md`. **Conserva la numeración
> §1–§10**, así que los comentarios del código que citan "CLAUDE.md §N" apuntan
> a la sección §N de este archivo. El original quedó en `CLAUDE.md.bak`.
>
> Documentos fuente: [`Covalto3_Ruta_Formacion_Documento_Base.md`](Covalto3_Ruta_Formacion_Documento_Base.md)
> (documento ancla del contenido) y `concepto-visual.png` (concepto de UI/mecánica).

## En resumen

- **Problema:** la formación en IA de Covalto se siente como "un curso más". La
  medición de madurez (D1–D5) muestra que la gente usa IA a nivel individual,
  pero casi no la **comparte ni la lidera**.
- **Propuesta:** convertir la formación en un **viaje con progresión visible**
  — 6 niveles como planetas, XP, monedas, racha, sellos en un pasaporte,
  ranking y recompensas no monetarias — que lleve a cada colaborador de
  *usuario* a *multiplicador*.
- **Para quién es este repo:** es un **prototipo para demostrar el concepto**
  a stakeholders (People, TI, comité) y servir de base para decidir la
  plataforma definitiva. Sus usuarios directos son quienes lo presentan y
  evalúan; los usuarios finales imaginados son los colaboradores de Covalto.
- **Criterios de éxito:** se puede recorrer de punta a punta sin explicación
  (landing → evaluación → mapa → nivel → pasaporte → ranking → recompensas);
  se ve pulido y fiel al concepto visual; funciona sin base de datos; no
  compromete ninguna decisión abierta (§7).
- **No-objetivos:** no es la plataforma final, no es un LMS, no maneja dinero
  ni becas, no usa datos reales de colaboradores en los mocks, no integra
  Google/AKB/LMS.

> ⚠️ **Nota de alcance (2026-08-06):** el stakeholder pidió explícitamente sumar
> una base de datos real (Postgres/Supabase) para una tabla de usuarios —
> nombre, alias, correo `@covalto.com`, nivel/XP/monedas/racha/módulos/sellos,
> fecha de registro y último acceso. Esto **contradice a propósito** el "sin
> backend real" de §1/§7 y el "sin llamadas de red" de §9 originales — fue una
> decisión consciente, no un incumplimiento accidental de este documento. El
> resto de los guardrails (cero recompensas monetarias, cero PII de terceros en
> ilustraciones, etc.) sigue vigente tal cual. Detalle técnico y limitaciones de
> seguridad conocidas en `README.md` § "Base de datos (Supabase)",
> [`SECURITY.md`](SECURITY.md) y `supabase/migrations/0001_usuarios.sql`. El
> prototipo sigue siendo 100% demostrable sin la BD conectada (cae a modo local).

---

## 1 · Qué construimos

Un **prototipo web interactivo** de la ruta de formación gamificada **"Explorador
IA"** de Covalto³: un viaje de aprendizaje de IA donde cada colaborador pasa de
*usuario* a *multiplicador*. El objetivo del prototipo es **demostrar el
concepto a stakeholders** (People, TI, comité) y servir de base para decidir la
plataforma definitiva.

Es un **prototipo de front-end con datos mock** — sin datos reales de
colaboradores en los mocks, sin lógica de recompensas monetarias. Debe verse
pulido y navegable de punta a punta. (Backend: ver nota de alcance arriba.)

## 2 · Contexto (por qué existe)

Covalto³ es el programa de transformación AI-Native de Covalto (2026–2028). Esta
ruta es la **cara vivencial de la Línea 1 (Capacidades)**: convierte la
formación en un viaje con progresión visible.

Dato que dirige el diseño: el baseline de madurez (autoevaluación **D1–D5**)
muestra fuerza en el uso individual (D1/D2) y **brecha real en compartir y
liderar (D4/D5)**. Por eso los niveles altos de la ruta (**Liderazgo**,
**Experto**) premian justo ese comportamiento. La ruta y el pipeline de **AI
Champions** son el mismo embudo.

## 3 · Alcance del prototipo (pantallas)

| # | Pantalla | Contenido | Ruta |
| :-- | :-- | :-- | :-- |
| 1 | **Landing / Hero** | "Mi viaje. Mi misión. Mi futuro con IA." + CTA "Despega ahora" | `/` |
| 2 | **Autoevaluación (placement)** | Cuestionario corto D1–D5 que asigna un **rango de entrada** (Novato → Explorador → Avanzado → Experto) | `/evaluacion` |
| 3 | **Mapa de trayectoria** | Los **6 niveles** como planetas; estado bloqueado/activo/completado; posición actual | `/mapa` |
| 4 | **Detalle de nivel** | Módulos del nivel, XP por módulo, acción "completar" | `/nivel/:levelId` |
| 5 | **Pasaporte del Explorador** | Perfil + **sellos de misión** (uno por nivel), monedas, barra XP, racha, nivel/rango | `/pasaporte` |
| 6 | **HUD persistente** | Monedas · Nivel · progreso XP · racha (como las tarjetas del arte) | en todo `AppLayout` |
| 7 | **Ranking de Exploradores** | Leaderboard por XP (mock; real si hay Supabase) | `/ranking` |
| 8 | **Comunidad / Hackatón** | Tarjetas teaser: foros, retos, Hackatón Covalto IA, Día IA | `/comunidad` |
| 9 | **Recompensas** | Catálogo de recompensas (solo **no monetarias** — ver §7) | `/recompensas` |
| — | **Cuenta** | Identificarse con correo `@covalto.com` (nota de alcance) | `/cuenta` |

**Estado:** un "explorador" en memoria + `localStorage` (modo local), o
sincronizado con Supabase si se identificó. Completar un módulo otorga
XP/monedas, desbloquea niveles, otorga sellos, actualiza la racha y la
posición en el ranking. Existe un botón **"reiniciar progreso"**.

**Racha (días):** solo completar un módulo cuenta como actividad (métrica
dual: abrir la app no suma). Primer módulo del día → +1 si la última actividad
fue ayer, o vuelve a 1 si fue antes; más módulos el mismo día no la cambian.
Si pasa más de un día sin actividad, el HUD y el Pasaporte la muestran en 0
hasta la siguiente. Los días se cuentan en la fecha local del navegador.

## 4 · Los 6 niveles (contenido canónico)

| # | Nivel | AAA+ | Señal de dominio |
| :-- | :-- | :-- | :-- |
| 1 | **Despegue** | Aprende | Fundamentos; primer prompt útil |
| 2 | **Exploración** | Aprende | Usa herramientas del ecosistema con confianza |
| 3 | **Desafío** | Automatiza | Resuelve un caso real de su trabajo con IA |
| 4 | **Nuevos Mundos** | Automatiza | Construye una automatización |
| 5 | **Liderazgo** | Amplifica | **Comparte y multiplica** (cierra brecha D4) |
| 6 | **Experto IA** | Amplifica | Referente / facilitador → candidato a AI Champion |

Cada nivel se llena con 3–5 módulos mock (hoy: 4 por nivel, en
`src/data/modules.json`). Fuente conceptual del contenido: F1 (formación
Google), F2 (Labs EUC) y skills del AKB — títulos plausibles, sin inventar
datos internos.

## 5 · Mecánica de gamificación

XP · Monedas Covalto · Niveles + rango · Racha (días) · Pasaporte con sellos ·
Rankings · Recompensas.

**Principio de métrica dual (no negociable):** la XP debe premiar **aplicar**
IA a trabajo real, no solo consumir contenido. Evita mecánicas que premien
actividad vacía. Se refleja en cómo se otorgan puntos: los módulos `aplica`
valen más que los `aprende` (verificado por `src/data/dataService.test.ts`).

## 6 · Sistema de diseño

**Marca Covalto (sistema base):**
- Verde primario `#062323`, verde-2 `#0c3634`, verde-3 `#134c48`
- Ámbar acento `#FFBA1F`, verde menta `#84C28B`
- Superficies: off-white `#F9F8F7`, menta `#F0FDF1`, beige `#F5EFE4`
- Tipografía **Noto Sans**; íconos **Material Symbols Outlined**
- Tarjetas redondeadas, sombras suaves

**Motivo espacial (capa de campaña):** el arte de referencia usa una estética
de exploración espacial (astronauta, planetas, pasaporte). Se trata como **capa
ilustrativa/temática** sobre el sistema Covalto, no como reemplazo de la marca.

> ⚠️ **Decisión de marca abierta.** El theming usa **tokens CSS** y un **flag de
> tema** (`covalto` | `espacial`) alternable. Default: `covalto` con acentos
> espaciales. Así el prototipo no cierra la decisión.

## 7 · Decisiones ABIERTAS — se construye con mocks y flags, sin inventar compromisos

| Tema | Cómo se trata en el prototipo |
| :-- | :-- |
| **Recompensas** | Solo **no monetarias** (reconocimiento, tiempo protegido, acceso a eventos, visibilidad). NO se implementa lógica de dinero/becas. Marcadas como placeholder. |
| **Plataforma** | Prototipo self-contained. Datos aislados tras `src/data/dataService.ts` (mocks) y `src/backend/usersService.ts` (BD) para que sean intercambiables. No se asume LMS, Google ni AKB. |
| **Estructura de rutas** | **Tronco común (niveles 1–2) + ramas por rol (3+)**. El rol es un selector (`tecnico` \| `no_tecnico`). |
| **Escala D1–D5** | 1–5 en el prototipo, parametrizable en `src/data/evaluation.json` (`escala`). |
| **Nombre** | "Explorador IA", en una constante: `NOMBRE_EXPERIENCIA` en `src/config/branding.ts`. |

## 8 · Stack del prototipo

- **React 19 + Vite + TypeScript + Tailwind CSS v4**
- **pnpm** como gestor de paquetes (migrado desde npm el 2026-09-28)
- **Vitest** para pruebas (agregado el 2026-09-28)
- Datos mock en `src/data/*.json` (levels, modules, ranking, rewards, evaluation)
- Estado global ligero (Context + `useReducer`) con persistencia en `localStorage`
- Supabase (Postgres) opcional para la tabla `usuarios` (nota de alcance)
- Componentes reutilizables; código legible y comentado en español

*(Propuesta de arranque, no decisión de plataforma.)*

## 9 · Guardrails (banca regulada)

- **Cero PII y cero datos reales** de colaboradores en mocks; todo es
  ficticio. (Los datos de un usuario que se identifica viven solo en Supabase —
  nota de alcance.)
- Nada de personajes con IP de terceros ni marcas ajenas en ilustraciones/íconos.
- Sin llamadas de red en tiempo de ejecución salvo Supabase; sin claves en el
  código.
- Trazabilidad real vs. placeholder: todo mock se comenta con `// PLACEHOLDER`.

## 10 · Orden de build (histórico)

El build se hizo por bloques, cada uno un commit `feat:` en el historial:

1. Scaffold Vite + TS + Tailwind; tokens de marca y flag de tema.
2. Layout base + HUD persistente (monedas/nivel/XP/racha).
3. Datos mock (`levels.json`, `modules.json`, `ranking.json`, `rewards.json`, `evaluation.json`).
4. Mapa de trayectoria (6 niveles) con estados bloqueado/activo/completado.
5. Detalle de nivel + lógica de completar módulo (otorga XP/monedas/sello).
6. Pasaporte del Explorador.
7. Autoevaluación de placement → asigna rango de entrada.
8. Ranking, Comunidad/Hackatón, Recompensas (placeholders).
9. Pulido visual contra `concepto-visual.png` + botón reiniciar progreso.

Después: arte de campaña del tema espacial y base de datos real de usuarios
(Supabase). Al cerrar cualquier cambio, el flujo completo debe seguir
navegable.
