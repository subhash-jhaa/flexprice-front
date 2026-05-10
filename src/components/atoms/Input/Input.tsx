import * as React from 'react';
import { cn } from '@/lib/utils';
import Label from '../Label';
import { sizes, SizeVariant } from '@/lib/sizing';

type InputVariant = 'text' | 'number' | 'formatted-number' | 'integer';

interface NumberFormatOptions {
	allowNegative?: boolean;
	allowDecimals?: boolean;
	thousandSeparator: string;
	decimalSeparator: string;
}

const DEFAULT_FORMAT_OPTIONS: NumberFormatOptions = {
	allowNegative: false,
	allowDecimals: true,
	thousandSeparator: ',',
	decimalSeparator: '.',
};

export const formatAmount = (amount: string, options: NumberFormatOptions = DEFAULT_FORMAT_OPTIONS): string => {
	if (!amount) return '';

	const { allowNegative, allowDecimals, thousandSeparator, decimalSeparator } = {
		...DEFAULT_FORMAT_OPTIONS,
		...options,
	};

	// Handle negative numbers
	const isNegative = allowNegative && amount.startsWith('-');
	const absAmount = isNegative ? amount.slice(1) : amount;

	const parts = absAmount.split(decimalSeparator);
	const integerPart = parts[0] || '';
	const decimalPart = parts[1];

	// Format integer part with separators
	const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);

	// Combine parts
	let result = formattedInteger;
	if (allowDecimals && decimalPart !== undefined) {
		result += decimalSeparator + decimalPart;
	}

	return isNegative ? '-' + result : result;
};

export const removeFormatting = (amount: string, options: NumberFormatOptions = DEFAULT_FORMAT_OPTIONS): string => {
	const { thousandSeparator } = { ...DEFAULT_FORMAT_OPTIONS, ...options };
	const escapedSeparator = thousandSeparator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	return amount.replace(new RegExp(escapedSeparator, 'g'), '');
};

const getInputPattern = (variant: InputVariant, options: NumberFormatOptions = DEFAULT_FORMAT_OPTIONS): RegExp => {
	const { allowNegative, allowDecimals, decimalSeparator } = { ...DEFAULT_FORMAT_OPTIONS, ...options };

	switch (variant) {
		case 'integer':
			return allowNegative ? /^-?\d*$/ : /^\d*$/;
		case 'number':
		case 'formatted-number':
			return allowNegative
				? new RegExp(`^-?\\d*${allowDecimals ? `\\${decimalSeparator}?\\d*` : ''}$`)
				: new RegExp(`^\\d*${allowDecimals ? `\\${decimalSeparator}?\\d*` : ''}$`);
		default:
			return /.*/;
	}
};

/**
 * Input component for text and number entry.
 * Supports various variants like formatted-number, integer, and standard text.
 *
 * @example
 * <Input label="Amount" variant="formatted-number" onChange={(val) => console.log(val)} />
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
	/** Label text for the input */
	label?: string;
	/** Description text below the input */
	description?: React.ReactNode;
	/** Error message to display below the input */
	error?: string;
	/** Standard HTML input type */
	type?: React.HTMLInputTypeAttribute;
	/** Change handler that receives the raw value */
	onChange?: (value: string) => void;
	/** Whether the input is disabled */
	disabled?: boolean;
	/** Element to display after the input (e.g. icon or unit) */
	suffix?: React.ReactNode;
	/** Additional CSS classes */
	className?: string;
	/** Placeholder text */
	placeholder?: string;
	/** Unique ID for the input */
	id?: string;
	/** Element to display before the input (e.g. currency symbol) */
	inputPrefix?: React.ReactNode;
	/** Additional CSS classes for the label */
	labelClassName?: string;
	/** Input variant for special behavior (formatting) */
	variant?: InputVariant;
	/** Options for number formatting */
	formatOptions?: NumberFormatOptions;
	/** Size variant */
	size?: SizeVariant;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			type,
			label,
			description,
			error,
			onChange,
			disabled,
			placeholder,
			suffix,
			id,
			value,
			inputPrefix,
			labelClassName,
			variant = 'text',
			size = 'default',
			formatOptions = DEFAULT_FORMAT_OPTIONS,
			...props
		},
		ref,
	) => {
		const inputRef = React.useRef<HTMLInputElement | null>(null);
		const [cursorPosition, setCursorPosition] = React.useState<number | null>(null);

		const isFormattedVariant = variant === 'formatted-number' || variant === 'integer';
		const pattern = React.useMemo(() => getInputPattern(variant, formatOptions), [variant, formatOptions]);

		// Handle cursor position after formatting
		React.useEffect(() => {
			if (cursorPosition !== null && inputRef.current) {
				inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
				setCursorPosition(null);
			}
		}, [cursorPosition]);

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			let newValue = e.target.value;
			const oldValue = (value as string) || '';
			const currentCursorPosition = e.target.selectionStart || 0;

			// For number variants, validate and format
			if (variant !== 'text') {
				// Remove formatting before validation
				if (isFormattedVariant) {
					newValue = removeFormatting(newValue, formatOptions);
				}

				// Validate against pattern
				if (!pattern.test(newValue)) {
					return;
				}

				// Handle cursor position for formatted variants
				if (isFormattedVariant) {
					const oldFormatCharCount = (oldValue.slice(0, currentCursorPosition).match(/,/g) || []).length;
					const newFormatCharCount = (formatAmount(newValue, formatOptions).slice(0, currentCursorPosition).match(/,/g) || []).length;
					const cursorAdjustment = newFormatCharCount - oldFormatCharCount;
					setCursorPosition(currentCursorPosition + cursorAdjustment);
				}
			}

			if (onChange) {
				onChange(newValue);
			}
		};

		const getValue = () => {
			if (isFormattedVariant && value) {
				return formatAmount(value as string, {
					...formatOptions,
					allowDecimals: variant !== 'integer',
				});
			}
			return value;
		};

		return (
			<div className='space-y-1 w-full flex flex-col'>
				{/* Label */}
				{label && <Label label={label} disabled={disabled} labelClassName={labelClassName} htmlFor={id} />}
				{/* Input */}
				<div
					className={cn(
						sizes[size].height,
						sizes[size].padding,
						sizes[size].text,
						sizes[size].display,
						'w-full flex h-full group items-center rounded-[6px] border bg-background ring-offset-background placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed',
						error ? 'border-destructive' : 'border-input focus-within:ring-ring focus-within:ring-offset-2',
						'focus-within:border-black',
						className,
					)}>
					{inputPrefix && <div className='mr-2'>{inputPrefix}</div>}
					<input
						{...props}
						id={id}
						type={type}
						value={getValue()}
						disabled={disabled}
						placeholder={placeholder}
						className={cn(
							'peer relative min-h-0 min-w-0 flex-1 bg-transparent outline-none ring-0 focus:outline-none placeholder:text-muted-foreground',
							disabled && 'text-zinc-500',
							className,
						)}
						onChange={handleChange}
						ref={(element) => {
							inputRef.current = element;
							if (typeof ref === 'function') {
								ref(element);
							} else if (ref) {
								ref.current = element;
							}
						}}
					/>
					{suffix && (
						<div className='ml-2 flex shrink-0 items-center self-stretch pl-2 text-sm tabular-nums leading-none text-muted-foreground'>
							{suffix}
						</div>
					)}
				</div>
				{/* Description */}
				{description && <p className={cn('text-sm', disabled ? 'text-zinc-500' : 'text-muted-foreground')}>{description}</p>}
				{/* Error Message */}
				{error && <p className='text-sm text-destructive'>{error}</p>}
			</div>
		);
	},
);

Input.displayName = 'Input';

export default Input;
