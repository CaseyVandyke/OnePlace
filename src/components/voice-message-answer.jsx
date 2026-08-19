import AudioRecorder from './audio-recorder';

const VoiceMessageAnswer = ({ value, onChange }) => {
	return (
		<div className='voice-answer'>
			<AudioRecorder
				value={value}
				onChange={onChange}
				title='If you’re listening to this…'
				description='Start with those words, then say whatever feels important. Nothing has to be perfect—just sound like you.'
			/>
		</div>
	);
};

export default VoiceMessageAnswer;
