import { useState } from 'react';
import Icon from './icon';
import KeepsakePhoto from './keepsake-photo';

const emptyPossession = () => ({
	item: '',
	recipient: '',
	location: '',
	note: '',
	photo: '',
	photoName: ''
});

const PossessionsAnswer = ({ value, onChange }) => {
	const [newItemIndex, setNewItemIndex] = useState(null);
	const items = Array.isArray(value) && value.length ? value : [emptyPossession()];
	const updateItem = (index, field, nextValue) => {
		onChange(items.map((entry, itemIndex) => itemIndex === index ? { ...entry, [field]: nextValue } : entry));
	};
	const updateItemFields = (index, changes) => {
		onChange(items.map((entry, itemIndex) => itemIndex === index ? { ...entry, ...changes } : entry));
	};
	const addItem = () => {
		setNewItemIndex(items.length);
		onChange([...items, emptyPossession()]);
	};
	const removeItem = (index) => onChange(items.filter((_, itemIndex) => itemIndex !== index));

	return (
		<div className='possession-answer'>
			{items.map((entry, index) => (
				<div
					className={`possession-entry-reveal ${index === newItemIndex ? 'adding' : ''}`}
					key={index}
					onAnimationEnd={() => setNewItemIndex(null)}
				>
					<section className='possession-entry'>
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
				</div>
			))}
			<button className='add-possession' onClick={addItem}><Icon name='plus' /> Add another possession</button>
			<p className='possession-legal-note'><Icon name='file' size={17} /> Personal wishes are helpful, but legally significant gifts should also be included in an estate plan.</p>
		</div>
	);
};

export default PossessionsAnswer;
