import { useRef } from 'react';
import useAudioRecorder from '../hooks/audio-recorder';
import '../styles/components/audio-recorder.css';
import Icon from './icon';

const formatDuration = (seconds = 0) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
};

const AudioRecorder = ({ description, onChange, title, value, variant = 'light' }) => {
	const fileInputRef = useRef(null);
	const {
		addAudioFile,
		downloadName,
		elapsedSeconds,
		error,
		isRecording,
		isRequesting,
		playbackUrl,
		prepareToRecordAgain,
		removeRecording,
		startRecording,
		stopRecording
	} = useAudioRecorder({ onChange, value });

	const chooseAudioFile = () => fileInputRef.current?.click();
	const handleAudioFile = (event) => {
		const file = event.target.files?.[0];
		if (!file) return;
		addAudioFile(file);
		event.target.value = '';
	};

	return (
		<div className={`audio-recorder audio-recorder-${variant}`}>
			<input
				ref={fileInputRef}
				className='audio-file-input'
				type='file'
				accept='audio/*'
				onChange={handleAudioFile}
				aria-label='Choose an audio file'
			/>
			{value?.blob ? (
				<div className='audio-ready screen-enter' key='recording-ready'>
					<span className='audio-ready-icon'><Icon name='check' size={27} /></span>
					<div className='audio-ready-copy'>
						<strong>{title || 'Your recording is ready'}</strong>
						<span>{value.name || 'Voice message'}{value.duration ? ` · ${formatDuration(value.duration)}` : ''}</span>
					</div>
					{/* A caption track cannot be generated for an unsaved recording in this prototype. */}
					{/* eslint-disable-next-line jsx-a11y/media-has-caption */}
					<audio controls preload='metadata' src={playbackUrl} aria-label='Play your voice message' />
					<div className='audio-actions'>
						<a href={playbackUrl} download={downloadName}>
							<Icon name='download' size={18} /> Download
						</a>
						<button type='button' onClick={prepareToRecordAgain}>
							<Icon name='mic' size={18} /> Record again
						</button>
						<button type='button' className='remove-audio' onClick={removeRecording}><Icon name='trash' size={18} /> Delete</button>
					</div>
				</div>
			) : (
				<div className='audio-capture screen-enter' key='recording-capture'>
					<button
						type='button'
						className={`record-audio-button ${isRecording ? 'recording' : ''}`}
						onClick={isRecording ? stopRecording : startRecording}
						disabled={isRequesting}
						aria-label={isRecording ? 'Stop recording' : 'Start recording'}
					>
						<Icon name={isRecording ? 'stop' : 'mic'} size={29} />
						<i />
						<i />
					</button>
					<strong aria-live='polite'>{isRecording ? 'Recording your message…' : isRequesting ? 'Opening your microphone…' : title}</strong>
					<p>{isRecording ? `${formatDuration(elapsedSeconds)} of 5:00 maximum` : description}</p>
					<button type='button' className='choose-audio-file' onClick={chooseAudioFile}>Add an audio file instead</button>
				</div>
			)}
			{error && <p className='audio-error' role='alert'>{error}</p>}
			<p className='audio-privacy'><Icon name='lock' size={16} /> The microphone turns off after recording. Your audio stays in this browser session for the prototype.</p>
		</div>
	);
};

export default AudioRecorder;
