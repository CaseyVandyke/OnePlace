const Logo = ({ light = false, onClick }) => {
	const content = (
		<>
			<span className='brand-door'><i /></span>
			<span>oneplace</span>
		</>
	);
	const className = `brand ${light ? 'brand-light' : ''}`;

	if (onClick) {
		return (
			<button className={`${className} brand-button`} type='button' onClick={onClick} aria-label='Return to the Welcome screen'>
				{content}
			</button>
		);
	}

	return <div className={className}>{content}</div>;
};

export default Logo;
