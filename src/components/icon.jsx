const paths = {
	arrow: 'M5 12h14m-6-6 6 6-6 6',
	back: 'M19 12H5m6 6-6-6 6-6',
	check: 'm5 12 4 4L19 6',
	lock: 'M6 10V7a6 6 0 0 1 12 0v3m1 0H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2Z',
	file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 0v6h6M8 13h8M8 17h6',
	bank: 'M3 10h18M5 10v8m4-8v8m6-8v8m4-8v8M3 21h18M12 3 3 7h18l-9-4Z',
	heart: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z',
	people: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
	message: 'M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z',
	shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Zm-3-10 2 2 4-4',
	upload: 'M12 16V4m-5 5 5-5 5 5M4 15v5h16v-5',
	spark: 'm12 2 1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2Z',
	play: 'm8 5 11 7-11 7V5Z',
	mic: 'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Zm-7 9a7 7 0 0 0 14 0M12 18v4m-4 0h8',
	stop: 'M7 7h10v10H7z',
	trash: 'M3 6h18M8 6V4h8v2m3 0-1 16H6L5 6m4 4v8m6-8v8',
	download: 'M12 3v12m-5-5 5 5 5-5M5 21h14',
	clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-16v6l4 2',
	key: 'M21 2 13.6 9.4a5 5 0 1 0 1 3.6L17 11h2V9h2V7h2V2h-2ZM7.5 17.5h.01',
	menu: 'M4 6h16M4 12h16M4 18h16',
	close: 'M18 6 6 18M6 6l12 12',
	home: 'M3 11 12 3l9 8M5 10v11h14V10M9 21v-7h6v7',
	gift: 'M20 12v10H4V12M2 7h20v5H2V7Zm10 15V7m0 0H7.5A2.5 2.5 0 1 1 10 4.5L12 7Zm0 0h4.5A2.5 2.5 0 1 0 14 4.5L12 7Z',
	eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
	camera: 'M14.5 4 16 6h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3l1.5-2h5ZM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
	mail: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm-2 3 10 7L22 7',
	plus: 'M12 5v14M5 12h14',
	logout: 'M10 17l5-5-5-5m5 5H3m10-9h7a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-7'
};

const Icon = ({ name, size = 20, strokeWidth = 1.8 }) => {
	return (
		<svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor'
			strokeWidth={strokeWidth} strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
			<path d={paths[name]} />
		</svg>
	);
};

export default Icon;
