import { useLayoutEffect } from 'react';

const useScrollToTop = (value) => {
	useLayoutEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
	}, [value]);
};

export default useScrollToTop;
