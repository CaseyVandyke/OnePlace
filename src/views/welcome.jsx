import AccountMenu from '../components/account-menu';
import Icon from '../components/icon';
import Logo from '../components/logo';

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
					<div className='welcome-promises'>
						<span><Icon name='clock' /> Go at your pace</span>
						<span><Icon name='shield' /> You choose who sees what</span>
						<span><Icon name='heart' /> Pause anytime</span>
					</div>
				</div>
			</section>
		</section>
	);
};

export default WelcomeView;
