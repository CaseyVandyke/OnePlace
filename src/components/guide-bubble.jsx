import { useEffect, useState } from 'react';

const GuideBubble = ({ cue, simpleMessages, reactionKey }) => {
	const [message, setMessage] = useState(cue);

	useEffect(() => {
		let simpleMessage = 0;
		const interval = window.setInterval(() => {
			setMessage(simpleMessages[simpleMessage % simpleMessages.length]);
			simpleMessage += 1;
		}, 9000);
		return () => window.clearInterval(interval);
	}, [cue, reactionKey, simpleMessages]);

	return <span className='guide-bubble' aria-hidden='true'>{message}</span>;
};

export default GuideBubble;
