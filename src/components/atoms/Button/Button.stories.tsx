import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent, within, expect } from '@storybook/test';
import { Mail, Trash2 } from 'lucide-react';
import Button from './Button';

const meta = {
	title: 'Atoms/Button',
	component: Button,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		variant: { control: 'select', options: ['default', 'black', 'destructive', 'outline', 'secondary', 'ghost', 'link'] },
		size: { control: 'select', options: ['xs', 'sm', 'default', 'lg', 'icon'] },
		isLoading: { control: 'boolean' },
		disabled: { control: 'boolean' },
	},
	args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'Save Changes' } };
export const Secondary: Story = { args: { children: 'Cancel', variant: 'secondary' } };
export const Outline: Story = { args: { children: 'Export', variant: 'outline' } };
export const Ghost: Story = { args: { children: 'More Options', variant: 'ghost' } };

export const Destructive: Story = {
	args: { children: 'Delete Plan', variant: 'destructive', prefixIcon: <Trash2 className='size-4' /> },
};

export const WithIcon: Story = {
	args: { children: 'Send Invite', prefixIcon: <Mail className='size-4' /> },
};

export const Loading: Story = { args: { children: 'Saving…', isLoading: true } };
export const Disabled: Story = { args: { children: 'Unavailable', disabled: true } };

export const Sizes: Story = {
	render: () => (
		<div className='flex items-center gap-3'>
			<Button size='xs'>XSmall</Button>
			<Button size='sm'>Small</Button>
			<Button size='default'>Default</Button>
			<Button size='lg'>Large</Button>
		</div>
	),
};

export const ClickInteraction: Story = {
	name: 'Interaction / Click',
	args: { children: 'Click Me' },
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button', { name: /Click Me/i }));
		await expect(args.onClick).toHaveBeenCalledTimes(1);
	},
};

export const LoadingBlocksClick: Story = {
	name: 'Interaction / Loading blocks click',
	args: { children: 'Saving', isLoading: true },
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button'));
		await expect(args.onClick).not.toHaveBeenCalled();
	},
};
