import { useRef } from 'react';
import Icon from './icon';
import KeepsakePhoto from './keepsake-photo';

const QuestionBody = ({ question, answer, setAnswer, uploaded, setUploaded }) => {
	const fileRef = useRef(null);

	if (question.type === 'multi') {
		const selected = Array.isArray(answer) ? answer : [];
		const toggleOption = (option) => {
			const nextAnswer = selected.includes(option)
				? selected.filter((item) => item !== option)
				: [...selected, option];
			setAnswer(nextAnswer);
		};
		return (
			<div className='answer-list multi-answer'>
				{question.options.map((option) => (
					<button
						className={selected.includes(option) ? 'selected' : ''}
						onClick={() => toggleOption(option)}
						key={option}
					>
						<span>{selected.includes(option) && <Icon name='check' size={15} />}</span>
						{option}
					</button>
				))}
			</div>
		);
	}

	if (question.type === 'single') {
		return (
			<div className='answer-list'>
				{question.options.map((option) => (
					<button className={answer === option ? 'selected' : ''} onClick={() => setAnswer(option)} key={option}>
						<span>{answer === option && <Icon name='check' size={15} />}</span>
						{option}
					</button>
				))}
			</div>
		);
	}

	if (question.type === 'name') {
		return (
			<div className='name-answer'>
				<label>
					Your place’s name
					<input value={answer || ''} onChange={(event) => setAnswer(event.target.value)} placeholder='The Morgan family’s OnePlace' />
				</label>
				<div className='name-preview'>
					<span className='brand-door mini'><i /></span>
					<p>Welcome to</p>
					<strong>{answer || 'your OnePlace'}</strong>
				</div>
			</div>
		);
	}

	if (question.type === 'upload') {
		const uploadFile = (event) => {
			const [file] = event.target.files;
			if (!file) return;
			setUploaded(file.name);
			setAnswer('uploaded');
		};
		return (
			<div className='upload-answer'>
				<input ref={fileRef} type='file' accept='.pdf,image/*' onChange={uploadFile} />
				<button className={uploaded ? 'upload-zone has-file' : 'upload-zone'} onClick={() => fileRef.current?.click()}>
					<span><Icon name={uploaded ? 'check' : 'upload'} /></span>
					<strong>{uploaded || 'Choose a file or take a photo'}</strong>
					<small>{uploaded ? 'Ready to keep safely at Paper Port' : 'PDF, JPG or PNG · Concept only'}</small>
				</button>
				<button className='location-choice' onClick={() => setAnswer('location')}>
					<Icon name='home' />
					<span>
						<strong>Tell us where the original is</strong>
						<small>Example: fireproof box in the home office</small>
					</span>
					<i className={answer === 'location' ? 'chosen' : ''} />
				</button>
			</div>
		);
	}

	if (question.type === 'banks') {
		const selected = Array.isArray(answer) ? answer : [];
		const toggleBank = (option) => {
			const nextAnswer = selected.includes(option)
				? selected.filter((item) => item !== option)
				: [...selected, option];
			setAnswer(nextAnswer);
		};
		return (
			<div className='bank-answer'>
				{question.options.map((option, index) => (
					<button className={selected.includes(option) ? 'selected' : ''} onClick={() => toggleBank(option)} key={option}>
						<span className={`bank-logo logo-${index}`}>
							{option === 'Another institution' ? <Icon name='plus' /> : option.split(' ').map((item) => item[0]).join('').slice(0, 2)}
						</span>
						<strong>{option}</strong>
						<i>{selected.includes(option) && <Icon name='check' size={14} />}</i>
					</button>
				))}
			</div>
		);
	}

	if (question.type === 'account') {
		const value = answer || {};
		return (
			<div className='account-answer'>
				<label>
					Nickname
					<input value={value.nickname || ''} onChange={(event) => setAnswer({ ...value, nickname: event.target.value })} placeholder='Everyday checking' />
				</label>
				<div>
					<label>
						Institution
						<input value={value.bank || ''} onChange={(event) => setAnswer({ ...value, bank: event.target.value })} placeholder='Mountain America' />
					</label>
					<label>
						Last 4 digits
						<input
							inputMode='numeric'
							maxLength='4'
							value={value.last4 || ''}
							onChange={(event) => setAnswer({ ...value, last4: event.target.value.replace(/\D/g, '') })}
							placeholder='••••'
						/>
					</label>
				</div>
				<p><Icon name='lock' size={15} /> In the real product, sensitive details would be encrypted before leaving your device.</p>
			</div>
		);
	}

	if (question.type === 'person') {
		const value = answer || {};
		const createAccessCode = () => {
			const code = `ONE-${Math.floor(1000 + Math.random() * 9000)}`;
			setAnswer({ ...value, inviteMethod: 'code', inviteCode: code, inviteSent: false });
		};
		return (
			<div className='person-answer'>
				<div className='person-avatar'>
					{value.name ? value.name.split(' ').map((item) => item[0]).join('').slice(0, 2) : <Icon name='people' />}
				</div>
				<label>
				Full name
					<input value={value.name || ''} onChange={(event) => setAnswer({ ...value, name: event.target.value })} placeholder='Daniel Morgan' />
				</label>
				<label>
				Relationship
					<select value={value.relationship || ''} onChange={(event) => setAnswer({ ...value, relationship: event.target.value })}>
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
						onChange={(event) => setAnswer({ ...value, email: event.target.value, inviteSent: false })}
						placeholder='daniel@example.com'
					/>
				</label>
				<div className='invite-choice'>
					<p>How would you like to connect them?</p>
					<div>
						<button className={value.inviteMethod === 'email' ? 'selected' : ''} onClick={() => setAnswer({ ...value, inviteMethod: 'email', inviteCode: '', inviteSent: false })}>
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
							<button disabled={!value.email} onClick={() => setAnswer({ ...value, inviteSent: true })}>{value.inviteSent ? 'Prepared' : 'Preview invitation'}</button>
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
	}

	if (question.type === 'possessions') {
		const items = Array.isArray(answer) && answer.length ? answer : [{ item: '', recipient: '', location: '', note: '', photo: '', photoName: '' }];
		const updateItem = (index, field, nextValue) => {
			setAnswer(items.map((entry, itemIndex) => itemIndex === index ? { ...entry, [field]: nextValue } : entry));
		};
		const updateItemFields = (index, changes) => {
			setAnswer(items.map((entry, itemIndex) => itemIndex === index ? { ...entry, ...changes } : entry));
		};
		const addItem = () => setAnswer([...items, { item: '', recipient: '', location: '', note: '', photo: '', photoName: '' }]);
		const removeItem = (index) => setAnswer(items.filter((_, itemIndex) => itemIndex !== index));
		return (
			<div className='possession-answer'>
				{items.map((entry, index) => (
					<section className='possession-entry' key={index}>
						<header>
							<span><Icon name='gift' size={18} /></span>
							<strong>Possession {index + 1}</strong>
							{items.length > 1 && <button onClick={() => removeItem(index)}>Remove</button>}
						</header>
						<div>
							<label>
								What is it?
								<input value={entry.item} onChange={(event) => updateItem(index, 'item', event.target.value)} placeholder='Grandmother’s ring' />
							</label>
							<label>
								Who should receive it?
								<input value={entry.recipient} onChange={(event) => updateItem(index, 'recipient', event.target.value)} placeholder='Emma Morgan' />
							</label>
							<label>
								Where is it kept?
								<input value={entry.location} onChange={(event) => updateItem(index, 'location', event.target.value)} placeholder='Jewelry box in the bedroom' />
							</label>
							<label>
								Personal note <span>Optional</span>
								<textarea value={entry.note} onChange={(event) => updateItem(index, 'note', event.target.value)} placeholder='Why this belongs with them…' />
							</label>
							<KeepsakePhoto entry={entry} index={index} onChange={(changes) => updateItemFields(index, changes)} />
						</div>
					</section>
				))}
				<button className='add-possession' onClick={addItem}><Icon name='plus' /> Add another possession</button>
				<p className='possession-legal-note'><Icon name='file' size={17} /> Personal wishes are helpful, but legally significant gifts should also be included in an estate plan.</p>
			</div>
		);
	}

	if (question.type === 'voice') {
		return (
			<div className='voice-answer'>
				<div className={`voice-orb ${answer ? 'recorded' : ''}`}>
					<button onClick={() => setAnswer(answer ? '' : 'recorded')}>
						<Icon name={answer ? 'check' : 'mic'} size={27} />
					</button>
					<i />
					<i />
				</div>
				<strong>{answer ? 'A little hello is ready' : 'Tap to record a demo message'}</strong>
				<p>{answer ? '0:14 · For my family' : 'Nothing has to be perfect. Just sound like you.'}</p>
				{answer && (
					<div className='voice-wave'>
						{Array.from({ length: 24 }).map((_, index) => (
							<i key={index} style={{ height: `${6 + ((index * 7) % 19)}px` }} />
						))}
					</div>
				)}
			</div>
		);
	}

	return null;
};

export default QuestionBody;
