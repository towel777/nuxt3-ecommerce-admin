/**
 * Low-level export utilities used by useExport composable.
 * Handles data transformation and file download triggering.
 */

/**
 * Get a nested value from an object using dot notation.
 * @example getNestedValue({ customer: { name: 'Иван' } }, 'customer.name') → 'Иван'
 */
export function getNestedValue(obj: unknown, path: string): unknown {
  return path.split('.').reduce((acc: any, key) => acc?.[key], obj)
}

/**
 * Trigger a browser file download from a Blob.
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Escape a CSV cell value.
 * Wraps in quotes if it contains commas, quotes, or newlines.
 */
export function escapeCsvCell(value: unknown): string {
  const str = value === null || value === undefined ? '' : String(value)
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

/**
 * Build a CSV string from rows (2D array).
 * Prepends UTF-8 BOM for Excel compatibility.
 */
export function buildCsvString(rows: (string | number)[][]): string {
  const content = rows
    .map((row) => row.map(escapeCsvCell).join(','))
    .join('\n')
  return '\uFEFF' + content
}
