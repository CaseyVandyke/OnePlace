import { useState } from 'react';
import Icon from '../components/icon';
import WorldMap from '../components/world-map';
import { pathStops } from '../constants/dashboard';
import { chapters, questions } from '../constants/journey';

const PathHomeView = ({ onContinue, onMapDestination, onResumeQuestion, progress, summary }) => {
	const [showPendingQuestions, setShowPendingQuestions] = useState(false);
	const nextQuestion = summary.nextQuestionIndex >= 0 ? questions[summary.nextQuestionIndex] : null;
	const nextQuestionWasSkipped = progress.questionStatuses[summary.nextQuestionIndex] === 'skipped';
	const progressLabel = nextQuestion
		? summary.completedSetupSteps === 0
			? 'Your first small step'
			: `${summary.completedSetupSteps} of ${summary.totalSetupSteps} setup steps complete`
		: 'Guided setup complete';
	const matchedPathStop = nextQuestion
		? pathStops.findIndex((stop) => stop.questionIndexes.includes(summary.nextQuestionIndex))
		: -1;
	const activePathStop = nextQuestion ? matchedPathStop : -1;
	const getStopProgress = (stop, index) => {
		const target = stop.questionIndexes.length;
		const completed = stop.questionIndexes.filter((questionIndex) => progress.questionStatuses[questionIndex] === 'answered').length;
		const visited = stop.questionIndexes.some((questionIndex) => progress.questionStatuses[questionIndex]);
		const complete = completed === target;
		const current = index === activePathStop;
		const available = complete || current || visited;
		const state = complete ? 'complete' : current ? 'current' : available ? 'available' : 'locked';
		const resumeQuestion = stop.questionIndexes.find((questionIndex) => progress.questionStatuses[questionIndex] !== 'answered')
			?? stop.questionIndexes[0];
		const onSelect = current
			? onContinue
			: available && resumeQuestion !== undefined ? () => onResumeQuestion(resumeQuestion) : null;
		const actionLabel = current ? 'Continue' : complete ? 'Review' : 'Return';

		return { actionLabel, completed, onSelect, state, target };
	};

	return (
		<div className='path-page'>
			<section className='path-intro'>
				<div>
					<span className='hello-pill'><i /> {progressLabel}</span>
					<h1>Your path is<br /><em>{summary.setupPercentComplete}% lit.</em></h1>
					<p>One thoughtful answer today will make the path clearer for your family tomorrow.</p>
				</div>
				<div className='path-map-navigation'>
					<p className='map-navigation-hint'><Icon name='spark' size={18} /> Choose a reached place to open it.</p>
					<WorldMap
						allowCurrentSelection
						availableChapter={summary.availableChapter}
						chapter={summary.currentChapter}
						compact
						onSelectStop={onMapDestination}
					/>
				</div>
			</section>
			<section className='today-quest'>
				<div className='quest-number'>
					<span>{nextQuestion ? summary.answeredQuestions.length : 3}</span>
					<small>{nextQuestion ? 'DONE' : 'MIN'}</small>
				</div>
				<div>
					<p>
						{nextQuestion
							? `${nextQuestionWasSkipped ? 'COME BACK TO THIS' : 'CONTINUE SETUP'} · ${chapters[nextQuestion.chapter].name}`
							: 'NEXT RECOMMENDED · MOUNT VAULT'}
					</p>
					<h2>{nextQuestion ? nextQuestion.title : 'Add where device-access instructions are kept.'}</h2>
					<span>{nextQuestion ? nextQuestion.copy : 'Record only the safe location—not a password or access code.'}</span>
				</div>
				<button onClick={onContinue}>{nextQuestionWasSkipped ? 'Return to it' : 'Let’s do it'} <Icon name='arrow' /></button>
			</section>
			{summary.skippedQuestions.length > 0 && (
				<section className='pending-questions' aria-labelledby='pending-questions-title'>
					<header>
						<div>
							<p>COME BACK TO THIS</p>
							<h2 id='pending-questions-title'>
								{summary.skippedQuestions.length} {summary.skippedQuestions.length === 1 ? 'question' : 'questions'} saved for later.
							</h2>
						</div>
						<button
							aria-controls='pending-question-list'
							aria-expanded={showPendingQuestions}
							className='pending-toggle'
							onClick={() => setShowPendingQuestions((shown) => !shown)}
							type='button'
						>
							{showPendingQuestions ? 'Hide questions' : 'View all'}
							<Icon name={showPendingQuestions ? 'back' : 'arrow'} size={18} />
						</button>
					</header>
					{showPendingQuestions && (
						<div className='pending-question-list screen-enter' id='pending-question-list'>
							{summary.skippedQuestions.map((questionIndex) => (
								<button onClick={() => onResumeQuestion(questionIndex)} key={questionIndex}>
									<span>{chapters[questions[questionIndex].chapter].name}</span>
									<strong>{questions[questionIndex].title}</strong>
									<Icon name='arrow' />
								</button>
							))}
						</div>
					)}
				</section>
			)}
			<section className='path-section'>
				<div className='path-heading'>
					<div><p>YOUR JOURNEY</p><h2>A little clearer with every stop.</h2></div>
					<span>{summary.completedSetupSteps} of {summary.totalSetupSteps} setup steps complete</span>
				</div>
				<div className='winding-path'>
					<svg viewBox='0 0 900 900' preserveAspectRatio='none' aria-hidden='true'>
						<path d='M160 0 C160 100 730 70 730 190 S170 285 170 390 S730 480 730 570 S170 660 170 730 S730 820 730 900' />
					</svg>
					{pathStops.map((stop, index) => {
						const stopProgress = getStopProgress(stop, index);
						const Stop = stopProgress.onSelect ? 'button' : 'article';
						return (
							<Stop
								aria-label={stopProgress.onSelect ? `${stopProgress.actionLabel} ${stop.chapter}` : undefined}
								className={`path-stop ${stopProgress.onSelect ? 'path-stop-button' : ''} stop-${index} ${stopProgress.state}`}
								key={stop.chapter}
								onClick={stopProgress.onSelect || undefined}
								type={stopProgress.onSelect ? 'button' : undefined}
							>
								<span className='stop-icon'>{stopProgress.state === 'complete' ? <Icon name='check' /> : <Icon name={stop.icon} />}</span>
								<div><p>{stop.chapter}</p><h3>{stop.title}</h3><span>{stop.copy}</span></div>
								<small>{stopProgress.completed} of {stopProgress.target}</small>
								<span className='path-stop-action'>
									{stopProgress.onSelect
										? <>{stopProgress.actionLabel} <Icon name='arrow' size={15} /></>
										: <><Icon name='lock' size={15} /> Not reached yet</>}
								</span>
							</Stop>
						);
					})}
				</div>
			</section>
			{summary.completedSetupSteps > 0 && (
				<section className='achievement-strip'>
					<div>
						<Icon name='check' size={27} />
						<span><small>PROGRESS SAVED</small><strong>{summary.setupPercentComplete}% of your setup path is lit</strong></span>
					</div>
					<p>Your completed steps stay marked while skipped questions wait for you.</p>
				</section>
			)}
		</div>
	);
};

export default PathHomeView;
