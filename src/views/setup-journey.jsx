import { useMemo, useState } from 'react';
import Icon from '../components/icon';
import Logo from '../components/logo';
import QuestionBody from '../components/question-body';
import WorldMap from '../components/world-map';
import { chapters, questions } from '../constants/journey';
import useScrollToTop from '../hooks/scroll-to-top';

const bankQuestionIndex = questions.findIndex(({ type }) => type === 'banks');
const chapterQuestionIndexes = Object.fromEntries(chapters.map((chapter, chapterIndex) => [
	chapter.name,
	questions.findIndex((question) => question.chapter === chapterIndex)
]));
const guidedMapStops = Object.keys(chapterQuestionIndexes);

const JourneyHeader = ({ current, onExit, progressChapter }) => {
	const chapter = questions[current]?.chapter ?? 0;
	return (
		<header className='site-header journey-header'>
			<Logo onClick={onExit} />
			<p className='mobile-chapter-status'>
				<strong>{chapters[chapter].name}</strong>
				<span>· Chapter {chapter + 1} of {chapters.length}</span>
			</p>
			<div className='chapter-track'>
				{chapters.map((item, index) => {
					const complete = index < progressChapter;
					const currentChapter = index === chapter;
					return (
						<div className={`${complete ? 'complete' : ''} ${currentChapter ? 'current' : ''}`} key={item.name}>
							<span>{complete && !currentChapter ? <Icon name='check' size={13} /> : index + 1}</span>
							<small>{item.name}</small>
						</div>
					);
				})}
			</div>
			<button className='exit-button' onClick={onExit} aria-label='Exit setup'><Icon name='close' /></button>
		</header>
	);
};

const SetupJourneyView = ({ initialQuestion, journeyProgress, onComplete, onExit }) => {
	const [current, setCurrent] = useState(initialQuestion);
	const question = questions[current];
	const answer = journeyProgress.answers[current];
	const resetScroll = useScrollToTop(current);
	const showQuestion = (nextQuestion) => {
		resetScroll();
		setCurrent(nextQuestion);
	};
	const showMapDestination = (stopName) => {
		const questionIndex = chapterQuestionIndexes[stopName];
		if (questionIndex >= 0) showQuestion(questionIndex);
	};

	const canContinue = useMemo(() => {
		if (!answer) return false;
		if (Array.isArray(answer)) {
			if (!answer.length) return false;
			if (typeof answer[0] === 'object') return answer.some((entry) => Object.values(entry).some(Boolean));
			return true;
		}
		if (typeof answer === 'object') return Object.values(answer).some(Boolean);
		return String(answer).trim().length > 0;
	}, [answer]);

	const continueJourney = () => {
		if (!canContinue) return;
		journeyProgress.setQuestionStatus(current, 'answered');
		if (current === questions.length - 1) onComplete();
		else showQuestion(current + 1);
	};
	const updateAnswer = (value) => {
		journeyProgress.updateAnswer(current, value);
	};
	const skipQuestion = () => {
		journeyProgress.setQuestionStatus(current, 'skipped');
		if (current === questions.length - 1) onComplete();
		else showQuestion(current + 1);
	};

	return (
		<section className='journey-screen'>
			<JourneyHeader current={current} onExit={onExit} progressChapter={journeyProgress.summary.currentChapter} />
			<section className='journey-layout'>
				<aside className='journey-place'>
					<div className='journey-place-copy'>
						<span>YOUR PLACE</span>
						<strong>{journeyProgress.summary.setupPercentComplete}% lit</strong>
					</div>
					<WorldMap
						chapter={question.chapter}
						compact
						litChapter={journeyProgress.summary.currentChapter}
						onSelectStop={showMapDestination}
						selectableStops={guidedMapStops}
					/>
					<div className='next-unlock'>
						<span><Icon name={chapters[question.chapter].icon} size={17} /></span>
						<div><small>NOW BUILDING</small><strong>{chapters[question.chapter].name}</strong></div>
					</div>
				</aside>
				<article className='question-stage screen-enter' key={current}>
					<div className='question-counter'>
						<span>Question {current + 1} of {questions.length}</span>
						<i><b style={{ width: `${((current + 1) / questions.length) * 100}%` }} /></i>
						<small>About 4 min left</small>
					</div>
					<p className='question-eyebrow'>{question.eyebrow}</p>
					<h1>{question.title}</h1>
					<p className='question-copy'>{question.copy}</p>
					<QuestionBody
						question={question}
						value={answer}
						onChange={updateAnswer}
						selectedInstitutions={journeyProgress.answers[bankQuestionIndex]}
					/>
					<div className='question-actions'>
						<button className='back-button' disabled={current === 0} onClick={() => showQuestion(Math.max(0, current - 1))}><Icon name='back' size={18} /> Back</button>
						<button className='continue-button' disabled={!canContinue} onClick={continueJourney}>Save & continue <Icon name='arrow' size={18} /></button>
					</div>
					<button className='skip-question' onClick={skipQuestion}>I’ll come back to this</button>
				</article>
			</section>
		</section>
	);
};

export default SetupJourneyView;
