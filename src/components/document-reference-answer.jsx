import ReferenceSafetyNote from './reference-safety-note';

const DocumentReferenceAnswer = ({ value = {}, onChange }) => {
	const updateField = (field, nextValue) => onChange({ ...value, [field]: nextValue });

	return (
		<div className='reference-answer document-reference-answer'>
			<div className='reference-fields'>
				<label>
					Who has the original?
					<input
						value={value.holder || ''}
						onChange={(event) => updateField('holder', event.target.value)}
						placeholder='Mountain View Estate Law'
					/>
				</label>
				<label>
					How can your family reach them?
					<input
						value={value.contact || ''}
						onChange={(event) => updateField('contact', event.target.value)}
						placeholder='Office phone or public email'
					/>
				</label>
				<label className='reference-field-wide'>
					Where is the original kept?
					<input
						value={value.generalLocation || ''}
						onChange={(event) => updateField('generalLocation', event.target.value)}
						placeholder='Original held by the estate attorney'
					/>
				</label>
				<label>
					When did you last confirm this?
					<input
						type='date'
						value={value.verifiedAt || ''}
						onChange={(event) => updateField('verifiedAt', event.target.value)}
					/>
				</label>
			</div>
			<ReferenceSafetyNote />
		</div>
	);
};

export default DocumentReferenceAnswer;
