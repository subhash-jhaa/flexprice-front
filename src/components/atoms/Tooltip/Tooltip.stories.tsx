import type { Meta, StoryObj } from '@storybook/react';
import { HelpCircle } from 'lucide-react';
import Button from '../Button/Button';
import Tooltip from './Tooltip';

const meta = {
	title: 'Atoms/Tooltip',
	component: Tooltip,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		side: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
		align: { control: 'select', options: ['start', 'center', 'end'] },
		delayDuration: { control: 'number' },
	},
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: <Button variant='outline'>Hover Me</Button>,
		content: 'This action will save your changes.',
	},
};

export const Positions: Story = {
	args: {
		children: <span />,
		content: '',
	},
	render: () => (
		<div className='grid grid-cols-2 gap-4 p-8'>
			{(['top', 'right', 'bottom', 'left'] as const).map((side) => (
				<Tooltip key={side} content={`Appears ${side}`} side={side} delayDuration={0}>
					<Button variant='outline' size='sm'>
						{side}
					</Button>
				</Tooltip>
			))}
		</div>
	),
};

export const IconTrigger: Story = {
	args: {
		children: <HelpCircle className='size-4 cursor-help text-muted-foreground' />,
		content: 'Usage is calculated at the end of each billing cycle.',
		delayDuration: 0,
	},
};

export const RichContent: Story = {
	args: {
		children: <Button variant='outline'>Tier pricing</Button>,
		delayDuration: 0,
		content: (
			<div className='space-y-1 text-xs'>
				<p className='font-semibold'>Graduated pricing</p>
				<p className='text-muted-foreground'>0–1,000 units → $0.10 each</p>
				<p className='text-muted-foreground'>1,001–10,000 → $0.08 each</p>
				<p className='text-muted-foreground'>10,001+ → $0.05 each</p>
			</div>
		),
	},
};
