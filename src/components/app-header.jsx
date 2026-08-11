import { useState } from 'react';
import AccountActions from './account-actions';
import CompanionGuide from './companion-guide';
import Icon from './icon';
import Logo from './logo';
import MenuToggleIcon from './menu-toggle-icon';
import { appNavigationItems } from '../constants/navigation';

const AppHeader = ({ guide, guideButtonRef, active, onNavigate, onJourney, onChangeGuide, onHome }) => {
	const [menu, setMenu] = useState(false);
	const navigate = (view) => {
		onNavigate(view);
		setMenu(false);
	};

	return (
		<header className='app-header'>
			<Logo onClick={onHome} />
			<nav id='app-navigation' className={menu ? 'open' : ''}>
				{appNavigationItems.map((item) => (
					<button className={active === item ? 'active' : ''} onClick={() => navigate(item)} key={item}>{item}</button>
				))}
				<AccountActions className='account-menu-actions' />
			</nav>
			<div className='app-header-actions'>
				<span><Icon name='spark' size={15} /> 95 glow</span>
				<button onClick={onJourney}>Continue my path</button>
				<button ref={guideButtonRef} className='app-avatar' type='button' onClick={onChangeGuide} aria-label={`Change guide. Current guide: ${guide.name}`}>
					<CompanionGuide guideId={guide.id} size={36} />
				</button>
				<button
					className='mobile-menu'
					type='button'
					onClick={() => setMenu((current) => !current)}
					aria-label={menu ? 'Close navigation' : 'Open navigation'}
					aria-expanded={menu}
					aria-controls='app-navigation'
				>
					<MenuToggleIcon open={menu} />
				</button>
			</div>
		</header>
	);
};

export default AppHeader;
