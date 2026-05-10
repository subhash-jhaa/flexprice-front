import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent, within, expect } from '@storybook/test';
import { Check, Clock, AlertCircle, Info } from 'lucide-react';
import Chip from './Chip';

const meta = {
	title: 'Atoms/Chip',
	component: Chip,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		variant: { control: 'select', options: ['default', 'success', 'warning', 'failed', 'info'] },
		disabled: { control: 'boolean' },
		label: { control: 'text' },
		bgColor: { control: 'color' },
		textColor: { control: 'color' },
	},
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: 'Archived', variant: 'default' } };

export const AllVariants: Story = {
	render: () => (
		<div className='flex flex-wrap gap-2'>
			<Chip label='Active' variant='success' icon={<Check className='size-3' />} />
			<Chip label='Pending' variant='warning' icon={<Clock className='size-3' />} />
			<Chip label='Overdue' variant='failed' icon={<AlertCircle className='size-3' />} />
			<Chip label='Draft' variant='info' icon={<Info className='size-3' />} />
			<Chip label='Archived' variant='default' />
		</div>
	),
};

export const Disabled: Story = { args: { label: 'Unavailable', disabled: true } };

export const ClickInteraction: Story = {
	name: 'Interaction / Click',
	args: { label: 'Click me', onClick: fn() },
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button'));
		await expect(args.onClick).toHaveBeenCalledTimes(1);
	},
};
