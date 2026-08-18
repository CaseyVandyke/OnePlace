import { useState } from 'react';
import AccountActions from './account-actions';
import Icon from './icon';
import Logo from './logo';
import MenuToggleIcon from './menu-toggle-icon';
import NorthStar from './north-star';
import { appNavigationItems } from '../constants/navigation';

const AppHeader = ({ active, onNavigate, onJourney, onHome }) => {
	const [menu, setMenu] = useState(false);
	const navigate = (view) => {
		onNavigate(view);
		setMenu(false);
	};

	return (
		<header className='site-header app-header'>
			<Logo onClick={onHome} />
			<nav id='app-navigation' className={menu ? 'open' : ''}>
				{appNavigationItems.map((item) => (
					<button className={active === item ? 'active' : ''} onClick={() => navigate(item)} key={item}>{item}</button>
				))}
				<AccountActions className='account-menu-actions' />
			</nav>
			<div className='app-header-actions'>
				<span className='app-glow'><Icon name='spark' size={15} /> 95 glow</span>
				<button onClick={onJourney}>Continue my path</button>
				<span className='app-journey-marker' role='img' aria-label='North Star journey marker'>
					<NorthStar size={38} />
				</span>
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
