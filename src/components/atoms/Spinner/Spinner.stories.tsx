import type { Meta, StoryObj } from '@storybook/react';
import Spinner from './Spinner';

const meta = {
	title: 'Atoms/Spinner',
	component: Spinner,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		size: { control: { type: 'number', min: 12, max: 96, step: 4 } },
		className: { control: 'text' },
	},
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { size: 24 } };

export const Sizes: Story = {
	render: () => (
		<div className='flex items-center gap-6'>
			{[16, 24, 36, 48].map((size) => (
				<Spinner key={size} size={size} />
			))}
		</div>
	),
};

export const InContext: Story = {
	name: 'In Context / Section overlay',
	render: () => (
		<div className='relative flex h-40 w-72 items-center justify-center rounded-lg border bg-background'>
			<div className='absolute inset-0 flex items-center justify-center rounded-lg bg-background/80 backdrop-blur-sm'>
				<Spinner size={32} className='text-primary' />
			</div>
			<p className='text-sm text-muted-foreground'>Content loads here</p>
		</div>
	),
};
