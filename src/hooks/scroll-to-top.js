import { useCallback, useLayoutEffect } from 'react';

const useScrollToTop = (value) => {
	const resetScroll = useCallback(() => {
		window.scrollTo(0, 0);
		if (document.scrollingElement) document.scrollingElement.scrollTop = 0;
	}, []);

	useLayoutEffect(() => {
		resetScroll();
		let settledFrame;
		const renderedFrame = window.requestAnimationFrame(() => {
			settledFrame = window.requestAnimationFrame(resetScroll);
		});

		return () => {
			window.cancelAnimationFrame(renderedFrame);
			if (settledFrame !== undefined) window.cancelAnimationFrame(settledFrame);
		};
	}, [resetScroll, value]);

	return resetScroll;
};

export default useScrollToTop;
