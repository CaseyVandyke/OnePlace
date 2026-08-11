import { useEffect, useId, useState } from 'react';

const DEFAULT_MESSAGE = 'Preview only — this feature isn’t available in the prototype yet.';

const PrototypeAction = ({ children, className, label, message = DEFAULT_MESSAGE }) => {
	const [noticeVersion, setNoticeVersion] = useState(0);
	const noticeId = useId();
	const noticeVisible = noticeVersion > 0;

	useEffect(() => {
		if (!noticeVisible) return undefined;
		const timer = window.setTimeout(() => setNoticeVersion(0), 3600);
		return () => window.clearTimeout(timer);
	}, [noticeVersion, noticeVisible]);

	return (
		<>
			<button
				className={className}
				type='button'
				onClick={() => setNoticeVersion((version) => version + 1)}
				aria-label={label}
				aria-describedby={noticeVisible ? noticeId : undefined}
			>
				{children}
			</button>
			{noticeVisible && <span className='prototype-notice' id={noticeId} role='status'>{message}</span>}
		</>
	);
};

export default PrototypeAction;
