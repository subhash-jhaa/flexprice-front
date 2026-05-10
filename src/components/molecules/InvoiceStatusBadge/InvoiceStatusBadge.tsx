import React from 'react';
import Chip from '@/components/atoms/Chip/Chip';
import { CheckCircle2, Clock, AlertCircle, FileText, Ban } from 'lucide-react';

/** All possible status values for a FlexPrice invoice. */
export type InvoiceStatus = 'draft' | 'open' | 'paid' | 'uncollectible' | 'void';

type ChipVariant = 'default' | 'success' | 'warning' | 'failed' | 'info';

interface StatusConfig {
	variant: ChipVariant;
	icon: React.ReactNode;
	label: string;
}

const STATUS_CONFIG: Record<InvoiceStatus, StatusConfig> = {
	paid: {
		variant: 'success',
		icon: <CheckCircle2 className='size-3' />,
		label: 'Paid',
	},
	open: {
		variant: 'warning',
		icon: <Clock className='size-3' />,
		label: 'Open',
	},
	draft: {
		variant: 'info',
		icon: <FileText className='size-3' />,
		label: 'Draft',
	},
	uncollectible: {
		variant: 'failed',
		icon: <AlertCircle className='size-3' />,
		label: 'Uncollectible',
	},
	void: {
		variant: 'default',
		icon: <Ban className='size-3' />,
		label: 'Void',
	},
};

const VALID_STATUSES = new Set<string>(Object.keys(STATUS_CONFIG));

const getFallbackConfig = (status: string): StatusConfig => ({
	variant: 'default',
	icon: undefined,
	label: status.charAt(0).toUpperCase() + status.slice(1),
});

export interface InvoiceStatusBadgeProps {
	/** The raw invoice status string from the API (case-insensitive). */
	status: InvoiceStatus | string;
	/** Additional CSS classes forwarded to the underlying Chip. */
	className?: string;
}

/**
 * InvoiceStatusBadge maps a raw invoice status string to a semantically
 * coloured Chip with a matching icon. Accepts any string for forward-compat
 * with future API statuses, falling back to a neutral default chip.
 *
 * @example
 * <InvoiceStatusBadge status="paid" />
 * <InvoiceStatusBadge status="VOID" /> // case-insensitive
 */
const InvoiceStatusBadge: React.FC<InvoiceStatusBadgeProps> = ({ status, className }) => {
	const normalized = status.toLowerCase();
	const config = VALID_STATUSES.has(normalized) ? STATUS_CONFIG[normalized as InvoiceStatus] : getFallbackConfig(normalized);

	return <Chip variant={config.variant} label={config.label} icon={config.icon} className={className} />;
};

export default InvoiceStatusBadge;
