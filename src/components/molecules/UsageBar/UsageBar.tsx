import React from 'react';
import Progress from '@/components/atoms/Progress/Progress';
import { cn } from '@/lib/utils';

interface Thresholds {
	/** Percentage (0-100) at which the bar turns orange. @default 75 */
	warning?: number;
	/** Percentage (0-100) at which the bar turns red. @default 90 */
	danger?: number;
}

export interface UsageBarProps {
	/** Human-readable label describing the metered resource. */
	label: string;
	/** Current consumed amount. */
	used: number;
	/** Maximum allowed amount (entitlement). */
	entitled: number;
	/** Unit label appended to the usage figures (e.g. "GB", "calls"). */
	unit?: string;
	/** Additional CSS classes for the root element. */
	className?: string;
	/** Percentage thresholds for colour changes. */
	thresholds?: Thresholds;
}

const DEFAULT_THRESHOLDS: Required<Thresholds> = {
	warning: 75,
	danger: 90,
};

/**
 * UsageBar renders a labelled progress bar showing consumed vs entitled usage.
 * The indicator colour changes automatically at configurable warning/danger thresholds.
 *
 * @example
 * <UsageBar label="API Requests" used={8500} entitled={10000} unit="req" />
 */
const UsageBar: React.FC<UsageBarProps> = ({ label, used, entitled, unit = '', className, thresholds = {} }) => {
	const { warning: warnAt, danger: dangerAt } = {
		...DEFAULT_THRESHOLDS,
		...thresholds,
	};

	// Guard against divide-by-zero
	const percentage = entitled > 0 ? Math.min(Math.round((used / entitled) * 100), 100) : 0;

	const indicatorColor = percentage >= dangerAt ? 'bg-destructive' : percentage >= warnAt ? 'bg-orange-500' : 'bg-primary';

	const valueColor = percentage >= dangerAt ? 'text-destructive' : percentage >= warnAt ? 'text-orange-500' : 'text-primary';

	return (
		<div className={cn('w-full space-y-1.5', className)}>
			<label className='text-sm font-medium text-foreground'>{label}</label>

			<Progress value={percentage} indicatorColor={indicatorColor} className='h-2' />

			<div className='flex items-center justify-between'>
				<span className='text-xs text-muted-foreground'>
					{used.toLocaleString()} / {entitled.toLocaleString()}
					{unit ? ` ${unit}` : ''}
				</span>
				<span className={cn('text-xs font-semibold', valueColor)}>{percentage}%</span>
			</div>
		</div>
	);
};

export default UsageBar;
