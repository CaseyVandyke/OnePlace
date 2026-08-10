import Icon from './icon';

const MultipleChoiceAnswer = ({ options, value, onChange }) => {
	const selected = Array.isArray(value) ? value : [];
	const toggleOption = (option) => {
		const nextValue = selected.includes(option)
			? selected.filter((item) => item !== option)
			: [...selected, option];
		onChange(nextValue);
	};

	return (
		<div className='answer-list multi-answer'>
			{options.map((option) => (
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
};

export default MultipleChoiceAnswer;
