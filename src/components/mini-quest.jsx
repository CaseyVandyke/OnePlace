import { useState } from 'react';
import Icon from './icon';
import { quickStepOptions } from '../constants/dashboard';

const MiniQuest = ({ onClose, onComplete }) => {
	const [done, setDone] = useState(false);
	const completeStep = () => {
		onComplete();
		setDone(true);
	};

	return (
		<div className='quest-overlay' role='dialog' aria-modal='true' aria-labelledby='mini-quest-title'>
			<button className='quest-backdrop' type='button' onClick={onClose} aria-label='Close quick step' />
			<div className='mini-quest'>
				<button className='quest-close' type='button' onClick={onClose} aria-label='Close quick step'><Icon name='close' /></button>
				{done ? (
					<div className='mini-done'>
						<span><Icon name='spark' size={27} /></span>
						<p>PATH UPDATED</p>
						<h2 id='mini-quest-title'>Another light is on.</h2>
						<p>Your family will know exactly where to begin.</p>
						<button className='continue-button' onClick={onClose}>Back to my path <Icon name='arrow' /></button>
					</div>
				) : (
					<>
						<p className='question-eyebrow'>TODAY’S 3-MINUTE STEP</p>
						<h2 id='mini-quest-title'>Where can your family find device-access instructions?</h2>
						<p>You do not need to add a password here. A safe location is enough for today.</p>
						<div className='quick-options'>
							{quickStepOptions.map((option) => (
								<button onClick={completeStep} key={option}>
									<span>{option.slice(0, 2).toUpperCase()}</span>
									<strong>{option}</strong>
									<Icon name='arrow' />
								</button>
							))}
						</div>
						<button className='skip-question' onClick={onClose}>Not today</button>
					</>
				)}
			</div>
		</div>
	);
};

export default MiniQuest;
