const ReferenceDateField = ({ value, onChange }) => {
	return (
		<label>
			When did you last confirm this?
			<span className='reference-date-control'>
				<input type='date' value={value || ''} onChange={(event) => onChange(event.target.value)} />
			</span>
		</label>
	);
};

export default ReferenceDateField;
