import { expect, test, describe } from 'vitest'
import { formatCurrency, formatDate, formatDateTime } from './format'

describe('Formatting Utilities', () => {
  test('formatCurrency should format numeric and string amounts as USD', () => {
    expect(formatCurrency(19.99)).toBe('$19.99')
    expect(formatCurrency('2500')).toBe('$2,500.00')
    expect(formatCurrency('invalid')).toBe('$0.00')
  })

  test('formatDate should format dates in long en-US format', () => {
    const testDate = new Date('2026-06-20T12:00:00')
    expect(formatDate(testDate)).toBe('June 20, 2026')
    expect(formatDate('')).toBe('')
  })

  test('formatDateTime should format dates with time elements', () => {
    const testDate = new Date('2026-06-20T12:30:00')
    const formatted = formatDateTime(testDate)
    expect(formatted).toContain('Jun 20, 2026')
    expect(formatDateTime('')).toBe('')
  })
})
