import Icon from '../components/icon';
import WorldMap from '../components/world-map';
import { pathStops } from '../constants/dashboard';

const PathHomeView = ({ guide, onContinue }) => {
	return (
		<div className='path-page'>
			<section className='path-intro'>
				<div>
					<span className='hello-pill'><i /> Wednesday’s small win</span>
					<h1>Your place is<br /><em>42% glowing.</em></h1>
					<p>One thoughtful answer today will make the path clearer for your family tomorrow.</p>
					<button className='continue-button' onClick={onContinue}>Take today’s 3-minute step <Icon name='arrow' /></button>
				</div>
				<WorldMap guide={guide} chapter={2} compact />
			</section>
			<section className='today-quest'>
				<div className='quest-number'>
					<span>+20</span>
					<small>GLOW</small>
				</div>
				<div>
					<p>TODAY’S STEP · MONEY MAP</p>
					<h2>Add where your retirement account is held.</h2>
					<span>We only need the institution to start. Details can come later.</span>
				</div>
				<button onClick={onContinue}>Let’s do it <Icon name='arrow' /></button>
			</section>
			<section className='path-section'>
				<div className='path-heading'>
					<div><p>YOUR JOURNEY</p><h2>A little clearer with every stop.</h2></div>
					<span>7 of 23 essentials cared for</span>
				</div>
				<div className='winding-path'>
					<svg viewBox='0 0 900 720' preserveAspectRatio='none' aria-hidden='true'>
						<path d='M160 0 C160 100 730 70 730 190 S170 285 170 390 S730 480 730 570 S380 690 160 720' />
					</svg>
					{pathStops.map((stop, index) => (
						<article className={`path-stop stop-${index} ${stop.state}`} key={stop.chapter}>
							<span className='stop-icon'>{stop.state === 'complete' ? <Icon name='check' /> : <Icon name={stop.icon} />}</span>
							<div><p>{stop.chapter}</p><h3>{stop.title}</h3><span>{stop.copy}</span></div>
							<small>{stop.count}</small>
							{stop.state === 'current' && <button onClick={onContinue}>Continue <Icon name='arrow' size={15} /></button>}
						</article>
					))}
				</div>
			</section>
			<section className='achievement-strip'>
				<div>
					<Icon name='gift' size={27} />
					<span><small>NEW KEEPSAKE</small><strong>The Trail Starter</strong></span>
				</div>
				<p>You mapped your first account and gave your family a clear place to begin.</p>
				<div className='badge-stack'>
					<i /><i /><i /><span>+2</span>
				</div>
			</section>
		</div>
	);
};

export default PathHomeView;
