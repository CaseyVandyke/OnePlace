import { useEffect, useState } from 'react';
import CompleteView from './views/complete';
import JourneyIntroView from './views/journey-intro';
import MainAppView from './views/main-app';
import SetupJourneyView from './views/setup-journey';
import WelcomeView from './views/welcome';
import useCompanionGuide from './hooks/companion-guide';
import useScrollToTop from './hooks/scroll-to-top';
import { screens } from './constants/navigation';

const App = () => {
	const [screen, setScreen] = useState(screens.WELCOME);
	const [points, setPoints] = useState(0);
	const [guide, selectGuide] = useCompanionGuide();

	useEffect(() => {
		const previousRestoration = window.history.scrollRestoration;
		window.history.scrollRestoration = 'manual';

		return () => {
			window.history.scrollRestoration = previousRestoration;
		};
	}, []);

	useScrollToTop(screen);
	const showWelcome = () => setScreen(screens.WELCOME);
	const showIntroduction = () => setScreen(screens.INTRO);
	const showJourney = () => setScreen(screens.JOURNEY);
	const showApp = () => setScreen(screens.APP);
	const completeJourney = (earnedPoints) => {
		setPoints(earnedPoints);
		setScreen(screens.COMPLETE);
	};

	let content;
	if (screen === screens.WELCOME) {
		content = <WelcomeView guide={guide} onStart={showIntroduction} onPreview={showApp} />;
	} else if (screen === screens.INTRO) {
		content = <JourneyIntroView guide={guide} onSelectGuide={selectGuide} onSkip={showJourney} onContinue={showJourney} />;
	} else if (screen === screens.JOURNEY) {
		content = <SetupJourneyView guide={guide} onExit={showWelcome} onComplete={completeJourney} />;
	} else if (screen === screens.COMPLETE) {
		content = <CompleteView guide={guide} points={points} onEnter={showApp} />;
	} else {
		content = <MainAppView guide={guide} onSelectGuide={selectGuide} onRestart={showWelcome} />;
	}

	return <main className='app-shell'>{content}</main>;
};

export default App;
