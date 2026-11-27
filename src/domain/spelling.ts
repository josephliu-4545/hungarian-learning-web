export function normalizeSpelling(value: string): string {
  return value.normalize('NFC').trim().replace(/\s+/g, ' ').toLocaleLowerCase('hu-HU')
}

export function isSpellingCorrect(input: string, target: string, alternatives: string[] = []): boolean {
  const normalized = normalizeSpelling(input)
  return [target, ...alternatives].some((answer) => normalizeSpelling(answer) === normalized)
}

export type CharacterDiff = { character: string; correct: boolean }

export function getCharacterDiff(input: string, target: string): CharacterDiff[] {
  const actual = [...normalizeSpelling(input)]
  const expected = [...normalizeSpelling(target)]
  const costs = Array.from({ length: actual.length + 1 }, (_, row) =>
    Array.from({ length: expected.length + 1 }, (_, column) => row ? (column ? 0 : row) : column),
  )
  for (let row = 1; row <= actual.length; row++) {
    for (let column = 1; column <= expected.length; column++) {
      costs[row][column] = Math.min(
        costs[row - 1][column] + 1,
        costs[row][column - 1] + 1,
        costs[row - 1][column - 1] + (actual[row - 1] === expected[column - 1] ? 0 : 1),
      )
    }
  }
  const result: CharacterDiff[] = []
  let row = actual.length, column = expected.length
  while (column > 0) {
    if (row > 0 && costs[row][column] === costs[row - 1][column - 1] + (actual[row - 1] === expected[column - 1] ? 0 : 1)) {
      result.unshift({ character: expected[column - 1], correct: actual[row - 1] === expected[column - 1] })
      row--; column--
    } else if (costs[row][column] === costs[row][column - 1] + 1) {
      result.unshift({ character: expected[column - 1], correct: false }); column--
    } else row--
  }
  return result
}

