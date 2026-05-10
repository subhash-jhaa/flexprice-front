import { describe, it, expect } from 'vitest';
import formatNumber from './format_number';

describe('formatNumber', () => {
	it('formats basic numbers correctly', () => {
		expect(formatNumber(1250)).toBe('1,250');
	});

	it('respects decimal places', () => {
		expect(formatNumber(1250.5, 2)).toBe('1,250.50');
		expect(formatNumber(1250.556, 2)).toBe('1,250.56'); // rounds
	});

	it('handles zero correctly', () => {
		// formatNumber handles truthiness for 0 awkwardly with !value ? '-' : ...
		// Wait, looking at the code `if (!value) return '-'` will return '-' for 0.
		// Let's test that behavior as written in the utility.
		expect(formatNumber(0)).toBe('-');
	});

	it('handles missing or falsy values', () => {
		expect(formatNumber(null as any)).toBe('-');
		expect(formatNumber(undefined as any)).toBe('-');
	});
});
