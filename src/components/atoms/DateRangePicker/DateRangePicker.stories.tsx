import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { subDays, addDays } from 'date-fns';
import DateRangePicker from './DateRangePicker';

const meta = {
	title: 'Molecules/DateRangePicker',
	component: DateRangePicker,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		disabled: { control: 'boolean' },
		title: { control: 'text' },
		placeholder: { control: 'text' },
	},
	args: { onChange: fn() },
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { title: 'Date Range', placeholder: 'Select dates…' },
};

export const Preselected: Story = {
	args: {
		title: 'Last 7 Days',
		startDate: subDays(new Date(), 7),
		endDate: new Date(),
	},
};

export const Disabled: Story = {
	args: {
		title: 'Period (locked)',
		startDate: subDays(new Date(), 30),
		endDate: new Date(),
		disabled: true,
	},
};

export const FutureDatesOnly: Story = {
	args: {
		title: 'Schedule Window',
		minDate: new Date(),
		maxDate: addDays(new Date(), 90),
	},
};
