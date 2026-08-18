import '../styles/components/journey-token.css';

const JourneyToken = ({ size = 54, className = '' }) => {
	return (
		<svg
			className={`journey-token ${className}`.trim()}
			width={size}
			height={size}
			viewBox='0 0 100 100'
			aria-hidden='true'
		>
			<circle className='journey-token-halo' cx='50' cy='50' r='43' />
			<circle className='journey-token-face' cx='50' cy='50' r='34' />
			<path className='journey-token-star' d='M50 13 58 40 87 50 58 60 50 87 42 60 13 50 42 40Z' />
			<path className='journey-token-shine' d='M50 20 55 43 50 50 45 43Z' />
			<circle className='journey-token-center' cx='50' cy='50' r='5' />
		</svg>
	);
};

export default JourneyToken;
