import Icon from '../components/icon';
import { messagePrompts } from '../constants/dashboard';

const MessagesView = () => {
	return (
		<div className='messages-page'>
			<header>
				<p>MESSAGES</p>
				<h1>Leave more than instructions.</h1>
				<span>Your voice, your stories, your way of saying what matters.</span>
			</header>
			<section className='message-stage'>
				<div className='record-disc'>
					<button><Icon name='play' size={30} /></button>
					<i />
					<i />
				</div>
				<div>
					<small>FOR MY FAMILY · 0:14</small>
					<h2>“There are a few things I hope you’ll always remember...”</h2>
					<div className='big-wave'>
						{Array.from({ length: 38 }).map((_, index) => (
							<i key={index} style={{ height: `${7 + ((index * 11) % 29)}px` }} />
						))}
					</div>
					<button><Icon name='mic' /> Record another message</button>
				</div>
			</section>
			<section className='message-prompts'>
				<p>NOT SURE WHAT TO SAY?</p>
				<div>
					{messagePrompts.map((prompt, index) => (
						<button key={prompt}>
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
