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
	useScrollToTop(active);

	return (
		<section className='main-app'>
			<AppHeader
				active={active === appViews.POSSESSIONS ? appViews.THINGS : active}
				onNavigate={setActive}
				onHome={onRestart}
				onJourney={() => setResume(true)}
			/>
			<div className='screen-enter' key={active}>
				{active === appViews.PATH && <PathHomeView onContinue={() => setResume(true)} />}
				{active === appViews.THINGS && (
					<ThingsView
						onContinue={() => setResume(true)}
						onPossessions={() => setActive(appViews.POSSESSIONS)}
					/>
				)}
				{active === appViews.POSSESSIONS && <PossessionsView onBack={() => setActive(appViews.THINGS)} />}
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
