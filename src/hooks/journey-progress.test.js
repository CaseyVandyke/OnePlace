import { describe, expect, test } from 'vitest';
import { summarizeJourneyProgress } from './journey-progress';

describe('summarizeJourneyProgress', () => {
	test('starts at Basecamp with no completed essentials', () => {
		const summary = summarizeJourneyProgress({ questionStatuses: {}, completedQuickSteps: [] });

		expect(summary.percentComplete).toBe(0);
		expect(summary.currentChapter).toBe(0);
		expect(summary.nextQuestionIndex).toBe(0);
	});

	test('keeps a skipped question pending without counting it as complete', () => {
		const questionStatuses = Object.fromEntries(
			Array.from({ length: 10 }, (_, index) => [index, index === 4 ? 'skipped' : 'answered'])
		);
		const summary = summarizeJourneyProgress({ questionStatuses, completedQuickSteps: [] });

		expect(summary.completedEssentials).toBe(9);
		expect(summary.percentComplete).toBe(39);
		expect(summary.nextQuestionIndex).toBe(4);
		expect(summary.currentChapter).toBe(2);
		expect(summary.skippedQuestions).toEqual([4]);
	});

	test('recommends Mount Vault after every onboarding question is answered', () => {
		const questionStatuses = Object.fromEntries(
			Array.from({ length: 10 }, (_, index) => [index, 'answered'])
		);
		const summary = summarizeJourneyProgress({ questionStatuses, completedQuickSteps: [] });

		expect(summary.completedEssentials).toBe(10);
		expect(summary.percentComplete).toBe(43);
		expect(summary.nextQuestionIndex).toBe(-1);
		expect(summary.currentChapter).toBe(6);
	});
});
