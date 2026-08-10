import { useState } from 'react';
import Icon from './icon';
import { quickStepOptions } from '../constants/dashboard';

const MiniQuest = ({ onClose }) => {
	const [done, setDone] = useState(false);

	return (
		<div className='quest-overlay' role='dialog' aria-modal='true' aria-labelledby='mini-quest-title'>
			<button className='quest-backdrop' type='button' onClick={onClose} aria-label='Close quick step' />
			<div className='mini-quest'>
				<button className='quest-close' type='button' onClick={onClose} aria-label='Close quick step'><Icon name='close' /></button>
				{done ? (
					<div className='mini-done'>
						<span><Icon name='spark' size={27} /></span>
						<p>+20 GLOW</p>
						<h2 id='mini-quest-title'>Another light is on.</h2>
						<p>Your family will know exactly where to begin.</p>
						<button className='continue-button' onClick={onClose}>Back to my path <Icon name='arrow' /></button>
					</div>
				) : (
					<>
						<p className='question-eyebrow'>TODAY’S 3-MINUTE STEP</p>
						<h2 id='mini-quest-title'>Where is your retirement account held?</h2>
						<p>You can add more detail later. The institution is enough for today.</p>
						<div className='quick-options'>
							{quickStepOptions.map((option) => (
								<button onClick={() => setDone(true)} key={option}>
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
