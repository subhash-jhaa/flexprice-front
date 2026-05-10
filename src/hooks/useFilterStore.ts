import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';

type FilterValue = string | number | boolean | string[] | undefined;

interface FilterState {
	filters: Record<string, FilterValue>;
	setFilter: (key: string, value: FilterValue) => void;
	resetFilters: () => void;
	getFilters: () => Record<string, FilterValue>;
}

import { type StoreApi, type UseBoundStore } from 'zustand';

// Cache to ensure we don't recreate the store for the same namespace on every render
const storeCache: Record<string, UseBoundStore<StoreApi<FilterState>>> = {};

function createNamespaceStore(namespace: string) {
	if (!storeCache[namespace]) {
		storeCache[namespace] = create<FilterState>()(
			persist(
				(set, get) => ({
					filters: {},
					setFilter: (key, value) => {
						set((state) => {
							const newFilters = { ...state.filters };
							if (value === undefined || value === '') {
								delete newFilters[key];
							} else {
								newFilters[key] = value;
							}
							return { filters: newFilters };
						});
					},
					resetFilters: () => set({ filters: {} }),
					getFilters: () => get().filters,
				}),
				{
					name: `filters:${namespace}`,
					storage: createJSONStorage(() => sessionStorage),
				},
			),
		);
	}
	return storeCache[namespace];
}

/**
 * Challenge A: Filter Persistence
 *
 * Persists filters in sessionStorage keyed by namespace.
 * Syncs a shallow fingerprint to the URL (count of active filters)
 * so it avoids URL bloat but is somewhat trackable.
 */
export function useFilterStore(namespace: string) {
	const useStore = useMemo(() => createNamespaceStore(namespace), [namespace]);
	const store = useStore((state) => state);

	const [searchParams, setSearchParams] = useSearchParams();
	const activeCount = Object.keys(store.filters).length;

	useEffect(() => {
		const currentF = searchParams.get('f');
		const newF = String(activeCount);

		if (activeCount > 0 && currentF !== newF) {
			searchParams.set('f', newF);
			setSearchParams(searchParams, { replace: true });
		} else if (activeCount === 0 && searchParams.has('f')) {
			searchParams.delete('f');
			setSearchParams(searchParams, { replace: true });
		}
	}, [activeCount, searchParams, setSearchParams]);

	return store;
}
