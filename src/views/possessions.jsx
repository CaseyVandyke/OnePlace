import { useState } from 'react';
import Icon from '../components/icon';
import KeepsakePhoto from '../components/keepsake-photo';

const initialPossessions = [
	{ id: 1, item: 'Grandmother’s ring', recipient: 'Emma', location: 'Jewelry box', note: 'Tell her the story of our first family reunion.', photo: '', photoName: '' },
	{ id: 2, item: 'Dad’s woodworking tools', recipient: 'Jack', location: 'Garage cabinet', note: 'Keep the small hand plane in the family.', photo: '', photoName: '' }
];

const emptyPossession = () => ({
	id: Date.now(),
	item: '',
	recipient: '',
	location: '',
	note: '',
	photo: '',
	photoName: ''
});

const PossessionsView = ({ onBack }) => {
	const [items, setItems] = useState(initialPossessions);
	const updateItem = (id, field, value) => setItems((currentItems) => currentItems.map((item) => item.id === id ? { ...item, [field]: value } : item));
	const updatePhoto = (id, changes) => setItems((currentItems) => currentItems.map((item) => item.id === id ? { ...item, ...changes } : item));
	const addItem = () => setItems((currentItems) => [...currentItems, emptyPossession()]);
	const removeItem = (id) => setItems((currentItems) => currentItems.filter((item) => item.id !== id));

	return (
		<div className='possessions-page'>
			<button className='possessions-back' onClick={onBack}><Icon name='back' /> Back to My Things</button>
			<header>
				<div>
					<p>POSSESSIONS & KEEPSAKES</p>
					<h1>Who gets what,<br />made clear.</h1>
					<span>Record the belongings that matter and the people you want to receive them.</span>
				</div>
				<aside>
					<Icon name='gift' size={30} />
					<strong>{items.length} wishes</strong>
					<span>Saved in this concept</span>
				</aside>
			</header>
			<section className='keepsake-list' aria-label='Possessions and recipients'>
				{items.map((entry, index) => (
					<article className='keepsake-card' key={entry.id}>
						<div className='keepsake-number'>
							<span>{String(index + 1).padStart(2, '0')}</span>
							<Icon name='gift' />
						</div>
						<div className='keepsake-fields'>
							<label>
								Possession
								<input value={entry.item} onChange={(event) => updateItem(entry.id, 'item', event.target.value)} placeholder='What would you like to leave?' />
							</label>
							<label>
								Who should receive it?
								<input value={entry.recipient} onChange={(event) => updateItem(entry.id, 'recipient', event.target.value)} placeholder='Name or relationship' />
							</label>
							<label>
								Where is it kept?
								<input value={entry.location} onChange={(event) => updateItem(entry.id, 'location', event.target.value)} placeholder='Help them find it' />
							</label>
							<label className='keepsake-note'>
								Personal note <span>Optional</span>
								<textarea value={entry.note} onChange={(event) => updateItem(entry.id, 'note', event.target.value)} placeholder='Share the story or meaning behind it…' />
							</label>
							<KeepsakePhoto entry={entry} index={index} onChange={(changes) => updatePhoto(entry.id, changes)} />
						</div>
						<button className='remove-keepsake' onClick={() => removeItem(entry.id)} aria-label={`Remove possession ${index + 1}`}><Icon name='close' /> Remove</button>
					</article>
				))}
			</section>
			<button className='add-keepsake' onClick={addItem}><Icon name='plus' /> Add another possession</button>
			<div className='keepsake-guidance'>
				<Icon name='file' />
				<p>
					<strong>A helpful list, not a legal substitute.</strong>
					<span>For valuable or legally significant gifts, include the same wishes in your will or trust and review them with an estate professional.</span>
				</p>
			</div>
		</div>
	);
};

export default PossessionsView;
