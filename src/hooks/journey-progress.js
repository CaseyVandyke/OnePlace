import { useCallback, useEffect, useMemo, useState } from 'react';
import { mapStops, questions } from '../constants/journey';

export const journeyProgressStorageKey = 'oneplace-journey-progress-v1';
const answered = 'answered';
const skipped = 'skipped';
const validStatuses = new Set([answered, skipped]);
const nextDestination = mapStops.findIndex((stop) => stop.name === 'Mount Vault');

const emptyProgress = {
	questionStatuses: {},
	completedQuickSteps: []
};

const normalizeProgress = (value) => {
	const questionStatuses = Object.fromEntries(
		Object.entries(value?.questionStatuses ?? {}).filter(([index, status]) => (
			Number(index) >= 0 && Number(index) < questions.length && validStatuses.has(status)
		))
	);
	const completedQuickSteps = Array.isArray(value?.completedQuickSteps)
		? [...new Set(value.completedQuickSteps.filter((step) => typeof step === 'string'))]
		: [];

	return { questionStatuses, completedQuickSteps };
};

const loadProgress = () => {
	try {
		const stored = window.localStorage.getItem(journeyProgressStorageKey);
		return stored ? normalizeProgress(JSON.parse(stored)) : emptyProgress;
	} catch {
		return emptyProgress;
	}
};

export const summarizeJourneyProgress = (progress) => {
	const normalized = normalizeProgress(progress);
	const answeredQuestions = questions
		.map((_, index) => index)
		.filter((index) => normalized.questionStatuses[index] === answered);
	const skippedQuestions = questions
		.map((_, index) => index)
		.filter((index) => normalized.questionStatuses[index] === skipped);
	const nextQuestionIndex = questions.findIndex((_, index) => normalized.questionStatuses[index] !== answered);
	const completedSetupSteps = answeredQuestions.length;
	const totalSetupSteps = questions.length;

	return {
		answeredQuestions,
		completedSetupSteps,
		currentChapter: nextQuestionIndex >= 0 ? questions[nextQuestionIndex].chapter : nextDestination,
		nextQuestionIndex,
		setupPercentComplete: Math.round((completedSetupSteps / totalSetupSteps) * 100),
		skippedQuestions,
		totalSetupSteps
	};
};

const useJourneyProgress = () => {
	const [progress, setProgress] = useState(loadProgress);
	const [answers, setAnswers] = useState({});

	useEffect(() => {
		window.localStorage.setItem(journeyProgressStorageKey, JSON.stringify(progress));
	}, [progress]);

	const setQuestionStatus = useCallback((index, status) => {
		setProgress((current) => ({
			...current,
			questionStatuses: { ...current.questionStatuses, [index]: status }
		}));
	}, []);

	const updateAnswer = useCallback((index, value) => {
		setAnswers((current) => ({ ...current, [index]: value }));
	}, []);

	const completeQuickStep = useCallback((step) => {
		setProgress((current) => ({
			...current,
			completedQuickSteps: current.completedQuickSteps.includes(step)
				? current.completedQuickSteps
				: [...current.completedQuickSteps, step]
		}));
	}, []);

	const summary = useMemo(() => summarizeJourneyProgress(progress), [progress]);

	return {
		answers,
		completeQuickStep,
		progress,
		setQuestionStatus,
		summary,
		updateAnswer
	};
};

export default useJourneyProgress;
