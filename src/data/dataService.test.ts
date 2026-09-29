/**
 * dataService.test.ts — invariantes de los datos mock que la app da por ciertos.
 * Si cambias levels.json / modules.json / evaluation.json y algo aquí falla,
 * la mecánica de progresión (CLAUDE.md §4–§5) dejó de ser coherente.
 */
import { describe, expect, it } from 'vitest'
import { getLevels, getModulesByLevel, getRewards, resolverUmbralPorPuntaje } from './dataService'

describe('niveles y módulos', () => {
  it('hay 6 niveles ordenados de 1 a 6', () => {
    expect(getLevels().map((nivel) => nivel.id)).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('cada nivel tiene entre 3 y 5 módulos y sus moduloIds coinciden con modules.json', () => {
    for (const nivel of getLevels()) {
      const ids = getModulesByLevel(nivel.id).map((modulo) => modulo.id)
      expect(ids.length).toBeGreaterThanOrEqual(3)
      expect(ids.length).toBeLessThanOrEqual(5)
      expect(ids).toEqual(nivel.moduloIds)
    }
  })

  it('xpObjetivo de cada nivel es la suma del XP de sus módulos', () => {
    for (const nivel of getLevels()) {
      const suma = getModulesByLevel(nivel.id).reduce((total, modulo) => total + modulo.xp, 0)
      expect(suma).toBe(nivel.xpObjetivo)
    }
  })

  it('métrica dual: en cada nivel un módulo "aplica" vale más XP que cualquier "aprende"', () => {
    for (const nivel of getLevels()) {
      const modulos = getModulesByLevel(nivel.id)
      const maxAprende = Math.max(0, ...modulos.filter((m) => m.tipo === 'aprende').map((m) => m.xp))
      for (const aplica of modulos.filter((m) => m.tipo === 'aplica')) {
        expect(aplica.xp).toBeGreaterThan(maxAprende)
      }
    }
  })
})

describe('recompensas', () => {
  it('todas son placeholder no monetario', () => {
    for (const recompensa of getRewards()) {
      expect(recompensa.placeholder).toBe(true)
      expect(['reconocimiento', 'tiempo_protegido', 'acceso_eventos', 'visibilidad']).toContain(recompensa.categoria)
    }
  })
})

describe('resolverUmbralPorPuntaje', () => {
  it('mapea los extremos de la escala al primer y último rango', () => {
    expect(resolverUmbralPorPuntaje(5).rango).toBe('Novato')
    expect(resolverUmbralPorPuntaje(25).rango).toBe('Experto')
  })

  it('un puntaje fuera de rango cae en el extremo más cercano', () => {
    expect(resolverUmbralPorPuntaje(0).rango).toBe('Novato')
    expect(resolverUmbralPorPuntaje(99).rango).toBe('Experto')
  })
})
