import { describe, it, expect } from 'vitest';
import { createQueryConfig, QUERY_PRESETS } from './queryConfig';

describe('createQueryConfig', () => {
	it('should return DEFAULT preset when no arguments are provided', () => {
		const config = createQueryConfig();
		expect(config.staleTime).toBe(QUERY_PRESETS.DEFAULT.staleTime);
		expect(config.gcTime).toBe(QUERY_PRESETS.DEFAULT.gcTime);
	});

	it('should apply REALTIME preset correctly', () => {
		const config = createQueryConfig('REALTIME');
		expect(config.staleTime).toBe(0);
		expect(config.gcTime).toBe(5 * 60 * 1000);
	});

	it('should apply STATIC preset correctly', () => {
		const config = createQueryConfig('STATIC');
		expect(config.staleTime).toBe(30 * 60 * 1000);
		expect(config.gcTime).toBe(60 * 60 * 1000);
	});

	it('should allow overrides to take precedence over presets', () => {
		const config = createQueryConfig('DEFAULT', {
			staleTime: 12345,
			enabled: false,
		});

		expect(config.staleTime).toBe(12345); // overridden
		expect(config.gcTime).toBe(QUERY_PRESETS.DEFAULT.gcTime); // inherited from default
		expect(config.enabled).toBe(false); // added
	});
});
