import type { Meta, StoryObj } from '@storybook/react';
import MetricCard from './MetricCard';

const meta = {
	title: 'Molecules/MetricCard',
	component: MetricCard,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		value: { control: 'number' },
		isPercent: { control: 'boolean' },
		showChangeIndicator: { control: 'boolean' },
		isNegative: { control: 'boolean' },
	},
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { title: 'Total Revenue', value: 125430.5, currency: 'USD', showChangeIndicator: true },
};

export const AllCards: Story = {
	args: { title: 'Not used directly', value: 0 },
	render: () => (
		<div className='grid grid-cols-2 gap-4 w-[600px]'>
			<MetricCard title='Total Revenue' value={125430.5} currency='USD' showChangeIndicator />
			<MetricCard title='Active Subscriptions' value={1240} showChangeIndicator />
			<MetricCard title='Churn Rate' value={2.4} isPercent showChangeIndicator isNegative />
			<MetricCard title='ARPU' value={85.0} currency='USD' />
		</div>
	),
};
