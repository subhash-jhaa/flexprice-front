import type { UseQueryOptions } from '@tanstack/react-query';

export const QUERY_PRESETS = {
	REALTIME: {
		staleTime: 0,
		gcTime: 5 * 60 * 1000, // 5 minutes
	},
	DEFAULT: {
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	},
	STATIC: {
		staleTime: 30 * 60 * 1000, // 30 minutes
		gcTime: 60 * 60 * 1000, // 60 minutes
	},
} as const;

export type QueryPreset = keyof typeof QUERY_PRESETS;

/**
 * Challenge C: Configurable TanStack Query Caching
 *
 * Provides a standardized way to construct query options with consistent
 * caching behaviours to avoid scattered default configurations across the app.
 */
export function createQueryConfig<
	TQueryFnData = unknown,
	TError = Error,
	TData = TQueryFnData,
	TQueryKey extends readonly unknown[] = readonly unknown[],
>(
	preset: QueryPreset = 'DEFAULT',
	overrides?: Partial<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>>,
): UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> {
	const baseConfig = QUERY_PRESETS[preset];

	// @ts-expect-error Types are complex but object spreading works dynamically
	return {
		...baseConfig,
		...overrides,
	};
}
