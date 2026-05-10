import React, { useState, useEffect, useRef, useCallback } from 'react';
import Input from '@/components/atoms/Input/Input';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SearchBarProps {
	/** Callback fired after the debounce period when the search value changes. */
	onSearch: (value: string) => void;
	/** Placeholder text for the search input. */
	placeholder?: string;
	/** Debounce delay in milliseconds before `onSearch` is called. @default 300 */
	debounceMs?: number;
	/** Additional CSS classes for the wrapper div. */
	className?: string;
	/** Pre-populate the search field with an initial value. */
	initialValue?: string;
}

/**
 * SearchBar is a debounced search input with a built-in clear button.
 * The `onSearch` callback is only fired after the user stops typing for `debounceMs`.
 *
 * @example
 * <SearchBar
 *   placeholder="Search customers..."
 *   onSearch={(query) => fetchCustomers(query)}
 *   debounceMs={300}
 * />
 */
const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = 'Search...', debounceMs = 300, className, initialValue = '' }) => {
	const [value, setValue] = useState(initialValue);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	// Sync with external initialValue changes (e.g. URL-driven filters)
	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	// Stable reference to onSearch so the debounce timer sees the latest version
	const onSearchRef = useRef(onSearch);
	useEffect(() => {
		onSearchRef.current = onSearch;
	}, [onSearch]);

	const handleChange = useCallback(
		(newValue: string) => {
			setValue(newValue);

			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}

			timerRef.current = setTimeout(() => {
				onSearchRef.current(newValue);
			}, debounceMs);
		},
		[debounceMs],
	);

	const handleClear = useCallback(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}
		setValue('');
		onSearchRef.current('');
	}, []);

	// Cleanup timer on unmount
	useEffect(() => {
		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, []);

	return (
		<div className={cn('relative w-full max-w-sm', className)}>
			<Input
				value={value}
				onChange={handleChange}
				placeholder={placeholder}
				inputPrefix={<Search className='size-4 text-muted-foreground' />}
				suffix={
					value ? (
						<button
							type='button'
							onClick={handleClear}
							className='rounded-full p-1 transition-colors hover:bg-muted'
							aria-label='Clear search'>
							<X className='size-3 text-muted-foreground' />
						</button>
					) : undefined
				}
			/>
		</div>
	);
};

export default SearchBar;
