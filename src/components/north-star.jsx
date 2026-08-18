import { useId } from 'react';
import '../styles/components/north-star.css';

const NorthStar = ({ size = 54, className = '' }) => {
	const gradientId = useId();

	return (
		<svg
			className={`north-star ${className}`.trim()}
			width={size}
			height={size}
			viewBox='0 0 100 100'
			aria-hidden='true'
		>
			<defs>
				<linearGradient id={gradientId} x1='18' y1='12' x2='82' y2='88' gradientUnits='userSpaceOnUse'>
					<stop offset='0' stopColor='#fff3bd' />
					<stop offset='.48' stopColor='#f2c263' />
					<stop offset='1' stopColor='#dc8f4c' />
				</linearGradient>
			</defs>
			<path
				className='north-star-shape'
				fill={`url(#${gradientId})`}
				d='M50 3 58 38 86 14 62 42 97 50 62 58 86 86 58 62 50 97 42 62 14 86 38 58 3 50 38 42 14 14 42 38Z'
			/>
			<path className='north-star-highlight' d='M50 9 54 42 50 50 46 42Z' />
		</svg>
	);
};

export default NorthStar;
