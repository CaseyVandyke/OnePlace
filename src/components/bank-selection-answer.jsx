import Icon from './icon';

const BankSelectionAnswer = ({ options, value, onChange }) => {
	const selected = Array.isArray(value) ? value : [];
	const toggleBank = (option) => {
		const nextValue = selected.includes(option)
			? selected.filter((item) => item !== option)
			: [...selected, option];
		onChange(nextValue);
	};

	return (
		<div className='bank-answer'>
			{options.map((option, index) => (
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
};

export default BankSelectionAnswer;
