import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import QuestionBody from './question-body';

const renderQuestion = ({ type, options = [], value } = {}) => {
	const onChange = vi.fn();
	const onUploadedFileNameChange = vi.fn();
	const view = render(
		<QuestionBody
			question={{ type, options }}
			value={value}
			onChange={onChange}
			uploadedFileName=''
			onUploadedFileNameChange={onUploadedFileNameChange}
		/>
	);

	return { ...view, onChange, onUploadedFileNameChange };
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

	test('reports an uploaded document and its file name', () => {
		const { container, onChange, onUploadedFileNameChange } = renderQuestion({ type: 'upload' });
		const file = new File(['demo'], 'will.pdf', { type: 'application/pdf' });

		fireEvent.change(container.querySelector("input[type='file']"), { target: { files: [file] } });

		expect(onUploadedFileNameChange).toHaveBeenCalledWith('will.pdf');
		expect(onChange).toHaveBeenCalledWith('uploaded');
	});

	test('updates selected banks', async() => {
		const user = userEvent.setup();
		const { onChange } = renderQuestion({ type: 'banks', options: ['Chase', 'Capital One'], value: [] });

		await user.click(screen.getByRole('button', { name: /Chase$/ }));

		expect(onChange).toHaveBeenCalledWith(['Chase']);
	});

	test('updates account details while keeping the existing value', () => {
		const { onChange } = renderQuestion({ type: 'account', value: { nickname: 'Daily' } });

		fireEvent.change(screen.getByPlaceholderText('Mountain America'), { target: { value: 'Bank' } });

		expect(onChange).toHaveBeenCalledWith({ nickname: 'Daily', bank: 'Bank' });
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

	test('toggles a voice-message recording', async() => {
		const user = userEvent.setup();
		const { onChange } = renderQuestion({ type: 'voice' });

		await user.click(screen.getByRole('button'));

		expect(onChange).toHaveBeenCalledWith('recorded');
	});
});
