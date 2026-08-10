import { useEffect } from 'react';

const useScrollToTop = (value) => {
	useEffect(() => {
		const frame = window.requestAnimationFrame(() => {
			window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
		});
		return () => window.cancelAnimationFrame(frame);
	}, [value]);
};

export default useScrollToTop;
