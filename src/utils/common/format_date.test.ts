import { describe, it, expect } from 'vitest';
import formatDate, { formatBillingPeriodDate } from './format_date';

describe('format_date utilities', () => {
	it('formatDate formats valid date correctly', () => {
		// Mock timezone or just check the structure.
		// For consistency, we pass an explicit timezone if needed, but the default format is 'Jan 01, 2024'
		const result = formatDate('2024-01-01T12:00:00Z', 'en-US');
		expect(result).toMatch(/Jan 1, 2024|Jan 01, 2024/);
	});

	it('formatDate handles invalid dates gracefully', () => {
		expect(formatDate('not-a-date')).toBe('Invalid Date');
	});

	it('formatBillingPeriodDate uses UTC consistently', () => {
		// 23:00 UTC should not roll over to the next day regardless of local timezone
		expect(formatBillingPeriodDate('2024-01-01T23:00:00.000Z')).toBe('1 Jan');
	});
});
