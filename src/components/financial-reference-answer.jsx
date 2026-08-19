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

const fallbackInstitution = 'Financial institution';

const FinancialReferenceAnswer = ({ value = [], institutions = [], onChange }) => {
	const selectedInstitutions = institutions.length ? institutions : [fallbackInstitution];
	const savedReferences = Array.isArray(value) ? value : Object.keys(value || {}).length ? [value] : [];
	const references = selectedInstitutions.map((selectedInstitution, index) => {
		const savedReference = savedReferences.find((reference) => (
			reference.selectedInstitution === selectedInstitution || reference.institution === selectedInstitution
		)) || savedReferences[index] || {};
		const institutionCanBeNamed = selectedInstitution === 'Another institution' || selectedInstitution === fallbackInstitution;

		return {
			...savedReference,
			selectedInstitution,
			institution: institutionCanBeNamed ? savedReference.institution || '' : selectedInstitution
		};
	});
	const updateReference = (index, field, nextValue) => {
		onChange(references.map((reference, referenceIndex) => (
			referenceIndex === index ? { ...reference, [field]: nextValue } : reference
		)));
	};

	return (
		<div className='reference-answer financial-reference-answer'>
			<div className='financial-reference-list'>
				{references.map((reference, index) => {
					const institutionCanBeNamed = reference.selectedInstitution === 'Another institution' || reference.selectedInstitution === fallbackInstitution;
					const institutionName = reference.institution || reference.selectedInstitution;

					return (
						<section
							className='financial-reference-card'
							key={reference.selectedInstitution}
							role='group'
							aria-label={`Reference for ${institutionName}`}
						>
							<header>
								<span>Reference {index + 1}</span>
								<strong>{institutionName}</strong>
							</header>
							<div className='reference-fields'>
								{institutionCanBeNamed && (
									<label>
										Institution
										<input
											value={reference.institution}
											onChange={(event) => updateReference(index, 'institution', event.target.value)}
											placeholder='Institution name'
										/>
									</label>
								)}
								<label>
									Your nickname for it
									<input
										value={reference.nickname || ''}
										onChange={(event) => updateReference(index, 'nickname', event.target.value)}
										placeholder='Everyday checking'
									/>
								</label>
								<label>
									Account category
									<select value={reference.resourceType || ''} onChange={(event) => updateReference(index, 'resourceType', event.target.value)}>
										<option value=''>Choose one</option>
										{resourceTypes.map((resourceType) => <option key={resourceType}>{resourceType}</option>)}
									</select>
								</label>
								<label>
									Who should your family contact?
									<input
										value={reference.contactPath || ''}
										onChange={(event) => updateReference(index, 'contactPath', event.target.value)}
										placeholder='Beneficiary services or a trusted person'
									/>
								</label>
								<ReferenceDateField value={reference.verifiedAt} onChange={(verifiedAt) => updateReference(index, 'verifiedAt', verifiedAt)} />
							</div>
						</section>
					);
				})}
			</div>
			<ReferenceSafetyNote />
		</div>
	);
};

export default FinancialReferenceAnswer;
