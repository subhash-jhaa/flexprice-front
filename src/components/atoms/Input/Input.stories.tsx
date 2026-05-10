import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent, within, expect } from '@storybook/test';
import { DollarSign, Search } from 'lucide-react';
import Input from './Input';

const meta = {
	title: 'Atoms/Input',
	component: Input,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		variant: { control: 'select', options: ['text', 'number', 'formatted-number', 'integer'] },
		size: { control: 'select', options: ['xs', 'sm', 'default', 'lg'] },
		disabled: { control: 'boolean' },
		error: { control: 'text' },
	},
	args: { onChange: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { label: 'Display Name', placeholder: 'e.g. Acme Corp' },
};

export const WithError: Story = {
	args: { label: 'Email', placeholder: 'you@company.com', error: 'Enter a valid email address.' },
};

export const Disabled: Story = {
	args: { label: 'Customer ID', value: 'cust_01HXF3JKQZ9A', disabled: true },
};

export const CurrencyAmount: Story = {
	args: {
		label: 'Unit Price',
		variant: 'formatted-number',
		placeholder: '0.00',
		inputPrefix: <DollarSign className='size-4 text-muted-foreground' />,
		suffix: <span className='text-sm text-muted-foreground'>USD</span>,
	},
};

export const SearchField: Story = {
	args: {
		placeholder: 'Search plans…',
		inputPrefix: <Search className='size-4 text-muted-foreground' />,
	},
};

export const TypingInteraction: Story = {
	name: 'Interaction / Typing fires onChange',
	args: { label: 'Name', placeholder: 'Type here…' },
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByPlaceholderText('Type here…');
		await userEvent.type(input, 'Acme Corp');
		await expect(input).toHaveValue('Acme Corp');
		await expect(args.onChange).toHaveBeenCalled();
	},
};
