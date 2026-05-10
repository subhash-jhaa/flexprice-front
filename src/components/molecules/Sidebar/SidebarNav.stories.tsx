import type { Meta, StoryObj } from '@storybook/react';
import { BarChart3, Home, Landmark, Layers2, Puzzle } from 'lucide-react';
import { MemoryRouter } from 'react-router';
import { SidebarProvider } from '@/components/ui/sidebar';
import SidebarNav from './SidebarMenu';
import React from 'react';

const NAV_ITEMS = [
	{ title: 'Home', url: '/home', icon: Home },
	{
		title: 'Product Catalog',
		url: '/product-catalog',
		icon: Layers2,
		items: [
			{ title: 'Features', url: '/product-catalog/features' },
			{ title: 'Plans', url: '/product-catalog/plans' },
			{ title: 'Coupons', url: '/product-catalog/coupons' },
		],
	},
	{
		title: 'Billing',
		url: '/billing',
		icon: Landmark,
		items: [
			{ title: 'Customers', url: '/billing/customers' },
			{ title: 'Subscriptions', url: '/billing/subscriptions' },
			{ title: 'Invoices', url: '/billing/invoices' },
		],
	},
	{ title: 'Revenue', url: '/revenue', icon: BarChart3 },
	{ title: 'Integrations', url: '/integrations', icon: Puzzle },
];

const withRouter =
	(initialPath = '/home') =>
	(Story: React.ComponentType) => (
		<MemoryRouter initialEntries={[initialPath]}>
			<SidebarProvider>
				<div className='h-screen w-[260px] border-r bg-[#f9f9f9]'>
					<Story />
				</div>
			</SidebarProvider>
		</MemoryRouter>
	);

const meta = {
	title: 'Organisms/SidebarNav',
	component: SidebarNav,
	parameters: { layout: 'fullscreen' },
	tags: ['autodocs'],
} satisfies Meta<typeof SidebarNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { items: NAV_ITEMS },
	decorators: [withRouter()],
};

/** Active route is pre-set so the correct accordion section opens on mount. */
export const ActiveSubItem: Story = {
	args: { items: NAV_ITEMS },
	decorators: [withRouter('/product-catalog/plans')],
};
