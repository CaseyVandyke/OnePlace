import Icon from './icon';

const ReferenceSafetyNote = () => {
	return (
		<aside className='reference-safety-note' aria-label='Information safety'>
			<Icon name='shield' size={20} />
			<p>
				<strong>Add a helpful reference, not the secret itself.</strong>
				<span>Never enter a password, access code, full account number, Social Security number, or safe combination.</span>
			</p>
		</aside>
	);
};

export default ReferenceSafetyNote;
