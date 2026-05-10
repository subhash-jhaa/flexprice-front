import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PlanPriceTable from './PlanPriceTable';
import { Plan } from '@/models';
import { ENTITY_STATUS } from '@/models/base';

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

const MOCK_PLAN: Plan = {
	id: 'plan_demo_001',
	name: 'Pro Plan',
	description: 'Usage-based plan for growing teams',
	lookup_key: 'pro',
	created_at: '2024-01-01T00:00:00Z',
	updated_at: '2024-01-01T00:00:00Z',
	created_by: 'user_123',
	updated_by: 'user_123',
	tenant_id: 'tenant_123',
	status: ENTITY_STATUS.PUBLISHED,
	environment_id: 'env_123',
};

const meta = {
	title: 'Organisms/PricingTierTable',
	component: PlanPriceTable,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	decorators: [
		(Story: React.ComponentType) => (
			<QueryClientProvider client={queryClient}>
				<MemoryRouter>
					<div className='max-w-4xl'>
						<Story />
					</div>
				</MemoryRouter>
			</QueryClientProvider>
		),
	],
} satisfies Meta<typeof PlanPriceTable>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Renders with a mock plan — charges load via the internal useQuery (returns empty in Storybook). */
export const Default: Story = {
	args: { plan: MOCK_PLAN },
};
