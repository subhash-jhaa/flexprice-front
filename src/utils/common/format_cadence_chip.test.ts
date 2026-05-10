import { describe, it, expect } from 'vitest';
import formatCadenceChip from './format_cadence_chip';
import { CadenceStatus } from '@/types/common';

describe('formatCadenceChip', () => {
	it('formats ONCE correctly', () => {
		expect(formatCadenceChip(CadenceStatus.ONCE)).toBe('Once');
	});

	it('formats REPEAT correctly', () => {
		expect(formatCadenceChip(CadenceStatus.REPEAT)).toBe('Repeat');
	});

	it('formats FOREVER correctly', () => {
		expect(formatCadenceChip(CadenceStatus.FOREVER)).toBe('Forever');
	});

	it('defaults to Once for unknown values', () => {
		expect(formatCadenceChip('UNKNOWN_VALUE' as any)).toBe('Once');
	});
});
