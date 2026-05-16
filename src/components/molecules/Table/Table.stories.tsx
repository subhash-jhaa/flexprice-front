import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router';
import { useFilterStore } from '@/hooks/useFilterStore';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import Chip from '../../atoms/Chip/Chip';
import FlexpriceTable, { type ColumnData } from './Table';

type Invoice = { id: string; customer: string; amount: number; status: string; date: string };

const DATA: Invoice[] = [
	{ id: 'INV-001', customer: 'Acme Corp', amount: 2500.0, status: 'paid', date: '2024-01-15' },
	{ id: 'INV-002', customer: 'Jane Smith', amount: 85.5, status: 'open', date: '2024-01-18' },
	{ id: 'INV-003', customer: 'Global Tech', amount: 450.0, status: 'overdue', date: '2023-12-28' },
	{ id: 'INV-004', customer: 'Startup Co', amount: 1200.0, status: 'paid', date: '2024-01-20' },
	{ id: 'INV-005', customer: 'Initech LLC', amount: 99.0, status: 'open', date: '2024-01-22' },
];

const STATUS_VARIANT: Record<string, 'success' | 'warning' | 'failed'> = {
	paid: 'success',
	open: 'warning',
	overdue: 'failed',
};

const COLUMNS: ColumnData<Invoice>[] = [
	{ title: 'Invoice ID', fieldName: 'id', flex: 1 },
	{ title: 'Customer', fieldName: 'customer', flex: 2 },
	{
		title: 'Amount',
		render: (row) => <span className='tabular-nums'>${row.amount.toFixed(2)}</span>,
		align: 'right',
		flex: 1,
	},
	{
		title: 'Status',
		render: (row) => (
			<Chip label={row.status.charAt(0).toUpperCase() + row.status.slice(1)} variant={STATUS_VARIANT[row.status] ?? 'default'} />
		),
		flex: 1,
	},
	{ title: 'Date', fieldName: 'date', flex: 1 },
];

const meta = {
	title: 'Molecules/DataTable',
	component: FlexpriceTable,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
} satisfies Meta<typeof FlexpriceTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { columns: COLUMNS, data: DATA } };

export const Empty: Story = { args: { columns: COLUMNS, data: [], showEmptyRow: true } };

export const Borderless: Story = { args: { columns: COLUMNS, data: DATA, variant: 'no-bordered' } };

export const ClickableRows: Story = {
	args: {
		columns: COLUMNS,
		data: DATA,
		onRowClick: (row: Invoice) => console.log('Row clicked:', row.id),
	},
};

const VIRTUALIZED_DATA = Array.from({ length: 10000 }, (_, i) => ({
	id: `INV-VIRT-${i + 1}`,
	customer: `Customer ${i + 1}`,
	amount: Math.random() * 5000,
	status: ['paid', 'open', 'overdue'][Math.floor(Math.random() * 3)],
	date: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
}));

export const Virtualized: Story = {
	name: 'Advanced / Virtualized (10k Rows)',
	args: {
		columns: COLUMNS,
		data: VIRTUALIZED_DATA,
		virtualized: true,
		containerHeight: 500,
	},
};

const FilterDemo = () => {
	return (
		<MemoryRouter initialEntries={['/']}>
			<FilterContent />
		</MemoryRouter>
	);
};

const FilterContent = () => {
	const { filters, setFilter, resetFilters } = useFilterStore('demo-users');

	const filteredData = DATA.filter((row) => {
		if (filters.search && !row.customer.toLowerCase().includes(String(filters.search).toLowerCase())) {
			return false;
		}
		if (filters.status && !row.status.toLowerCase().includes(String(filters.status).toLowerCase())) {
			return false;
		}
		return true;
	});

	return (
		<div className='space-y-6 max-w-3xl w-full mx-auto p-4'>
			<div className='flex gap-4 items-end'>
				<div className='flex-1'>
					<Input
						label='Search Customers'
						placeholder='Type a name…'
						value={(filters.search as string) || ''}
						onChange={(value) => setFilter('search', value)}
					/>
				</div>
				<div className='flex-1'>
					<Input
						label='Filter by Status'
						placeholder='e.g. paid'
						value={(filters.status as string) || ''}
						onChange={(value) => setFilter('status', value)}
					/>
				</div>
				<Button variant='outline' onClick={resetFilters}>
					Clear Filters
				</Button>
			</div>

			<div className='text-sm text-muted-foreground p-4 bg-muted/50 rounded-lg border border-border'>
				<p>
					<strong className='text-foreground'>Active Filters in sessionStorage:</strong> {JSON.stringify(filters)}
				</p>
				<p className='mt-2 text-xs'>
					* Notice how only a lightweight fingerprint (e.g., ?f=1) is synced to the URL rather than the raw JSON.
				</p>
			</div>

			<FlexpriceTable columns={COLUMNS} data={filteredData} showEmptyRow />
		</div>
	);
};

export const FilterStoreState: Story = {
	name: 'Advanced / Filter Store Persistence',
	args: {
		columns: COLUMNS,
		data: [],
	},
	render: () => <FilterDemo />,
};
