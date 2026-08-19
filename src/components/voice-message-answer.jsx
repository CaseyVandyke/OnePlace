import AudioRecorder from './audio-recorder';

const VoiceMessageAnswer = ({ value, onChange }) => {
	return (
		<div className='voice-answer'>
			<AudioRecorder
				value={value}
				onChange={onChange}
				title='Record a short hello'
				description='Nothing has to be perfect. Just sound like you.'
			/>
		</div>
	);
};

export default VoiceMessageAnswer;
