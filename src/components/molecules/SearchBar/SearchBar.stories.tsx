import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent, within, expect } from '@storybook/test';
import SearchBar from './SearchBar';

const meta = {
	title: 'Molecules/SearchBar',
	component: SearchBar,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		debounceMs: { control: { type: 'number', min: 0, max: 2000, step: 50 } },
		placeholder: { control: 'text' },
	},
	args: { onSearch: fn() },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { placeholder: 'Search customers…' },
};

export const WithInitialValue: Story = {
	args: { initialValue: 'John Doe' },
};

export const SearchAndClear: Story = {
	name: 'Interaction / Type then clear',
	args: { placeholder: 'Search invoices…' },
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByPlaceholderText('Search invoices…');

		await userEvent.type(input, 'INV-001');
		await expect(input).toHaveValue('INV-001');

		// Wait for debounce
		await new Promise((r) => setTimeout(r, 400));
		await expect(args.onSearch).toHaveBeenCalledWith('INV-001');

		// Clear
		await userEvent.click(canvas.getByLabelText('Clear search'));
		await expect(input).toHaveValue('');
		await expect(args.onSearch).toHaveBeenCalledWith('');
	},
};
