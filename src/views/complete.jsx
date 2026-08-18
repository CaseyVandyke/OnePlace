import Icon from '../components/icon';
import Logo from '../components/logo';
import WorldMap from '../components/world-map';

const CompleteView = ({ points, onEnter }) => {
	return (
		<section className='complete-screen'>
			<div className='confetti'>
				{Array.from({ length: 18 }).map((_, index) => <i key={index} />)}
			</div>
			<Logo light />
			<section className='screen-enter'>
				<div className='complete-art'>
					<WorldMap chapter={5} compact />
				</div>
				<div className='complete-copy'>
					<span className='hello-pill'><Icon name='spark' size={15} /> First path complete</span>
					<h1>Look what you’ve<br />already made.</h1>
					<p>Your family now has a starting point. Keep going whenever you’re ready—OnePlace remembers the path.</p>
					<div className='complete-stats'>
						<div><strong>{points}</strong><span>glow earned</span></div>
						<div><strong>6</strong><span>places discovered</span></div>
						<div><strong>1</strong><span>person protected</span></div>
					</div>
					<button className='journey-button' onClick={onEnter}>Enter my OnePlace <Icon name='arrow' /></button>
				</div>
			</section>
		</section>
	);
};

export default CompleteView;
