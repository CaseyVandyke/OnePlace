import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import App from './app';

async function beginSetup(user) {
	render(<App />);
	await user.click(screen.getByRole('button', { name: 'Build my OnePlace' }));
	await user.click(screen.getByRole('button', { name: 'Skip introduction' }));
}

afterEach(() => {
	vi.useRealTimers();
});

describe('OnePlace', () => {
	test('opens the journey introduction from the welcome screen', async() => {
		const user = userEvent.setup();
		render(<App />);
		const appShell = screen.getByRole('main');

		await user.click(screen.getByRole('button', { name: 'Build my OnePlace' }));

		expect(screen.getByRole('heading', { name: 'One small step at a time.' })).toBeVisible();
		expect(screen.getByRole('main')).toBe(appShell);
		expect(document.documentElement.style.overflow).not.toBe('hidden');
		expect(document.body.style.overflow).not.toBe('hidden');
	});

	test('starts setup without a character-selection screen', async() => {
		const user = userEvent.setup();
		await beginSetup(user);

		expect(screen.getByRole('heading', { name: 'Who are you preparing this for?' })).toBeVisible();
		expect(screen.queryByText(/pick your character/i)).not.toBeInTheDocument();
	});

	test('offers an optional companion choice and remembers it', async() => {
		const user = userEvent.setup();
		const view = render(<App />);

		await user.click(screen.getByRole('button', { name: 'Build my OnePlace' }));
		await user.click(screen.getByRole('button', { name: 'Next' }));
		expect(screen.getByRole('heading', { name: 'Your Golden Retriever guide lights the way.' })).toBeVisible();

		await user.click(screen.getByRole('button', { name: /Choose another companion/i }));
		expect(screen.getByRole('dialog', { name: 'Choose the companion who guides you.' })).toBeVisible();
		expect(screen.getAllByRole('radio')).toHaveLength(5);
		await user.click(screen.getByRole('radio', { name: /Tabby Cat.*Calm & Curious/i }));
		await user.click(screen.getByRole('button', { name: 'Travel with Tabby Cat' }));

		expect(screen.getByRole('heading', { name: 'Your Tabby Cat guide lights the way.' })).toBeVisible();
		expect(screen.getByText('Meow! I’m ready!')).toBeInTheDocument();

		view.unmount();
		render(<App />);
		await user.click(screen.getByRole('button', { name: 'Build my OnePlace' }));
		await user.click(screen.getByRole('button', { name: 'Next' }));
		expect(screen.getByRole('heading', { name: 'Your Tabby Cat guide lights the way.' })).toBeVisible();
	});

	test('lets a user change their companion guide from the main app', async() => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(screen.getByRole('button', { name: 'Preview the app' }));
		await user.click(screen.getByRole('button', { name: 'Change guide. Current guide: Golden Retriever' }));
		await user.click(screen.getByRole('radio', { name: /Labrador.*Friendly & Steady/i }));
		await user.click(screen.getByRole('button', { name: 'Travel with Labrador' }));

		expect(screen.getByRole('button', { name: 'Change guide. Current guide: Labrador' })).toBeVisible();
	});

	test('starts with the Golden Retriever when an old preference is present', async() => {
		window.localStorage.setItem('oneplace.companionGuide', 'tabby-cat');
		const user = userEvent.setup();
		render(<App />);

		await user.click(screen.getByRole('button', { name: 'Preview the app' }));

		expect(screen.getByRole('button', { name: 'Change guide. Current guide: Golden Retriever' })).toBeVisible();
	});

	test('closes the guide picker with Escape and restores focus', async() => {
		const user = userEvent.setup();
		render(<App />);
		await user.click(screen.getByRole('button', { name: 'Preview the app' }));
		const guideButton = screen.getByRole('button', { name: 'Change guide. Current guide: Golden Retriever' });

		await user.click(guideButton);
		fireEvent(screen.getByRole('dialog'), new Event('cancel', { cancelable: true }));

		expect(screen.queryByRole('dialog', { name: 'Choose the companion who guides you.' })).not.toBeInTheDocument();
		expect(guideButton).toHaveFocus();
	});

	test('does not cancel native touch scrolling inside the guide picker', async() => {
		const user = userEvent.setup();
		render(<App />);
		await user.click(screen.getByRole('button', { name: 'Preview the app' }));
		await user.click(screen.getByRole('button', { name: 'Change guide. Current guide: Golden Retriever' }));
		const guideOptions = screen.getByRole('group', { name: 'Available companion guides' });

		fireEvent.touchStart(guideOptions, { touches: [{ clientY: 120 }] });

		expect(fireEvent.touchMove(guideOptions, { touches: [{ clientY: 180 }] })).toBe(true);
	});

	test('requires an answer before continuing the first setup question', async() => {
		const user = userEvent.setup();
		await beginSetup(user);
		const continueButton = screen.getByRole('button', { name: 'Save & continue' });

		expect(continueButton).toBeDisabled();
		await user.click(screen.getByRole('button', { name: 'My children' }));
		expect(continueButton).toBeEnabled();
	});

	test('advances the journey after saving an answer', async() => {
		const user = userEvent.setup();
		await beginSetup(user);

		await user.click(screen.getByRole('button', { name: 'My children' }));
		await user.click(screen.getByRole('button', { name: 'Save & continue' }));

		expect(await screen.findByRole('heading', {
			name: 'What should your family call this place?'
		}, { timeout: 1500 })).toBeVisible();
		expect(screen.getByText('Question 2 of 10')).toBeVisible();
	});

	test('settles contextual guide reactions into simple sounds', () => {
		vi.useFakeTimers();
		render(<App />);

		expect(screen.getByText('Woof! Let’s go!')).toBeInTheDocument();
		act(() => vi.advanceTimersByTime(9000));
		expect(screen.getByText('Woof!')).toBeInTheDocument();
		act(() => vi.advanceTimersByTime(9000));
		expect(screen.getByText('Arf!')).toBeInTheDocument();
	});

	test('closes the quick-step popup from its backdrop and close button', async() => {
		const user = userEvent.setup();
		render(<App />);
		await user.click(screen.getByRole('button', { name: 'Preview the app' }));

		await user.click(screen.getByRole('button', { name: 'Take today’s 3-minute step' }));
		expect(screen.getByRole('dialog', { name: 'Where is your retirement account held?' })).toBeVisible();
		await user.click(screen.getAllByRole('button', { name: 'Close quick step' })[0]);
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

		await user.click(screen.getByRole('button', { name: 'Take today’s 3-minute step' }));
		await user.click(screen.getAllByRole('button', { name: 'Close quick step' })[1]);
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});
});
