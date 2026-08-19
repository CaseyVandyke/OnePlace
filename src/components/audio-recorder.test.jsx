import { useState } from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { microphoneReuseMilliseconds } from '../hooks/audio-recorder';
import AudioRecorder from './audio-recorder';

const getUserMedia = vi.fn();
const microphoneTrack = {
	enabled: true,
	readyState: 'live',
	stop: vi.fn()
};

class MockMediaRecorder {
	constructor() {
		this.mimeType = 'audio/webm';
		this.state = 'inactive';
	}

	start() {
		this.state = 'recording';
	}

	stop() {
		this.state = 'inactive';
		this.ondataavailable?.({ data: new Blob(['voice'], { type: this.mimeType }) });
		this.onstop?.();
	}
}

const RecorderHarness = () => {
	const [value, setValue] = useState(null);
	return (
		<AudioRecorder
			value={value}
			onChange={setValue}
			title='Record a hello'
			description='Say anything.'
		/>
	);
};

describe('AudioRecorder', () => {
	beforeEach(() => {
		microphoneTrack.enabled = true;
		microphoneTrack.readyState = 'live';
		microphoneTrack.stop.mockClear();
		getUserMedia.mockReset();
		getUserMedia.mockResolvedValue({ getTracks: () => [microphoneTrack] });
		Object.defineProperty(navigator, 'mediaDevices', {
			configurable: true,
			value: { getUserMedia }
		});
		Object.defineProperty(window, 'MediaRecorder', {
			configurable: true,
			value: MockMediaRecorder
		});
		Object.defineProperties(window.URL, {
			createObjectURL: { configurable: true, value: vi.fn(() => 'blob:voice-message') },
			revokeObjectURL: { configurable: true, value: vi.fn() }
		});
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	test('records, stops, and prepares playback', async() => {
		const user = userEvent.setup();
		const view = render(<RecorderHarness />);

		await user.click(screen.getByRole('button', { name: 'Start recording' }));
		expect(getUserMedia).toHaveBeenCalledWith({ audio: true });
		expect(await screen.findByRole('button', { name: 'Stop recording' })).toBeVisible();

		await user.click(screen.getByRole('button', { name: 'Stop recording' }));

		expect(await screen.findByLabelText('Play your voice message')).toHaveAttribute('src', 'blob:voice-message');
		expect(screen.getByRole('link', { name: /Download/ })).toHaveAttribute('download', 'oneplace-voice-message.webm');
		expect(screen.getByRole('button', { name: /Record again/ })).toBeVisible();
		expect(screen.getByRole('button', { name: /Delete/ })).toBeVisible();
		expect(microphoneTrack.enabled).toBe(false);

		await user.click(screen.getByRole('button', { name: /Record again/ }));

		const startAgainButton = await screen.findByRole('button', { name: 'Start recording' });
		expect(startAgainButton).toBeVisible();
		expect(startAgainButton.closest('.screen-enter')).toHaveClass('audio-capture');
		expect(getUserMedia).toHaveBeenCalledTimes(1);
		expect(microphoneTrack.enabled).toBe(false);

		await user.click(startAgainButton);

		expect(await screen.findByRole('button', { name: 'Stop recording' })).toBeVisible();
		expect(getUserMedia).toHaveBeenCalledTimes(1);
		expect(microphoneTrack.enabled).toBe(true);

		view.unmount();
		expect(microphoneTrack.stop).toHaveBeenCalled();
	});

	test('explains a denied microphone permission without losing the fallback', async() => {
		const user = userEvent.setup();
		getUserMedia.mockRejectedValue({ name: 'NotAllowedError' });
		render(<RecorderHarness />);

		await user.click(screen.getByRole('button', { name: 'Start recording' }));

		await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Microphone access was not allowed'));
		expect(screen.getByRole('button', { name: 'Add an audio file instead' })).toBeVisible();
	});

	test('fully releases the muted microphone after the reuse window', async() => {
		vi.useFakeTimers();
		render(<RecorderHarness />);

		await act(async() => {
			fireEvent.click(screen.getByRole('button', { name: 'Start recording' }));
			await Promise.resolve();
		});
		fireEvent.click(screen.getByRole('button', { name: 'Stop recording' }));

		expect(microphoneTrack.enabled).toBe(false);
		expect(microphoneTrack.stop).not.toHaveBeenCalled();
		act(() => vi.advanceTimersByTime(microphoneReuseMilliseconds));
		expect(microphoneTrack.stop).toHaveBeenCalledTimes(1);
	});
});
