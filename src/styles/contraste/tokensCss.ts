/**
 * tokensCss.ts — extrae los tokens de color (`--color-*: valor;`) de un
 * archivo de tokens de tema, resolviendo referencias `var(--color-otro)`.
 */

/**
 * Lee los tokens de color de un CSS de tema.
 * @param css contenido de src/styles/tokens/<tema>.css
 * @returns mapa nombre (sin `--color-`) → valor de color ya resuelto
 */
export function leerTokensColor(css: string): Record<string, string> {
  const crudos: Record<string, string> = {}
  for (const [, nombre, valor] of css.matchAll(/--color-([\w-]+)\s*:\s*([^;]+);/g)) {
    crudos[nombre] = valor.replace(/\/\*.*?\*\//g, '').trim()
  }
  const resolver = (valor: string, profundidad = 0): string => {
    const referencia = valor.match(/^var\(--color-([\w-]+)\)$/)
    if (!referencia || profundidad > 5) return valor
    return resolver(crudos[referencia[1]] ?? valor, profundidad + 1)
  }
  return Object.fromEntries(Object.entries(crudos).map(([nombre, valor]) => [nombre, resolver(valor)]))
}
