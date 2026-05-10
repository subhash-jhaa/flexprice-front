import type { Meta, StoryObj } from '@storybook/react';
import InvoiceStatusBadge, { type InvoiceStatus } from './InvoiceStatusBadge';

const ALL_STATUSES: InvoiceStatus[] = ['paid', 'open', 'draft', 'uncollectible', 'void'];

const meta = {
	title: 'Molecules/InvoiceStatusBadge',
	component: InvoiceStatusBadge,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		status: { control: 'select', options: ALL_STATUSES },
	},
} satisfies Meta<typeof InvoiceStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { status: 'paid' } };

export const AllStatuses: Story = {
	args: { status: 'paid' },
	render: () => (
		<div className='flex flex-wrap gap-2'>
			{ALL_STATUSES.map((s) => (
				<InvoiceStatusBadge key={s} status={s} />
			))}
		</div>
	),
};

/** Forward-compatibility: unknown statuses fall back to a neutral chip. */
export const UnknownStatus: Story = { args: { status: 'processing' } };
