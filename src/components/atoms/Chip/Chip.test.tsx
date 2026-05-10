import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Chip from './Chip';

describe('Chip', () => {
	it('renders the label correctly', () => {
		render(<Chip label='Active Status' />);
		expect(screen.getByText('Active Status')).toBeInTheDocument();
	});

	it('applies success variant styles via inline style', () => {
		render(<Chip label='Success' variant='success' />);
		const chip = screen.getByRole('button');
		// CHIP_COLORS.success.bgColor is #ECFBE4, but rendered as rgb(236, 251, 228) in JS DOM styles
		expect(chip).toHaveStyle({ backgroundColor: 'rgb(236, 251, 228)' });
	});

	it('handles click events when onClick is provided', async () => {
		const handleClick = vi.fn();
		render(<Chip label='Clickable' onClick={handleClick} />);

		const chip = screen.getByRole('button');
		await userEvent.click(chip);

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('is disabled when disabled prop is passed', () => {
		const handleClick = vi.fn();
		render(<Chip label='Disabled' onClick={handleClick} disabled />);

		const chip = screen.getByRole('button');
		expect(chip).toHaveAttribute('aria-disabled', 'true');
	});
});
