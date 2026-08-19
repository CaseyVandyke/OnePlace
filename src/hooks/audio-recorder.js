import { useEffect, useMemo, useRef, useState } from 'react';

const maximumRecordingSeconds = 300;
export const microphoneReuseMilliseconds = 30000;

const getAudioExtension = (mimeType = '') => {
	if (mimeType.includes('mp4')) return 'm4a';
	if (mimeType.includes('ogg')) return 'ogg';
	if (mimeType.includes('wav')) return 'wav';
	return 'webm';
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

/**
 * Owns microphone permissions, MediaRecorder state, timers, and object URLs.
 * The recording value remains controlled by the parent so the same recorder
 * can be used during onboarding and from the Messages view.
 */
const useAudioRecorder = ({ onChange, value }) => {
	const [status, setStatus] = useState('idle');
	const [elapsedSeconds, setElapsedSeconds] = useState(0);
	const [error, setError] = useState('');
	const mediaRecorderRef = useRef(null);
	const streamRef = useRef(null);
	const timerRef = useRef(null);
	const releaseTimerRef = useRef(null);
	const startedAtRef = useRef(0);
	const canRecord = typeof window.MediaRecorder !== 'undefined' && Boolean(navigator.mediaDevices?.getUserMedia);
	const playbackUrl = useMemo(() => (
		value?.blob ? window.URL.createObjectURL(value.blob) : ''
	), [value]);
	const downloadName = value?.name || `oneplace-voice-message.${getAudioExtension(value?.mimeType)}`;

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

	const stopRecording = () => {
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

	const addAudioFile = (file) => {
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
	};

	const removeRecording = () => {
		window.clearTimeout(releaseTimerRef.current);
		stopStream(streamRef.current);
		streamRef.current = null;
		setElapsedSeconds(0);
		setError('');
		onChange(null);
	};

	const prepareToRecordAgain = () => {
		setElapsedSeconds(0);
		setError('');
		onChange(null);
	};

	return {
		addAudioFile,
		downloadName,
		elapsedSeconds,
		error,
		isRecording: status === 'recording',
		isRequesting: status === 'requesting',
		playbackUrl,
		prepareToRecordAgain,
		removeRecording,
		startRecording,
		stopRecording
	};
};

export default useAudioRecorder;
