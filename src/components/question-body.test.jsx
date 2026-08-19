import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import QuestionBody from './question-body';

const renderQuestion = ({ type, options = [], value } = {}) => {
	const onChange = vi.fn();
	const view = render(
		<QuestionBody
			question={{ type, options }}
			value={value}
			onChange={onChange}
		/>
	);

	return { ...view, onChange };
};

describe('QuestionBody', () => {
	test('updates multiple-choice answers', async() => {
		const user = userEvent.setup();
		const { onChange } = renderQuestion({ type: 'multi', options: ['Spouse', 'Children'], value: ['Spouse'] });

		await user.click(screen.getByRole('button', { name: 'Children' }));

		expect(onChange).toHaveBeenCalledWith(['Spouse', 'Children']);
	});

	test('updates single-choice answers', async() => {
		const user = userEvent.setup();
		const { onChange } = renderQuestion({ type: 'single', options: ['Yes', 'No'] });

		await user.click(screen.getByRole('button', { name: 'Yes' }));

		expect(onChange).toHaveBeenCalledWith('Yes');
	});

	test('updates the place name', () => {
		const { onChange } = renderQuestion({ type: 'name' });

		fireEvent.change(screen.getByPlaceholderText('The Morgan family’s OnePlace'), { target: { value: 'Morgan' } });

		expect(onChange).toHaveBeenCalledWith('Morgan');
	});

	test('updates a safe document reference without offering an upload', () => {
		const { container, onChange } = renderQuestion({ type: 'document-reference', value: { holder: 'Attorney' } });

		fireEvent.change(screen.getByPlaceholderText('Original held by the estate attorney'), { target: { value: 'Home office fire safe' } });

		expect(onChange).toHaveBeenCalledWith({ holder: 'Attorney', generalLocation: 'Home office fire safe' });
		expect(container.querySelector("input[type='file']")).not.toBeInTheDocument();
		expect(screen.getByLabelText('When did you last confirm this?').parentElement).toHaveClass('reference-date-control');
		expect(screen.getByText('Add a helpful reference, not the secret itself.')).toBeVisible();
	});

	test('updates selected banks', async() => {
		const user = userEvent.setup();
		const { onChange } = renderQuestion({ type: 'banks', options: ['Chase', 'Capital One'], value: [] });

		await user.click(screen.getByRole('button', { name: /Chase$/ }));

		expect(onChange).toHaveBeenCalledWith(['Chase']);
	});

	test('updates a financial reference without collecting account numbers', () => {
		const { onChange } = renderQuestion({ type: 'financial-reference', value: { nickname: 'Daily' } });

		fireEvent.change(screen.getByPlaceholderText('Mountain America'), { target: { value: 'Bank' } });

		expect(onChange).toHaveBeenCalledWith({ nickname: 'Daily', institution: 'Bank' });
		expect(screen.queryByLabelText(/account number/i)).not.toBeInTheDocument();
		expect(screen.queryByLabelText(/last 4/i)).not.toBeInTheDocument();
	});

	test('updates a trusted person', () => {
		const { onChange } = renderQuestion({ type: 'person' });

		fireEvent.change(screen.getByPlaceholderText('Daniel Morgan'), { target: { value: 'Daniel' } });

		expect(onChange).toHaveBeenCalledWith({ name: 'Daniel' });
	});

	test('updates a possession', () => {
		const { onChange } = renderQuestion({ type: 'possessions' });

		fireEvent.change(screen.getByPlaceholderText('Grandmother’s ring'), { target: { value: 'Ring' } });

		expect(onChange.mock.lastCall[0][0].item).toBe('Ring');
	});

	test('accepts an audio file for a voice message', () => {
		const { container, onChange } = renderQuestion({ type: 'voice' });
		const file = new File(['audio'], 'hello.m4a', { type: 'audio/mp4' });

		fireEvent.change(container.querySelector("input[type='file']"), { target: { files: [file] } });

		expect(onChange).toHaveBeenCalledWith({
			blob: file,
			duration: 0,
			mimeType: 'audio/mp4',
			name: 'hello.m4a'
		});
	});
});
