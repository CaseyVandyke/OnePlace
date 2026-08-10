import Icon from './icon';

const SingleChoiceAnswer = ({ options, value, onChange }) => {
	return (
		<div className='answer-list'>
			{options.map((option) => (
				<button className={value === option ? 'selected' : ''} onClick={() => onChange(option)} key={option}>
					<span>{value === option && <Icon name='check' size={15} />}</span>
					{option}
				</button>
			))}
		</div>
	);
};

export default SingleChoiceAnswer;
