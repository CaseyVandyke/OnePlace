import { useEffect, useState } from 'react';
import CompleteView from './views/complete';
import JourneyIntroView from './views/journey-intro';
import MainAppView from './views/main-app';
import SetupJourneyView from './views/setup-journey';
import WelcomeView from './views/welcome';
import useJourneyProgress from './hooks/journey-progress';
import useScrollToTop from './hooks/scroll-to-top';
import { questions } from './constants/journey';
import { screens } from './constants/navigation';

const App = () => {
	const [screen, setScreen] = useState(screens.WELCOME);
	const [screenChanging, setScreenChanging] = useState(false);
	const journeyProgress = useJourneyProgress();
	const [journeyQuestion, setJourneyQuestion] = useState(0);

	useEffect(() => {
		const previousRestoration = window.history.scrollRestoration;
		window.history.scrollRestoration = 'manual';

		return () => {
			window.history.scrollRestoration = previousRestoration;
		};
	}, []);

	const resetScroll = useScrollToTop(screen);
	const showScreen = (nextScreen) => {
		setScreenChanging(true);
		// Cover the outgoing screen while WebKit paints it once at the document
		// top. This preserves the Safari scroll-anchor fix without exposing the
		// old page's necessary scroll reset to the user.
		window.requestAnimationFrame(() => {
			resetScroll();
			window.requestAnimationFrame(() => {
				setScreen(nextScreen);
				setScreenChanging(false);
			});
		});
	};
	const showWelcome = () => showScreen(screens.WELCOME);
	const startNewJourney = () => {
		journeyProgress.resetJourney();
		showScreen(screens.INTRO);
	};
	const showJourney = (questionIndex = 0) => {
		setJourneyQuestion(questionIndex >= 0 ? questionIndex : 0);
		showScreen(screens.JOURNEY);
	};
	const showApp = () => showScreen(screens.APP);
	const completeJourney = () => showScreen(screens.COMPLETE);

	let content;
	if (screen === screens.WELCOME) {
		content = <WelcomeView onStart={startNewJourney} onPreview={showApp} />;
	} else if (screen === screens.INTRO) {
		content = <JourneyIntroView onSkip={() => showJourney()} onContinue={() => showJourney()} onHome={showWelcome} />;
	} else if (screen === screens.JOURNEY) {
		content = (
			<SetupJourneyView
				initialQuestion={journeyQuestion}
				journeyProgress={journeyProgress}
				onExit={showWelcome}
				onComplete={completeJourney}
			/>
		);
	} else if (screen === screens.COMPLETE) {
		content = (
			<CompleteView
				completedQuestions={journeyProgress.summary.answeredQuestions.length}
				onBack={() => showJourney(questions.length - 1)}
				onEnter={showApp}
				pendingQuestions={journeyProgress.summary.skippedQuestions.length}
			/>
		);
	} else {
		content = (
			<MainAppView
				journeyProgress={journeyProgress}
				onRestart={showWelcome}
				onResumeJourney={showJourney}
			/>
		);
	}

	return (
		<main className={`app-shell ${screenChanging ? 'screen-changing' : ''}`}>
			{content}
			<div className='screen-transition-cover' aria-hidden='true' />
		</main>
	);
};

export default App;
