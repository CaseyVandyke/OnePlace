import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import App from './app';
import { journeyProgressStorageKey } from './hooks/journey-progress';

const seedCompletedOnboarding = () => {
	const questionStatuses = Object.fromEntries(
		Array.from({ length: 10 }, (_, index) => [index, 'answered'])
	);
	window.localStorage.setItem(journeyProgressStorageKey, JSON.stringify({
		questionStatuses,
		completedQuickSteps: []
	}));
};

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
		expect(document.querySelector('.welcome-footer')).not.toBeInTheDocument();
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
		expect(document.querySelector('.mobile-chapter-status')).toHaveTextContent(/Basecamp.*Chapter 1 of 6/);
		expect(screen.queryByText(/pick your character/i)).not.toBeInTheDocument();
		expect(screen.queryByText('You are here')).not.toBeInTheDocument();
	});

	test('starts a fresh welcome walkthrough without previously saved progress', async() => {
		const user = userEvent.setup();
		window.localStorage.setItem(journeyProgressStorageKey, JSON.stringify({
			questionStatuses: {
				0: 'answered',
				1: 'answered',
				2: 'answered',
				3: 'answered',
				4: 'answered'
			},
			completedQuickSteps: []
		}));

		await beginSetup(user);

		expect(screen.getByText('Question 1 of 10')).toBeVisible();
		expect(screen.getByText('0% lit')).toBeVisible();
		expect(screen.getByRole('heading', { name: 'Who are you preparing this for?' })).toBeVisible();
		expect(document.querySelector('.trail-segment-light')).not.toHaveClass('lit');
		expect(JSON.parse(window.localStorage.getItem(journeyProgressStorageKey))).toEqual({
			questionStatuses: {},
			completedQuickSteps: []
		});
	});

	test('introduces the illuminated path', async() => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(screen.getByRole('button', { name: 'Build my OnePlace' }));
		await user.click(screen.getByRole('button', { name: 'Next' }));
		expect(screen.getByRole('heading', { name: 'Your path lights up as you go.' })).toBeVisible();
		expect(screen.queryByRole('button', { name: /companion|guide/i })).not.toBeInTheDocument();
	});

	test('keeps the main app header focused on navigation', async() => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(screen.getByRole('button', { name: 'Preview the app' }));
		expect(screen.getByRole('button', { name: 'Continue my path' })).toBeVisible();
		expect(screen.getByText('0% lit.')).toBeVisible();
		expect(screen.getByText('Your first small step')).toBeVisible();
		expect(screen.queryByText(/Wednesday’s small win/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/\bglow\b/i)).not.toBeInTheDocument();
		expect(screen.queryByRole('button', { name: /change guide/i })).not.toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Continue where you left off' })).toBeVisible();
		expect(screen.getByRole('button', { name: 'Continue Basecamp' })).toBeVisible();
		expect(screen.getAllByText('Not reached yet', { selector: '.path-stop-action' })[0]).toBeVisible();
	});

	test('aligns detailed path counts with their map chapters', async() => {
		const user = userEvent.setup();
		window.localStorage.setItem(journeyProgressStorageKey, JSON.stringify({
			questionStatuses: { 0: 'answered', 1: 'skipped' },
			completedQuickSteps: []
		}));
		render(<App />);

		await user.click(screen.getByRole('button', { name: 'Preview the app' }));
		const basecampCard = screen.getByRole('button', { name: 'Continue Basecamp' });

		expect(within(basecampCard).getByText('1 of 2')).toBeVisible();
		expect(screen.getByRole('heading', { name: '1 question saved for later.' })).toBeVisible();
		expect(screen.queryByRole('button', { name: /What should your family call this place/ })).not.toBeInTheDocument();
	});

	test('continues setup from the current detailed path card', async() => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(screen.getByRole('button', { name: 'Preview the app' }));
		await user.click(screen.getByRole('button', { name: 'Continue Basecamp' }));

		expect(screen.getByRole('heading', { name: 'Who are you preparing this for?' })).toBeVisible();
		expect(document.querySelector('.journey-screen')).toHaveClass('screen-enter');
	});

	test('covers the outgoing page during the Safari scroll reset', async() => {
		const user = userEvent.setup();
		render(<App />);
		await user.click(screen.getByRole('button', { name: 'Preview the app' }));

		const frames = [];
		const frameSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
			frames.push(callback);
			return frames.length;
		});
		const appShell = screen.getByRole('main');

		await user.click(screen.getByRole('button', { name: 'Continue Basecamp' }));
		expect(appShell).toHaveClass('screen-changing');

		act(() => frames.shift()());
		expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
		expect(appShell).toHaveClass('screen-changing');

		act(() => frames.shift()());
		expect(appShell).not.toHaveClass('screen-changing');
		expect(screen.getByRole('heading', { name: 'Who are you preparing this for?' })).toBeVisible();
		frameSpy.mockRestore();
	});

	test('shows completed guided setup as fully lit', async() => {
		const user = userEvent.setup();
		seedCompletedOnboarding();
		render(<App />);

		await user.click(screen.getByRole('button', { name: 'Preview the app' }));

		expect(screen.getByText('100% lit.')).toBeVisible();
		expect(screen.getByText('Guided setup complete')).toBeVisible();
		expect(screen.getByText('10 of 10 setup steps complete')).toBeVisible();
	});

	test('opens main app destinations from reached map locations', async() => {
		const user = userEvent.setup();
		seedCompletedOnboarding();
		render(<App />);

		await user.click(screen.getByRole('button', { name: 'Preview the app' }));
		await user.click(screen.getByRole('button', { name: 'Open Money Meadow' }));
		expect(screen.getByRole('heading', { name: /Every part of your life/ })).toBeVisible();

		await user.click(screen.getByRole('button', { name: 'Back to map' }));
		await user.click(screen.getByRole('button', { name: 'Open Kindred Grove' }));
		expect(screen.getByRole('heading', { name: 'A circle built on trust.' })).toBeVisible();

		await user.click(screen.getByRole('button', { name: 'Back to map' }));
		await user.click(screen.getByRole('button', { name: 'Open Memory Lake' }));
		expect(screen.getByRole('heading', { name: 'Leave more than instructions.' })).toBeVisible();
	});

	test('keeps unreached main map destinations locked', async() => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(screen.getByRole('button', { name: 'Preview the app' }));
		expect(screen.getByText('Choose a reached place to open it.')).toBeVisible();
		expect(screen.getByRole('button', { name: 'Open Basecamp' })).toBeVisible();
		expect(screen.queryByRole('button', { name: 'Open Money Meadow' })).not.toBeInTheDocument();
		expect(document.querySelector('.map-stop.money-meadow')).toHaveClass('locked');
	});

	test('resumes setup from Basecamp on the main map', async() => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(screen.getByRole('button', { name: 'Preview the app' }));
		await user.click(screen.getByRole('button', { name: 'Open Basecamp' }));

		expect(screen.getByText('Question 1 of 10')).toBeVisible();
		expect(screen.getByRole('heading', { name: 'Who are you preparing this for?' })).toBeVisible();
		expect(screen.queryByText('Choose a reached place to open it.')).not.toBeInTheDocument();
	});

	test('navigates between guided question groups from the map', async() => {
		const user = userEvent.setup();
		await beginSetup(user);

		expect(screen.queryByRole('button', { name: 'Open Paper Port' })).not.toBeInTheDocument();
		await user.click(screen.getByRole('button', { name: 'My children' }));
		await user.click(screen.getByRole('button', { name: 'Save & continue' }));
		await user.type(screen.getByRole('textbox', { name: 'Your place’s name' }), 'Morgan family');
		await user.click(screen.getByRole('button', { name: 'Save & continue' }));
		await screen.findByRole('heading', { name: 'Do you have a will?' }, { timeout: 1500 });

		const paperQuestion = document.querySelector('.question-stage');
		expect(screen.queryByRole('button', { name: 'Open Paper Port' })).not.toBeInTheDocument();
		expect(screen.queryByRole('button', { name: 'Open Money Meadow' })).not.toBeInTheDocument();
		await user.click(screen.getByRole('button', { name: 'Open Basecamp' }));
		expect(screen.getByText('Question 1 of 10')).toBeVisible();
		expect(screen.getByRole('heading', { name: 'Who are you preparing this for?' })).toBeVisible();
		expect(document.querySelector('.question-stage')).not.toBe(paperQuestion);
		expect(document.querySelector('.question-stage')).toHaveClass('screen-enter');

		const basecampQuestion = document.querySelector('.question-stage');
		await user.click(screen.getByRole('button', { name: 'Open Paper Port' }));
		expect(screen.getByRole('heading', { name: 'Do you have a will?' })).toBeVisible();
		expect(document.querySelector('.question-stage')).not.toBe(basecampQuestion);
		expect(document.querySelector('.question-stage')).toHaveClass('screen-enter');
		expect(screen.queryByRole('button', { name: 'Open Mount Vault' })).not.toBeInTheDocument();
	});

	test('keeps earned trail progress lit when revisiting an earlier chapter', async() => {
		const user = userEvent.setup();
		await beginSetup(user);

		await user.click(screen.getByRole('button', { name: 'My children' }));
		await user.click(screen.getByRole('button', { name: 'Save & continue' }));
		await user.type(screen.getByRole('textbox', { name: 'Your place’s name' }), 'Morgan family');
		await user.click(screen.getByRole('button', { name: 'Save & continue' }));
		await screen.findByRole('heading', { name: 'Do you have a will?' }, { timeout: 1500 });

		const firstTrailSegment = document.querySelector('.trail-segment-light');
		expect(firstTrailSegment).toHaveClass('lit');
		expect(screen.getByText('20% lit')).toBeVisible();
		await user.click(screen.getByRole('button', { name: 'Open Basecamp' }));

		expect(screen.getByRole('heading', { name: 'Who are you preparing this for?' })).toBeVisible();
		expect(firstTrailSegment).toHaveClass('lit');
		expect(screen.getByText('20% lit')).toBeVisible();
		expect(screen.queryByRole('button', { name: 'Open Basecamp' })).not.toBeInTheDocument();
	});

	test('keeps skipped chapters available without illuminating them as complete', async() => {
		const user = userEvent.setup();
		await beginSetup(user);

		await user.click(screen.getByRole('button', { name: 'My children' }));
		await user.click(screen.getByRole('button', { name: 'Save & continue' }));
		await user.type(screen.getByRole('textbox', { name: 'Your place’s name' }), 'Morgan family');
		await user.click(screen.getByRole('button', { name: 'Save & continue' }));
		for (let index = 0; index < 5; index += 1) {
			await user.click(screen.getByRole('button', { name: 'I’ll come back to this' }));
		}

		expect(screen.getByText('Question 8 of 10')).toBeVisible();
		expect(document.querySelector('.map-stop.kindred-grove')).toHaveClass('current', 'available');
		expect(document.querySelector('.map-stop.paper-port')).toHaveClass('available');
		expect(document.querySelector('.map-stop.paper-port')).not.toHaveClass('unlocked');
		expect(screen.getByRole('button', { name: 'Open Paper Port' })).toBeVisible();
		expect(document.querySelector('.map-stop.memory-lake')).toHaveClass('locked');
		expect(screen.queryByRole('button', { name: 'Open Memory Lake' })).not.toBeInTheDocument();
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

	test('offers real audio recording and selectable prompts on the messages page', async() => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(screen.getByRole('button', { name: 'Preview the app' }));
		await user.click(screen.getByRole('button', { name: 'Messages' }));

		expect(screen.getByRole('button', { name: 'Start recording' })).toBeVisible();
		const prompt = screen.getByRole('button', { name: /Tell the story behind something you treasure/ });
		await user.click(prompt);
		expect(prompt).toHaveAttribute('aria-pressed', 'true');
		expect(screen.getByRole('heading', { name: 'Tell the story behind something you treasure.' })).toBeVisible();
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
		expect(JSON.parse(window.localStorage.getItem(journeyProgressStorageKey))).toEqual({
			questionStatuses: { 0: 'answered' },
			completedQuickSteps: []
		});
	});

	test('shows one financial reference form for every selected institution', async() => {
		const user = userEvent.setup();
		await beginSetup(user);

		for (let index = 0; index < 4; index += 1) {
			await user.click(screen.getByRole('button', { name: 'I’ll come back to this' }));
		}
		await user.click(screen.getByRole('button', { name: /Chase$/ }));
		await user.click(screen.getByRole('button', { name: /Capital One$/ }));
		await user.click(screen.getByRole('button', { name: 'Save & continue' }));

		expect(await screen.findByRole('heading', {
			name: 'Add a safe reference for each institution.'
		}, { timeout: 1500 })).toBeVisible();
		expect(screen.getByRole('group', { name: 'Reference for Chase' })).toBeVisible();
		expect(screen.getByRole('group', { name: 'Reference for Capital One' })).toBeVisible();
	});

	test('keeps skipped questions pending and lets the user return to them', async() => {
		const user = userEvent.setup();
		await beginSetup(user);

		for (let index = 0; index < 10; index += 1) {
			await user.click(screen.getByRole('button', { name: 'I’ll come back to this' }));
		}

		expect(document.querySelectorAll('.confetti i')).toHaveLength(9);
		await user.click(screen.getByRole('button', { name: 'Back to questions' }));
		expect(screen.getByText('Question 10 of 10')).toBeVisible();
		await user.click(screen.getByRole('button', { name: 'I’ll come back to this' }));
		await user.click(screen.getByRole('button', { name: 'Enter my OnePlace' }));
		const pendingQuestions = screen.getByRole('heading', { name: '10 questions saved for later.' }).closest('section');

		expect(screen.getByText('0% lit.')).toBeVisible();
		const viewAllButton = within(pendingQuestions).getByRole('button', { name: 'View all' });
		expect(viewAllButton).toHaveAttribute('aria-expanded', 'false');
		expect(within(pendingQuestions).queryByRole('button', { name: /Who are you preparing this for/ })).not.toBeInTheDocument();
		await user.click(viewAllButton);
		expect(viewAllButton).toHaveAttribute('aria-expanded', 'true');
		await user.click(within(pendingQuestions).getByRole('button', { name: /Who are you preparing this for/ }));
		expect(screen.getByRole('heading', { name: 'Who are you preparing this for?' })).toBeVisible();
		expect(document.querySelector('.journey-screen')).toHaveClass('screen-enter');
	});

	test('keeps the map trail mounted while completed segments illuminate', async() => {
		const user = userEvent.setup();
		await beginSetup(user);
		const trail = document.querySelector('.map-trail');
		const firstSegment = document.querySelector('.trail-segment-light');
		const journeyLayout = document.querySelector('.journey-layout');
		const firstQuestionStage = document.querySelector('.question-stage');
		expect(firstSegment).not.toHaveClass('lit');

		await user.click(screen.getByRole('button', { name: 'My children' }));
		await user.click(screen.getByRole('button', { name: 'Save & continue' }));
		await screen.findByRole('heading', { name: 'What should your family call this place?' }, { timeout: 1500 });
		expect(document.querySelector('.journey-layout')).toBe(journeyLayout);
		expect(document.querySelector('.question-stage')).not.toBe(firstQuestionStage);
		expect(document.querySelector('.question-stage')).toHaveClass('screen-enter');
		const secondQuestionStage = document.querySelector('.question-stage');
		await user.type(screen.getByRole('textbox', { name: 'Your place’s name' }), 'Morgan family');
		await user.click(screen.getByRole('button', { name: 'Save & continue' }));
		await screen.findByRole('heading', { name: 'Do you have a will?' }, { timeout: 1500 });

		expect(document.querySelector('.map-trail')).toBe(trail);
		expect(document.querySelector('.trail-segment-light')).toBe(firstSegment);
		expect(firstSegment).toHaveClass('lit');
		expect(document.querySelector('.question-stage')).not.toBe(secondQuestionStage);
		expect(document.querySelector('.question-stage')).toHaveClass('screen-enter');
	});

	test('closes the quick-step popup from its backdrop and close button', async() => {
		const user = userEvent.setup();
		seedCompletedOnboarding();
		render(<App />);
		await user.click(screen.getByRole('button', { name: 'Preview the app' }));

		await user.click(screen.getByRole('button', { name: 'Take today’s 3-minute step' }));
		expect(screen.getByRole('dialog', { name: 'Where can your family find device-access instructions?' })).toBeVisible();
		await user.click(screen.getAllByRole('button', { name: 'Close quick step' })[0]);
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

		await user.click(screen.getByRole('button', { name: 'Take today’s 3-minute step' }));
		await user.click(screen.getAllByRole('button', { name: 'Close quick step' })[1]);
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});
});
