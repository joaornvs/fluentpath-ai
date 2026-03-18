export function getLevelData(xp = 0) {
  let level = 1, acc = 0
  while (acc + level * 100 <= xp) { acc += level * 100; level++ }
  const current = xp - acc, needed = level * 100
  return { level, current, needed, pct: Math.round((current / needed) * 100) }
}

export function getInitials(nome = '') {
  return nome.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?'
}

export const LEVEL_TITLES = [
  [1, 'Curioso de Plantão'], [5, 'Leitor de Documentação'],
  [10, 'Stackoverflower'], [15, 'Debug Master'],
  [20, 'Pip Install Tudo'], [30, 'Arquiteto de Notebooks'],
  [40, 'Senior do Discord'], [50, 'Lenda do Terminal'],
  [75, 'Principal Engineer'], [100, 'Deus do Git'],
]

export function getLevelTitle(level) {
  let t = LEVEL_TITLES[0][1]
  for (const [l, n] of LEVEL_TITLES) { if (level >= l) t = n }
  return t
}
