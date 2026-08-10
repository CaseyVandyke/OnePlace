const PlaceNameAnswer = ({ value, onChange }) => {
	return (
		<div className='name-answer'>
			<label>
				Your place’s name
				<input value={value || ''} onChange={(event) => onChange(event.target.value)} placeholder='The Morgan family’s OnePlace' />
			</label>
			<div className='name-preview'>
				<span className='brand-door mini'><i /></span>
				<p>Welcome to</p>
				<strong>{value || 'your OnePlace'}</strong>
			</div>
		</div>
	);
};

export default PlaceNameAnswer;
