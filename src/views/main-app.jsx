import { useState } from 'react';
import AppHeader from '../components/app-header';
import Icon from '../components/icon';
import Logo from '../components/logo';
import MiniQuest from '../components/mini-quest';
import { appViews } from '../constants/navigation';
import useScrollToTop from '../hooks/scroll-to-top';
import MessagesView from './messages';
import PathHomeView from './path-home';
import PeopleView from './people';
import PossessionsView from './possessions';
import ThingsView from './things';

const MainAppView = ({ onRestart }) => {
	const [active, setActive] = useState(appViews.PATH);
	const [resume, setResume] = useState(false);
	const resetScroll = useScrollToTop(active);
	const showView = (nextView) => {
		resetScroll();
		setActive(nextView);
	};

	return (
		<section className='main-app'>
			<AppHeader
				active={active === appViews.POSSESSIONS ? appViews.THINGS : active}
				onNavigate={showView}
				onHome={onRestart}
				onJourney={() => setResume(true)}
			/>
			<div className='screen-enter' key={active}>
				{active === appViews.PATH && <PathHomeView onContinue={() => setResume(true)} />}
				{active === appViews.THINGS && (
					<ThingsView
						onContinue={() => setResume(true)}
						onPossessions={() => showView(appViews.POSSESSIONS)}
					/>
				)}
				{active === appViews.POSSESSIONS && <PossessionsView onBack={() => showView(appViews.THINGS)} />}
				{active === appViews.PEOPLE && <PeopleView />}
				{active === appViews.MESSAGES && <MessagesView />}
			</div>
			<footer className='app-footer'>
				<Logo />
				<p>Everything that matters, ready for the people who matter.</p>
				<button onClick={onRestart}><Icon name='logout' size={15} /> Replay first-time experience</button>
			</footer>
			{resume && <MiniQuest onClose={() => setResume(false)} />}
		</section>
	);
};

export default MainAppView;
