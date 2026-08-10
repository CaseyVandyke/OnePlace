import { useRef, useState } from 'react';
import CompanionGuide from '../components/companion-guide';
import GuideBubble from '../components/guide-bubble';
import GuidePicker from '../components/guide-picker';
import Icon from '../components/icon';
import Logo from '../components/logo';
import { getCompanionVoice } from '../constants/companion-guides';
import { journeyIntroSlides } from '../constants/journey';

const JourneyIntroView = ({ guide, onSelectGuide, onContinue, onSkip }) => {
	const [slide, setSlide] = useState(0);
	const [guidePickerOpen, setGuidePickerOpen] = useState(false);
	const guidePickerButtonRef = useRef(null);
	const item = journeyIntroSlides[slide];
	const isLast = slide === journeyIntroSlides.length - 1;
	const voice = getCompanionVoice(guide);
	const title = slide === 1 ? `Your ${guide.name} guide lights the way.` : item.title;
	const copy = slide === 1
		? `A friendly ${guide.name.toLowerCase()} will travel across your family map with you. Every finished task earns Glow and brings another important place to life.`
		: item.copy;

	return (
		<section className='journey-intro-screen' aria-labelledby='journey-intro-title'>
			<section className='journey-intro-card'>
				<header><Logo /><button onClick={onSkip}>Skip introduction</button></header>
				<div className='journey-intro-content'>
					<div className='journey-intro-art'>
						<span><Icon name={item.icon} size={38} /></span>
						{slide === 1 && (
							<div className='intro-companion'>
								<CompanionGuide guideId={guide.id} size={82} />
								<GuideBubble
									key={`intro-reaction-${guide.id}`}
									cue={voice.ready}
									simpleMessages={voice.simple}
									reactionKey={slide}
								/>
							</div>
						)}
						<i /><i /><i />
					</div>
					<div>
						<p className='question-eyebrow'>{item.eyebrow}</p>
						<h1 id='journey-intro-title'>{title}</h1>
						<p>{copy}</p>
						<aside><Icon name={slide === 2 ? 'lock' : 'heart'} size={20} /> {item.note}</aside>
						{slide === 1 && (
							<button ref={guidePickerButtonRef} className='choose-guide-button' type='button' onClick={() => setGuidePickerOpen(true)}>
								<CompanionGuide guideId={guide.id} size={36} />
								<span><strong>Choose another companion</strong><small>Optional · Current guide: {guide.name}</small></span>
								<Icon name='arrow' size={18} />
							</button>
						)}
					</div>
				</div>
				<footer>
					<div className='intro-dots' aria-label={`Introduction screen ${slide + 1} of ${journeyIntroSlides.length}`}>
						{journeyIntroSlides.map((_, index) => <i className={index === slide ? 'active' : ''} key={index} />)}
					</div>
					<div>
						<button className='back-button' disabled={slide === 0} onClick={() => setSlide((value) => value - 1)}><Icon name='back' size={18} /> Back</button>
						<button className='continue-button' onClick={() => isLast ? onContinue() : setSlide((value) => value + 1)}>
							{isLast ? 'Start my journey' : 'Next'} <Icon name='arrow' size={18} />
						</button>
					</div>
				</footer>
			</section>
			{guidePickerOpen && (
				<GuidePicker
					selectedGuideId={guide.id}
					onSelect={onSelectGuide}
					onClose={() => setGuidePickerOpen(false)}
					returnFocusRef={guidePickerButtonRef}
				/>
			)}
		</section>
	);
};

export default JourneyIntroView;
