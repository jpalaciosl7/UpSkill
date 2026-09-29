# PerfilInicialForm — perfil del primer ingreso

Aparece en `/cuenta` cuando la cuenta ya inició sesión (enlace mágico) pero aún
no tiene fila en `usuarios`. Pide nombre, alias (opcional; sin alias se aparece
como "Explorador anónimo" en el Ranking) y rol. El correo sale de la sesión.

| Archivo | Qué hace |
|---|---|
| `PerfilInicialForm.tsx` | Vista del formulario (no renderiza sin sesión) |
| `usePerfilInicial.ts` | Estado de los campos y guardado con `crearPerfil` → `alPerfilCreado` |
| `SelectorRol.tsx` | Radios tipo píldora para el rol, accesibles con teclado |
| `index.ts` | API pública (`PerfilInicialForm`) |

**Pruebas:** sin pruebas de UI; la creación del perfil la protege la RLS
(verificada en `tmp/supabase-tools/rls_checks.sql`) y se prueba a mano con una
sesión real.
