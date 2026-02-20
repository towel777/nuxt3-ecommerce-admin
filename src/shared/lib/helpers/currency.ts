const RUB_FORMATTER = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

const RUB_COMPACT_FORMATTER = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  notation: 'compact',
  compactDisplay: 'short',
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
})

/**
 * Format a number as Russian Ruble currency.
 * @example formatCurrency(1500)    // "1 500 ₽"
 * @example formatCurrency(1234.5)  // "1 234,50 ₽"
 */
export function formatCurrency(amount: number): string {
  return RUB_FORMATTER.format(amount)
}

/**
 * Format large numbers in compact notation.
 * @example formatCurrencyCompact(1_500_000) // "1,5 млн ₽"
 * @example formatCurrencyCompact(50_000)    // "50 тыс. ₽"
 */
export function formatCurrencyCompact(amount: number): string {
  return RUB_COMPACT_FORMATTER.format(amount)
}

/**
 * Calculate percentage change between two values.
 * @returns Object with value and formatted string
 */
export function calculateChange(
  current: number,
  previous: number,
): { value: number; formatted: string; isPositive: boolean } {
  if (previous === 0) {
    return { value: 0, formatted: '—', isPositive: true }
  }

  const change = ((current - previous) / previous) * 100
  const isPositive = change >= 0

  return {
    value: change,
    formatted: `${isPositive ? '+' : ''}${change.toFixed(1)}%`,
    isPositive,
  }
}
