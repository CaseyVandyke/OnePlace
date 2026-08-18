import '../styles/components/journey-lantern.css';

const JourneyLantern = ({ size = 54, className = '' }) => {
	return (
		<svg
			className={`journey-lantern ${className}`.trim()}
			width={size}
			height={size}
			viewBox='0 0 100 100'
			aria-hidden='true'
		>
			<path className='lantern-handle' d='M34 31v-7a16 16 0 0 1 32 0v7' />
			<path className='lantern-cap' d='M30 30h40l-6 11H36Z' />
			<path className='lantern-glass' d='M36 41h28l8 37H28Z' />
			<path className='lantern-flame' d='M50 48c8 9 9 15 5 21-3 5-9 5-12 1-5-6-1-14 7-22Z' />
			<path className='lantern-frame' d='M36 41 28 78m36-37 8 37M35 41v37m30-37v37' />
			<path className='lantern-base' d='M26 77h48l-5 13H31Z' />
		</svg>
	);
};

export default JourneyLantern;
