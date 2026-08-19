import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from './icon';

const maximumRecordingSeconds = 300;
const microphoneReuseMilliseconds = 30000;

const getAudioExtension = (mimeType = '') => {
	if (mimeType.includes('mp4')) return 'm4a';
	if (mimeType.includes('ogg')) return 'ogg';
	if (mimeType.includes('wav')) return 'wav';
	return 'webm';
};

const formatDuration = (seconds = 0) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
};

const stopStream = (stream) => {
	stream?.getTracks().forEach((track) => track.stop());
};

const setStreamEnabled = (stream, enabled) => {
	stream?.getTracks().forEach((track) => {
		track.enabled = enabled;
	});
};

const canReuseStream = (stream) => (
	stream?.getTracks().some((track) => track.readyState !== 'ended') ?? false
);

const AudioRecorder = ({ description, onChange, title, value, variant = 'light' }) => {
	const [status, setStatus] = useState('idle');
	const [elapsedSeconds, setElapsedSeconds] = useState(0);
	const [error, setError] = useState('');
	const fileInputRef = useRef(null);
	const mediaRecorderRef = useRef(null);
	const streamRef = useRef(null);
	const timerRef = useRef(null);
	const releaseTimerRef = useRef(null);
	const startedAtRef = useRef(0);
	const canRecord = typeof window.MediaRecorder !== 'undefined' && Boolean(navigator.mediaDevices?.getUserMedia);
	const playbackUrl = useMemo(() => (
		value?.blob ? window.URL.createObjectURL(value.blob) : ''
	), [value]);

	useEffect(() => () => {
		if (playbackUrl) window.URL.revokeObjectURL(playbackUrl);
	}, [playbackUrl]);

	useEffect(() => () => {
		window.clearInterval(timerRef.current);
		window.clearTimeout(releaseTimerRef.current);
		const recorder = mediaRecorderRef.current;
		if (recorder && recorder.state !== 'inactive') {
			recorder.onstop = null;
			recorder.stop();
		}
		stopStream(streamRef.current);
	}, []);

	const finishRecording = () => {
		const recorder = mediaRecorderRef.current;
		if (recorder?.state === 'recording') recorder.stop();
	};

	const startRecording = async() => {
		if (status !== 'idle') return;
		if (!canRecord) {
			setError('Microphone recording needs HTTPS and a supported browser. You can add an audio file instead.');
			return;
		}

		setError('');
		setStatus('requesting');

		try {
			window.clearTimeout(releaseTimerRef.current);
			const stream = canReuseStream(streamRef.current)
				? streamRef.current
				: await navigator.mediaDevices.getUserMedia({ audio: true });
			setStreamEnabled(stream, true);
			const recorder = new window.MediaRecorder(stream);
			const chunks = [];
			if (value?.blob) onChange(null);
			streamRef.current = stream;
			mediaRecorderRef.current = recorder;

			recorder.ondataavailable = (event) => {
				if (event.data?.size) chunks.push(event.data);
			};
			recorder.onstop = () => {
				const duration = Math.max(1, Math.round((Date.now() - startedAtRef.current) / 1000));
				const mimeType = recorder.mimeType || chunks[0]?.type || 'audio/webm';
				window.clearInterval(timerRef.current);
				setStreamEnabled(stream, false);
				mediaRecorderRef.current = null;
				releaseTimerRef.current = window.setTimeout(() => {
					if (streamRef.current === stream && !mediaRecorderRef.current) {
						stopStream(stream);
						streamRef.current = null;
					}
				}, microphoneReuseMilliseconds);
				setElapsedSeconds(duration);
				setStatus('idle');
				onChange({
					blob: new Blob(chunks, { type: mimeType }),
					duration,
					mimeType,
					name: `oneplace-voice-message.${getAudioExtension(mimeType)}`
				});
			};

			startedAtRef.current = Date.now();
			setElapsedSeconds(0);
			setStatus('recording');
			recorder.start();
			timerRef.current = window.setInterval(() => {
				const duration = Math.min(
					maximumRecordingSeconds,
					Math.floor((Date.now() - startedAtRef.current) / 1000)
				);
				setElapsedSeconds(duration);
				if (duration >= maximumRecordingSeconds && recorder.state === 'recording') recorder.stop();
			}, 250);
		} catch (recordingError) {
			stopStream(streamRef.current);
			streamRef.current = null;
			mediaRecorderRef.current = null;
			setStatus('idle');
			setError(recordingError?.name === 'NotAllowedError'
				? 'Microphone access was not allowed. Enable it in your browser settings or add an audio file instead.'
				: 'We could not start the microphone. You can try again or add an audio file instead.');
		}
	};

	const chooseAudioFile = () => fileInputRef.current?.click();
	const addAudioFile = (event) => {
		const file = event.target.files?.[0];
		if (!file) return;
		window.clearTimeout(releaseTimerRef.current);
		stopStream(streamRef.current);
		streamRef.current = null;
		setError('');
		onChange({
			blob: file,
			duration: 0,
			mimeType: file.type,
			name: file.name
		});
		event.target.value = '';
	};
	const removeRecording = () => {
		window.clearTimeout(releaseTimerRef.current);
		stopStream(streamRef.current);
		streamRef.current = null;
		setElapsedSeconds(0);
		setError('');
		onChange(null);
	};

	return (
		<div className={`audio-recorder audio-recorder-${variant}`}>
			<input
				ref={fileInputRef}
				className='audio-file-input'
				type='file'
				accept='audio/*'
				onChange={addAudioFile}
				aria-label='Choose an audio file'
			/>
			{value?.blob ? (
				<div className='audio-ready'>
					<span className='audio-ready-icon'><Icon name='check' size={27} /></span>
					<div className='audio-ready-copy'>
						<strong>{title || 'Your recording is ready'}</strong>
						<span>{value.name || 'Voice message'}{value.duration ? ` · ${formatDuration(value.duration)}` : ''}</span>
					</div>
					{/* A caption track cannot be generated for an unsaved recording in this prototype. */}
					{/* eslint-disable-next-line jsx-a11y/media-has-caption */}
					<audio controls preload='metadata' src={playbackUrl} aria-label='Play your voice message' />
					<div className='audio-actions'>
						<a href={playbackUrl} download={value.name || `oneplace-voice-message.${getAudioExtension(value.mimeType)}`}>
							<Icon name='download' size={18} /> Download
						</a>
						<button type='button' onClick={startRecording} disabled={status === 'requesting'}>
							<Icon name='mic' size={18} /> {status === 'requesting' ? 'Opening microphone…' : 'Record again'}
						</button>
						<button type='button' className='remove-audio' onClick={removeRecording}><Icon name='trash' size={18} /> Delete</button>
					</div>
				</div>
			) : (
				<>
					<button
						type='button'
						className={`record-audio-button ${status === 'recording' ? 'recording' : ''}`}
						onClick={status === 'recording' ? finishRecording : startRecording}
						disabled={status === 'requesting'}
						aria-label={status === 'recording' ? 'Stop recording' : 'Start recording'}
					>
						<Icon name={status === 'recording' ? 'stop' : 'mic'} size={29} />
						<i />
						<i />
					</button>
					<strong aria-live='polite'>{status === 'recording' ? 'Recording your message…' : status === 'requesting' ? 'Opening your microphone…' : title}</strong>
					<p>{status === 'recording' ? `${formatDuration(elapsedSeconds)} of 5:00 maximum` : description}</p>
					<button type='button' className='choose-audio-file' onClick={chooseAudioFile}>Add an audio file instead</button>
				</>
			)}
			{error && <p className='audio-error' role='alert'>{error}</p>}
			<p className='audio-privacy'><Icon name='lock' size={16} /> The microphone turns off after recording. Your audio stays in this browser session for the prototype.</p>
		</div>
	);
};

export default AudioRecorder;
