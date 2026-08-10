import Icon from './icon';

const AccountDetailsAnswer = ({ value = {}, onChange }) => {
	return (
		<div className='account-answer'>
			<label>
				Nickname
				<input value={value.nickname || ''} onChange={(event) => onChange({ ...value, nickname: event.target.value })} placeholder='Everyday checking' />
			</label>
			<div>
				<label>
					Institution
					<input value={value.bank || ''} onChange={(event) => onChange({ ...value, bank: event.target.value })} placeholder='Mountain America' />
				</label>
				<label>
					Last 4 digits
					<input
						inputMode='numeric'
						maxLength='4'
						value={value.last4 || ''}
						onChange={(event) => onChange({ ...value, last4: event.target.value.replace(/\D/g, '') })}
						placeholder='••••'
					/>
				</label>
			</div>
			<p><Icon name='lock' size={15} /> In the real product, sensitive details would be encrypted before leaving your device.</p>
		</div>
	);
};

export default AccountDetailsAnswer;
