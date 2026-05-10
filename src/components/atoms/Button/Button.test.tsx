import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Button', () => {
	it('renders correctly with children', () => {
		render(<Button>Click Me</Button>);
		const button = screen.getByRole('button', { name: /click me/i });
		expect(button).toBeInTheDocument();
		expect(button).not.toBeDisabled();
	});

	it('handles onClick events', async () => {
		const handleClick = vi.fn();
		render(<Button onClick={handleClick}>Click Me</Button>);

		const button = screen.getByRole('button');
		await userEvent.click(button);

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('is disabled when disabled prop is true', () => {
		render(<Button disabled>Disabled</Button>);
		const button = screen.getByRole('button');
		expect(button).toBeDisabled();
	});

	it('disables button and shows loading state when isLoading is true', async () => {
		const handleClick = vi.fn();
		render(
			<Button isLoading onClick={handleClick}>
				Submit
			</Button>,
		);

		const button = screen.getByRole('button');
		expect(button).toBeDisabled();

		await userEvent.click(button);
		expect(handleClick).not.toHaveBeenCalled();
	});
});
