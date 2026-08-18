import { useState } from 'react';
import Icon from '../components/icon';
import Logo from '../components/logo';
import { journeyIntroSlides } from '../constants/journey';
import useScrollToTop from '../hooks/scroll-to-top';

const JourneyIntroView = ({ onContinue, onSkip, onHome }) => {
	const [slide, setSlide] = useState(0);
	const item = journeyIntroSlides[slide];
	const isLast = slide === journeyIntroSlides.length - 1;
	const resetScroll = useScrollToTop(slide);
	const showSlide = (nextSlide) => {
		resetScroll();
		setSlide(nextSlide);
	};

	return (
		<section className='journey-intro-screen' aria-labelledby='journey-intro-title'>
			<section className='journey-intro-card'>
				<header className='site-header'><Logo onClick={onHome} /><button onClick={onSkip}>Skip introduction</button></header>
				<div className='journey-intro-content screen-enter' key={slide}>
					<div className='journey-intro-art'>
						<span><Icon name={item.icon} size={38} /></span>
						<i /><i /><i />
					</div>
					<div>
						<p className='question-eyebrow'>{item.eyebrow}</p>
						<h1 id='journey-intro-title'>{item.title}</h1>
						<p>{item.copy}</p>
						<aside><Icon name={slide === 2 ? 'lock' : 'heart'} size={20} /> {item.note}</aside>
					</div>
				</div>
				<footer>
					<div className='intro-dots' aria-label={`Introduction screen ${slide + 1} of ${journeyIntroSlides.length}`}>
						{journeyIntroSlides.map((_, index) => <i className={index === slide ? 'active' : ''} key={index} />)}
					</div>
					<div>
						<button className='back-button' disabled={slide === 0} onClick={() => showSlide(slide - 1)}><Icon name='back' size={18} /> Back</button>
						<button className='continue-button' onClick={() => isLast ? onContinue() : showSlide(slide + 1)}>
							{isLast ? 'Start my journey' : 'Next'} <Icon name='arrow' size={18} />
						</button>
					</div>
				</footer>
			</section>
		</section>
	);
};

export default JourneyIntroView;
