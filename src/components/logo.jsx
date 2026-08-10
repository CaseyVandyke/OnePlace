const Logo = ({ light = false }) => {
	return (
		<div className={`brand ${light ? 'brand-light' : ''}`}>
			<span className='brand-door'><i /></span>
			<span>oneplace</span>
		</div>
	);
};

export default Logo;
