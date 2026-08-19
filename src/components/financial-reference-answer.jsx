import ReferenceDateField from './reference-date-field';
import ReferenceSafetyNote from './reference-safety-note';

const resourceTypes = [
	'Checking account',
	'Savings account',
	'Retirement account',
	'Investment account',
	'Credit card',
	'Loan or mortgage',
	'Recurring bill',
	'Other'
];

const FinancialReferenceAnswer = ({ value = {}, onChange }) => {
	const updateField = (field, nextValue) => onChange({ ...value, [field]: nextValue });

	return (
		<div className='reference-answer financial-reference-answer'>
			<div className='reference-fields'>
				<label>
					Your nickname for it
					<input
						value={value.nickname || ''}
						onChange={(event) => updateField('nickname', event.target.value)}
						placeholder='Everyday checking'
					/>
				</label>
				<label>
					Institution
					<input
						value={value.institution || ''}
						onChange={(event) => updateField('institution', event.target.value)}
						placeholder='Mountain America'
					/>
				</label>
				<label>
					Account category
					<select value={value.resourceType || ''} onChange={(event) => updateField('resourceType', event.target.value)}>
						<option value=''>Choose one</option>
						{resourceTypes.map((resourceType) => <option key={resourceType}>{resourceType}</option>)}
					</select>
				</label>
				<label>
					Who should your family contact?
					<input
						value={value.contactPath || ''}
						onChange={(event) => updateField('contactPath', event.target.value)}
						placeholder='Beneficiary services or a trusted person'
					/>
				</label>
				<ReferenceDateField value={value.verifiedAt} onChange={(verifiedAt) => updateField('verifiedAt', verifiedAt)} />
			</div>
			<ReferenceSafetyNote />
		</div>
	);
};

export default FinancialReferenceAnswer;
