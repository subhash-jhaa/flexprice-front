import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent, within, expect } from '@storybook/test';
import { User, CreditCard, Globe } from 'lucide-react';
import Select from './Select';

const meta = {
	title: 'Atoms/Select',
	component: Select,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		disabled: { control: 'boolean' },
		isRadio: { control: 'boolean' },
		error: { control: 'text' },
	},
	args: { onChange: fn() },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const PLAN_OPTIONS = [
	{ label: 'Free', value: 'free' },
	{ label: 'Starter', value: 'starter' },
	{ label: 'Pro', value: 'pro' },
	{ label: 'Enterprise', value: 'enterprise' },
];

export const Default: Story = {
	args: { label: 'Billing Plan', options: PLAN_OPTIONS, required: true },
};

export const WithDescriptions: Story = {
	args: {
		label: 'Subscription Plan',
		options: [
			{ label: 'Free', value: 'free', description: 'Up to 1,000 events/month' },
			{ label: 'Pro', value: 'pro', description: 'Up to 5M events/month' },
			{ label: 'Enterprise', value: 'enterprise', description: 'Unlimited — custom pricing' },
		],
	},
};

export const WithIcons: Story = {
	args: {
		label: 'Settings Category',
		options: [
			{ label: 'Profile', value: 'profile', prefixIcon: <User className='size-4 mr-2' /> },
			{ label: 'Billing', value: 'billing', prefixIcon: <CreditCard className='size-4 mr-2' /> },
			{ label: 'Integrations', value: 'integrations', prefixIcon: <Globe className='size-4 mr-2' /> },
		],
	},
};

export const RadioStyle: Story = {
	args: {
		label: 'Billing Cadence',
		options: [
			{ label: 'Monthly', value: 'monthly' },
			{ label: 'Quarterly', value: 'quarterly' },
			{ label: 'Annually', value: 'annually' },
		],
		isRadio: true,
	},
};

export const WithError: Story = {
	args: { label: 'Region', options: PLAN_OPTIONS, error: 'Please select a region.' },
};

export const Disabled: Story = {
	args: { label: 'Plan', options: PLAN_OPTIONS, value: 'enterprise', disabled: true },
};

export const SelectInteraction: Story = {
	name: 'Interaction / Select an option',
	args: { label: 'Plan', options: PLAN_OPTIONS, placeholder: 'Pick a plan…' },
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('combobox'));
		const option = await within(document.body).findByText('Pro');
		await userEvent.click(option);
		await expect(args.onChange).toHaveBeenCalledWith('pro');
	},
};
