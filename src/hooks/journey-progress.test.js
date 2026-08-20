import { describe, expect, test } from 'vitest';
import { summarizeJourneyProgress } from './journey-progress';

describe('summarizeJourneyProgress', () => {
	test('starts at Basecamp with no completed setup steps', () => {
		const summary = summarizeJourneyProgress({ questionStatuses: {}, completedQuickSteps: [] });

		expect(summary.setupPercentComplete).toBe(0);
		expect(summary.availableChapter).toBe(0);
		expect(summary.currentChapter).toBe(0);
		expect(summary.nextQuestionIndex).toBe(0);
	});

	test('keeps a skipped question pending without counting it as complete', () => {
		const questionStatuses = Object.fromEntries(
			Array.from({ length: 10 }, (_, index) => [index, index === 4 ? 'skipped' : 'answered'])
		);
		const summary = summarizeJourneyProgress({ questionStatuses, completedQuickSteps: [] });

		expect(summary.completedSetupSteps).toBe(9);
		expect(summary.setupPercentComplete).toBe(90);
		expect(summary.nextQuestionIndex).toBe(4);
		expect(summary.currentChapter).toBe(2);
		expect(summary.availableChapter).toBe(5);
		expect(summary.skippedQuestions).toEqual([4]);
	});

	test('recommends Mount Vault after every onboarding question is answered', () => {
		const questionStatuses = Object.fromEntries(
			Array.from({ length: 10 }, (_, index) => [index, 'answered'])
		);
		const summary = summarizeJourneyProgress({ questionStatuses, completedQuickSteps: [] });

		expect(summary.completedSetupSteps).toBe(10);
		expect(summary.setupPercentComplete).toBe(100);
		expect(summary.nextQuestionIndex).toBe(-1);
		expect(summary.currentChapter).toBe(6);
		expect(summary.availableChapter).toBe(6);
	});

	test('keeps post-setup quick steps separate from guided setup progress', () => {
		const summary = summarizeJourneyProgress({
			questionStatuses: { 0: 'answered' },
			completedQuickSteps: ['device-access-location']
		});

		expect(summary.completedSetupSteps).toBe(1);
		expect(summary.setupPercentComplete).toBe(10);
	});
});
