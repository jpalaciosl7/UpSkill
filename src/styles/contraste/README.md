# src/styles/contraste — accesibilidad de los temas

Prueba automática de que **los dos temas** cumplen WCAG AA: 4.5:1 para texto y
3:1 para bordes que delimitan, íconos y elementos gráficos.

| Archivo | Qué hace |
|---|---|
| `paresTema.ts` | El contrato: qué pares de tokens (frente / fondo) deben cumplir qué mínimo |
| `tokensCss.ts` | Lee los `--color-*` de un archivo de tokens y resuelve `var(...)` |
| `color.ts` | Interpreta hex/rgb/rgba y compone colores translúcidos sobre el fondo |
| `wcag.ts` | Luminancia relativa y relación de contraste; `MINIMO_TEXTO`, `MINIMO_GRAFICO` |
| `contraste.test.ts` | Recorre los pares en cada tema leyendo los archivos reales de `../tokens/` |

Los fondos translúcidos se evalúan compuestos sobre `--color-bg`, como se ven
en pantalla. La prueba lee los CSS con `node:fs` porque Vitest vacía los
imports `?raw` de CSS.

**Ejecutar:** `pnpm exec vitest run src/styles`.
