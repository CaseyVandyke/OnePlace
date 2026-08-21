import AccountMenu from '../components/account-menu';
import Icon from '../components/icon';
import Logo from '../components/logo';
import WorldMap from '../components/world-map';

const WelcomeView = ({ onStart, onPreview }) => {
	return (
		<section className='welcome-screen'>
			<header className='site-header welcome-nav'>
				<Logo />
				<div className='welcome-meta'>
					<span><Icon name='lock' size={14} /> Private concept demo</span>
					<button onClick={onPreview}>Preview the app</button>
					<AccountMenu />
				</div>
			</header>
			<section className='welcome-layout screen-enter'>
				<div className='welcome-copy'>
					<span className='hello-pill'><i /> A kinder way to get prepared</span>
					<h1>Build the one place<br />they’ll know to look.</h1>
					<p>We’ll ask the questions, organize the answers, and help you leave less searching—and more of you.</p>
					<button className='journey-button' onClick={onStart}>Build my OnePlace <Icon name='arrow' /></button>
				</div>
				<div aria-label='A preview of the OnePlace journey map' className='welcome-map' role='img'>
					<WorldMap chapter={0} preview />
				</div>
				<div className='welcome-promises'>
					<span><Icon name='clock' /><span><strong>Go at your pace</strong><small>Take your time. Come back when you’re ready.</small></span></span>
					<span><Icon name='shield' /><span><strong>You choose who sees what</strong><small>You’re in control of your information and access.</small></span></span>
					<span><Icon name='heart' /><span><strong>Pause anytime</strong><small>Life happens. Your place will be here when you’re ready.</small></span></span>
				</div>
			</section>
		</section>
	);
};

export default WelcomeView;
