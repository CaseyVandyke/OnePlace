import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import App from './app';

async function beginSetup(user) {
	render(<App />);
	await user.click(screen.getByRole('button', { name: 'Build my OnePlace' }));
	await user.click(screen.getByRole('button', { name: 'Skip introduction' }));
}

describe('OnePlace', () => {
	test('opens the journey introduction from the welcome screen', async() => {
		const user = userEvent.setup();
		render(<App />);
		const appShell = screen.getByRole('main');
		expect(screen.getByText('oneplace')).toBeVisible();
		expect(document.querySelector('.map-stop.current > .map-stop-icon')).toBeInTheDocument();

		window.scrollTo.mockClear();
		await user.click(screen.getByRole('button', { name: 'Build my OnePlace' }));

		expect(screen.getByRole('heading', { name: 'One small step at a time.' })).toBeVisible();
		expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
		expect(window.scrollTo.mock.calls.length).toBeGreaterThanOrEqual(2);
		expect(screen.getByRole('main')).toBe(appShell);
		expect(document.documentElement.style.overflow).not.toBe('hidden');
		expect(document.body.style.overflow).not.toBe('hidden');
	});

	test('opens account actions from the welcome header', async() => {
		const user = userEvent.setup();
		render(<App />);

		const menuButton = screen.getByRole('button', { name: 'Open account menu' });
		await user.click(menuButton);

		expect(menuButton).toHaveAttribute('aria-expanded', 'true');
		const loginButton = screen.getByRole('button', { name: 'Log in' });
		expect(loginButton).toBeVisible();
		expect(screen.getByRole('button', { name: 'Create account' })).toBeVisible();

		await user.click(loginButton);
		expect(screen.getByRole('status')).toHaveTextContent('This is a prototype — login and account creation aren’t available yet.');
	});

	test('returns to the welcome screen from the introduction logo', async() => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(screen.getByRole('button', { name: 'Build my OnePlace' }));
		await user.click(screen.getByRole('button', { name: 'Return to the Welcome screen' }));

		expect(screen.getByRole('button', { name: 'Build my OnePlace' })).toBeVisible();
	});

	test('starts setup without a character-selection screen', async() => {
		const user = userEvent.setup();
		await beginSetup(user);

		expect(screen.getByRole('heading', { name: 'Who are you preparing this for?' })).toBeVisible();
		expect(screen.queryByText(/pick your character/i)).not.toBeInTheDocument();
		expect(screen.queryByText('You are here')).not.toBeInTheDocument();
	});

	test('introduces the illuminated path', async() => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(screen.getByRole('button', { name: 'Build my OnePlace' }));
		await user.click(screen.getByRole('button', { name: 'Next' }));
		expect(screen.getByRole('heading', { name: 'Your path lights up as you go.' })).toBeVisible();
		expect(screen.queryByRole('button', { name: /companion|guide/i })).not.toBeInTheDocument();
	});

	test('keeps the main app header focused on progress', async() => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(screen.getByRole('button', { name: 'Preview the app' }));
		expect(screen.getByText('95 glow')).toBeVisible();
		expect(screen.queryByRole('button', { name: /change guide/i })).not.toBeInTheDocument();
	});

	test('returns to the welcome screen from the main app logo', async() => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(screen.getByRole('button', { name: 'Preview the app' }));
		await user.click(screen.getByRole('button', { name: 'Return to the Welcome screen' }));

		expect(screen.getByRole('button', { name: 'Build my OnePlace' })).toBeVisible();
	});

	test('labels unavailable prototype actions when selected', async() => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(screen.getByRole('button', { name: 'Preview the app' }));
		await user.click(screen.getByRole('button', { name: 'My people' }));
		await user.click(screen.getByRole('button', { name: 'Invite someone' }));

		expect(screen.getByRole('status')).toHaveTextContent('Preview only — this feature isn’t available in the prototype yet.');
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

	test('keeps the map trail mounted while completed segments illuminate', async() => {
		const user = userEvent.setup();
		await beginSetup(user);
		const trail = document.querySelector('.map-trail');
		const firstSegment = document.querySelector('.trail-segment-light');
		const journeyLayout = document.querySelector('.journey-layout');
		expect(firstSegment).not.toHaveClass('lit');

		await user.click(screen.getByRole('button', { name: 'My children' }));
		await user.click(screen.getByRole('button', { name: 'Save & continue' }));
		await screen.findByRole('heading', { name: 'What should your family call this place?' }, { timeout: 1500 });
		expect(document.querySelector('.journey-layout')).toBe(journeyLayout);
		expect(journeyLayout).toHaveClass('question-screen-enter-odd');
		await user.type(screen.getByRole('textbox', { name: 'Your place’s name' }), 'Morgan family');
		await user.click(screen.getByRole('button', { name: 'Save & continue' }));
		await screen.findByRole('heading', { name: 'Do you have a will?' }, { timeout: 1500 });

		expect(document.querySelector('.map-trail')).toBe(trail);
		expect(document.querySelector('.trail-segment-light')).toBe(firstSegment);
		expect(firstSegment).toHaveClass('lit');
		expect(journeyLayout).toHaveClass('question-screen-enter-even');
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
