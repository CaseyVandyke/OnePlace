import Icon from './icon';

const TrustedPersonAnswer = ({ value = {}, onChange }) => {
	const createAccessCode = () => {
		const code = `ONE-${Math.floor(1000 + Math.random() * 9000)}`;
		onChange({ ...value, inviteMethod: 'code', inviteCode: code, inviteSent: false });
	};

	return (
		<div className='person-answer'>
			<div className='person-avatar'>
				{value.name ? value.name.split(' ').map((item) => item[0]).join('').slice(0, 2) : <Icon name='people' />}
			</div>
			<label>
				Full name
				<input value={value.name || ''} onChange={(event) => onChange({ ...value, name: event.target.value })} placeholder='Daniel Morgan' />
			</label>
			<label>
				Relationship
				<select value={value.relationship || ''} onChange={(event) => onChange({ ...value, relationship: event.target.value })}>
					<option value=''>Choose one</option>
					<option>Spouse or partner</option>
					<option>Child</option>
					<option>Relative</option>
					<option>Friend</option>
					<option>Professional</option>
				</select>
			</label>
			<label className='contact-email'>
				Email address <span>Optional</span>
				<input
					type='email'
					inputMode='email'
					autoCapitalize='none'
					value={value.email || ''}
					onChange={(event) => onChange({ ...value, email: event.target.value, inviteSent: false })}
					placeholder='daniel@example.com'
				/>
			</label>
			<div className='invite-choice'>
				<p>How would you like to connect them?</p>
				<div>
					<button className={value.inviteMethod === 'email' ? 'selected' : ''} onClick={() => onChange({ ...value, inviteMethod: 'email', inviteCode: '', inviteSent: false })}>
						<span><Icon name='mail' /></span><strong>Email invitation</strong><small>Prepare a secure link</small>
					</button>
					<button className={value.inviteMethod === 'code' ? 'selected' : ''} onClick={createAccessCode}>
						<span><Icon name='key' /></span><strong>Private code</strong><small>Share it another way</small>
					</button>
				</div>
				{value.inviteMethod === 'email' && (
					<div className='invite-result'>
						<div>
							<Icon name={value.inviteSent ? 'check' : 'mail'} />
							<span>
								<strong>{value.inviteSent ? 'Invitation prepared' : 'Ready when you are'}</strong>
								<small>{value.inviteSent ? `For ${value.email}` : 'Concept demo—no real email will be sent.'}</small>
							</span>
						</div>
						<button disabled={!value.email} onClick={() => onChange({ ...value, inviteSent: true })}>{value.inviteSent ? 'Prepared' : 'Preview invitation'}</button>
					</div>
				)}
				{value.inviteMethod === 'code' && (
					<div className='invite-result code-result'>
						<div>
							<Icon name='key' />
							<span><strong>{value.inviteCode}</strong><small>Demo code—share privately with your trusted person.</small></span>
						</div>
						<button onClick={createAccessCode}>New code</button>
					</div>
				)}
			</div>
			<div className='access-note'>
				<Icon name='eye' />
				<span><strong>No access yet</strong><small>You’ll choose specific items and timing later.</small></span>
			</div>
		</div>
	);
};

export default TrustedPersonAnswer;
