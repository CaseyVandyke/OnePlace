import { useState } from 'react';
import AudioRecorder from '../components/audio-recorder';
import Icon from '../components/icon';
import { messagePrompts } from '../constants/dashboard';

const MessagesView = ({ message, onMessageChange }) => {
	const [selectedPrompt, setSelectedPrompt] = useState('');

	return (
		<div className='messages-page'>
			<header>
				<p>MESSAGES</p>
				<h1>Leave more than instructions.</h1>
				<span>Your voice, your stories, your way of saying what matters.</span>
			</header>
			<section className='message-stage'>
				<div className='message-stage-copy'>
					<small>FOR MY FAMILY</small>
					<h2>{selectedPrompt || 'Record a message in your own words.'}</h2>
					<p>You can keep it simple—a memory, a little advice, or just the sound of your voice.</p>
				</div>
				<AudioRecorder
					value={message}
					onChange={onMessageChange}
					title='Record a new message'
					description='Tap once to begin. You can listen before keeping it.'
					variant='dark'
				/>
			</section>
			<section className='message-prompts'>
				<p>NOT SURE WHAT TO SAY?</p>
				<div>
					{messagePrompts.map((prompt, index) => (
						<button key={prompt} onClick={() => setSelectedPrompt(prompt)} aria-pressed={selectedPrompt === prompt}>
							<span>0{index + 1}</span>
							<strong>{prompt}</strong>
							<Icon name='arrow' />
						</button>
					))}
				</div>
			</section>
		</div>
	);
};

export default MessagesView;
