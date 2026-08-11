import { useMemo, useState } from 'react';
import Icon from '../components/icon';
import Logo from '../components/logo';
import QuestionBody from '../components/question-body';
import WorldMap from '../components/world-map';
import { chapters, questions } from '../constants/journey';
import useScrollToTop from '../hooks/scroll-to-top';

const JourneyHeader = ({ current, points, onExit }) => {
	const chapter = questions[current]?.chapter ?? 0;
	return (
		<header className='site-header journey-header'>
			<Logo onClick={onExit} />
			<div className='chapter-track'>
				{chapters.map((item, index) => (
					<div className={`${index < chapter ? 'complete' : ''} ${index === chapter ? 'current' : ''}`} key={item.name}>
						<span>{index < chapter ? <Icon name='check' size={13} /> : index + 1}</span>
						<small>{item.name}</small>
					</div>
				))}
			</div>
			<div className={`journey-points ${points > 0 ? 'glow-added' : ''}`} key={points}>
				<Icon name='spark' size={16} />
				<strong>{points}</strong>
				<span>glow</span>
			</div>
			<button className='exit-button' onClick={onExit} aria-label='Exit setup'><Icon name='close' /></button>
		</header>
	);
};

const SetupJourneyView = ({ guide, onComplete, onExit }) => {
	const [current, setCurrent] = useState(0);
	const [answers, setAnswers] = useState({});
	const [points, setPoints] = useState(0);
	const [uploaded, setUploaded] = useState('');
	const [reward, setReward] = useState(null);
	const question = questions[current];
	const answer = answers[current];
	useScrollToTop(current);

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
		const earned = question.reward;
		setPoints((value) => value + earned);
		setReward(earned);
		window.setTimeout(() => {
			setReward(null);
			if (current === questions.length - 1) onComplete(points + earned);
			else setCurrent((value) => value + 1);
		}, 780);
	};
	const updateAnswer = (value) => {
		setAnswers((currentAnswers) => ({ ...currentAnswers, [current]: value }));
	};
	const skipQuestion = () => {
		if (current === questions.length - 1) onComplete(points);
		else setCurrent((value) => value + 1);
	};

	return (
		<section className='journey-screen'>
			<JourneyHeader current={current} points={points} onExit={onExit} />
			<section className='journey-layout screen-enter' key={current}>
				<aside className='journey-place'>
					<div className='journey-place-copy'>
						<span>YOUR PLACE</span>
						<strong>{Math.round((current / questions.length) * 100)}% lit</strong>
					</div>
					<WorldMap guide={guide} chapter={question.chapter} reactionKey={current} compact />
					<div className='next-unlock'>
						<span><Icon name={chapters[question.chapter].icon} size={17} /></span>
						<div><small>NOW BUILDING</small><strong>{chapters[question.chapter].name}</strong></div>
					</div>
				</aside>
				<article className='question-stage'>
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
						uploadedFileName={uploaded}
						onUploadedFileNameChange={setUploaded}
					/>
					<div className='question-actions'>
						<button className='back-button' disabled={current === 0} onClick={() => setCurrent((value) => Math.max(0, value - 1))}><Icon name='back' size={18} /> Back</button>
						<button className='continue-button' disabled={!canContinue} onClick={continueJourney}>Save & continue <Icon name='arrow' size={18} /></button>
					</div>
					<button className='skip-question' onClick={skipQuestion}>I’ll come back to this</button>
				</article>
			</section>
			{reward && (
				<div className='reward-pop'>
					<span><Icon name='spark' size={24} /></span>
					<strong>+{reward} glow</strong>
					<small>Your OnePlace just got brighter</small>
				</div>
			)}
		</section>
	);
};

export default SetupJourneyView;
