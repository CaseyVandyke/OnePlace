import Icon from './icon';

const VoiceMessageAnswer = ({ value, onChange }) => {
	return (
		<div className='voice-answer'>
			<div className={`voice-orb ${value ? 'recorded' : ''}`}>
				<button onClick={() => onChange(value ? '' : 'recorded')}>
					<Icon name={value ? 'check' : 'mic'} size={27} />
				</button>
				<i />
				<i />
			</div>
			<strong>{value ? 'A little hello is ready' : 'Tap to record a demo message'}</strong>
			<p>{value ? '0:14 · For my family' : 'Nothing has to be perfect. Just sound like you.'}</p>
			{value && (
				<div className='voice-wave'>
					{Array.from({ length: 24 }).map((_, index) => (
						<i key={index} style={{ height: `${6 + ((index * 7) % 19)}px` }} />
					))}
				</div>
			)}
		</div>
	);
};

export default VoiceMessageAnswer;
