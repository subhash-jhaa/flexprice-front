import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { FileText, Users } from 'lucide-react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DocsProvider } from '@/context/DocsContext';
import EmptyPage from './EmptyPage';

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

const withProviders = (Story: React.ComponentType) => (
	<QueryClientProvider client={queryClient}>
		<MemoryRouter>
			<DocsProvider>
				<Story />
			</DocsProvider>
		</MemoryRouter>
	</QueryClientProvider>
);

const meta = {
	title: 'Organisms/EmptyState',
	component: EmptyPage,
	parameters: { layout: 'fullscreen' },
	tags: ['autodocs'],
	decorators: [withProviders],
} satisfies Meta<typeof EmptyPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Invoices: Story = {
	args: {
		heading: 'Invoices',
		addButtonLabel: 'Create Invoice',
		onAddClick: fn(),
		emptyStateCard: {
			icon: <FileText className='size-12 text-slate-300' />,
			heading: 'No invoices yet',
			description: 'Create your first invoice to start billing your customers.',
			buttonLabel: 'Create Invoice',
			buttonAction: fn(),
		},
	},
};

export const Customers: Story = {
	args: {
		heading: 'Customers',
		addButtonLabel: 'Add Customer',
		onAddClick: fn(),
		emptyStateCard: {
			icon: <Users className='size-12 text-slate-300' />,
			heading: 'No customers yet',
			description: 'Add customers to start managing subscriptions and usage.',
			buttonLabel: 'Add Customer',
			buttonAction: fn(),
		},
	},
};
