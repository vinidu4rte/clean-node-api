function sumOne (a: number): number {
  return a + 1
}

describe('testing sumOne function', () => {
  test('must return 2', () => {
    expect(sumOne(1)).toBe(2)
  })
})
