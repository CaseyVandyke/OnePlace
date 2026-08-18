import { useEffect, useState } from 'react';
import CompleteView from './views/complete';
import JourneyIntroView from './views/journey-intro';
import MainAppView from './views/main-app';
import SetupJourneyView from './views/setup-journey';
import WelcomeView from './views/welcome';
import useScrollToTop from './hooks/scroll-to-top';
import { screens } from './constants/navigation';

const App = () => {
	const [screen, setScreen] = useState(screens.WELCOME);

	useEffect(() => {
		const previousRestoration = window.history.scrollRestoration;
		window.history.scrollRestoration = 'manual';

		return () => {
			window.history.scrollRestoration = previousRestoration;
		};
	}, []);

	const resetScroll = useScrollToTop(screen);
	const showScreen = (nextScreen) => {
		resetScroll();
		// Give WebKit one painted frame at the document top before replacing a
		// long screen with a shorter one. Otherwise it can preserve the tapped
		// element's previous scroll anchor on the new screen.
		window.requestAnimationFrame(() => {
			window.requestAnimationFrame(() => setScreen(nextScreen));
		});
	};
	const showWelcome = () => showScreen(screens.WELCOME);
	const showIntroduction = () => showScreen(screens.INTRO);
	const showJourney = () => showScreen(screens.JOURNEY);
	const showApp = () => showScreen(screens.APP);
	const completeJourney = () => showScreen(screens.COMPLETE);

	let content;
	if (screen === screens.WELCOME) {
		content = <WelcomeView onStart={showIntroduction} onPreview={showApp} />;
	} else if (screen === screens.INTRO) {
		content = <JourneyIntroView onSkip={showJourney} onContinue={showJourney} onHome={showWelcome} />;
	} else if (screen === screens.JOURNEY) {
		content = <SetupJourneyView onExit={showWelcome} onComplete={completeJourney} />;
	} else if (screen === screens.COMPLETE) {
		content = <CompleteView onEnter={showApp} />;
	} else {
		content = <MainAppView onRestart={showWelcome} />;
	}

	return <main className='app-shell'>{content}</main>;
};

export default App;
