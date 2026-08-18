import { useCallback, useLayoutEffect } from 'react';

const useScrollToTop = (value) => {
	const resetScroll = useCallback(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
	}, []);

	useLayoutEffect(() => {
		resetScroll();
	}, [resetScroll, value]);

	return resetScroll;
};

export default useScrollToTop;
