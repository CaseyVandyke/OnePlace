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
			<path className='lantern-handle' d='M31 33v-9a19 19 0 0 1 38 0v9' />
			<path className='lantern-cap' d='M28 32h44l-7 12H35Z' />
			<path className='lantern-glass' d='M35 43h30l8 35H27Z' />
			<path className='lantern-flame' d='M50 48c9 10 11 18 6 24-3 5-10 6-14 1-6-7-2-16 8-25Z' />
			<path className='lantern-frame' d='M35 43 27 78m38-35 8 35M35 43v35m30-35v35' />
			<path className='lantern-base' d='M24 77h52l-6 14H30Z' />
		</svg>
	);
};

export default JourneyLantern;
