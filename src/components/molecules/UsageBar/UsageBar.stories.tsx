import type { Meta, StoryObj } from '@storybook/react';
import UsageBar from './UsageBar';

const meta = {
	title: 'Molecules/UsageBar',
	component: UsageBar,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		used: { control: { type: 'number', min: 0 } },
		entitled: { control: { type: 'number', min: 1 } },
		unit: { control: 'text' },
	},
} satisfies Meta<typeof UsageBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { label: 'Storage', used: 450, entitled: 1000, unit: 'GB' },
};

/** Crosses the 75% warning threshold — bar turns orange. */
export const Warning: Story = {
	args: { label: 'API Calls', used: 8200, entitled: 10000, unit: 'calls' },
};

/** Crosses the 90% danger threshold — bar turns red. */
export const Danger: Story = {
	args: { label: 'Compute Credits', used: 95, entitled: 100, unit: 'credits' },
};

export const EntitlementsDashboard: Story = {
	name: 'In Context / Entitlements panel',
	args: { label: 'dummy', used: 0, entitled: 1 },
	render: () => (
		<div className='w-[420px] space-y-5 rounded-lg border bg-white p-5'>
			<h3 className='text-sm font-semibold text-foreground'>Resource Usage</h3>
			<UsageBar label='Monthly Active Users' used={4500} entitled={5000} unit='users' />
			<UsageBar label='Database Rows' used={120000} entitled={1000000} unit='rows' />
			<UsageBar label='Edge Function Calls' used={94} entitled={100} unit='calls' />
		</div>
	),
};
