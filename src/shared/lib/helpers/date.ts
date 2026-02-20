import {
  format,
  formatDistanceToNow,
  isToday,
  isYesterday,
  isThisWeek,
  differenceInDays,
  parseISO,
} from 'date-fns'
import { ru } from 'date-fns/locale'

/**
 * Format date as relative time with smart fallback.
 * - Today: "15 минут назад", "2 часа назад"
 * - Yesterday: "вчера, 14:30"
 * - This week: "понедельник, 14:30"
 * - Older: "15 июн 2025"
 */
export function formatRelativeDate(dateString: string): string {
  const date = parseISO(dateString)

  if (isToday(date)) {
    return formatDistanceToNow(date, { addSuffix: true, locale: ru })
  }

  if (isYesterday(date)) {
    return `вчера, ${format(date, 'HH:mm')}`
  }

  if (isThisWeek(date)) {
    return format(date, 'EEEE, HH:mm', { locale: ru })
  }

  const daysAgo = differenceInDays(new Date(), date)
  if (daysAgo < 365) {
    return format(date, 'd MMM', { locale: ru })
  }

  return format(date, 'd MMM yyyy', { locale: ru })
}

/**
 * Format date for display in tables and cards.
 * @example "15.06.2025 14:30"
 */
export function formatDateTime(dateString: string): string {
  return format(parseISO(dateString), 'dd.MM.yyyy HH:mm')
}

/**
 * Format date only (no time).
 * @example "15 июня 2025"
 */
export function formatDate(dateString: string): string {
  return format(parseISO(dateString), 'd MMMM yyyy', { locale: ru })
}

/**
 * Format as short date for compact displays.
 * @example "15 июн"
 */
export function formatShortDate(dateString: string): string {
  return format(parseISO(dateString), 'd MMM', { locale: ru })
}

/**
 * Format time only.
 * @example "14:30"
 */
export function formatTime(dateString: string): string {
  return format(parseISO(dateString), 'HH:mm')
}
