import { useState } from 'react';
import Icon from '../components/icon';
import { accessItems } from '../constants/access';
import '../styles/components/people-access.css';

const emptyPerson = { name: '', relationship: '' };

const getInitials = (name) => name
	.split(' ')
	.filter(Boolean)
	.map((part) => part[0])
	.join('')
	.slice(0, 2)
	.toUpperCase();

const TrustedPersonButton = ({ className = '', onSelect, person, selected }) => (
	<button
		aria-pressed={selected}
		className={`orbit-person ${className} ${selected ? 'selected' : ''}`}
		onClick={onSelect}
		type='button'
	>
		<span>{getInitials(person.name)}</span>
		<strong>{person.name}</strong>
		<small>{person.itemIds.length} {person.itemIds.length === 1 ? 'item' : 'items'} selected · {person.accessMode === 'now' ? 'access now' : 'when needed'}</small>
	</button>
);

const PeopleView = ({ people, onPeopleChange }) => {
	const [selectedPersonId, setSelectedPersonId] = useState(people[0]?.id);
	const [showAddPerson, setShowAddPerson] = useState(false);
	const [newPerson, setNewPerson] = useState(emptyPerson);
	const selectedPerson = people.find((person) => person.id === selectedPersonId) ?? people[0];

	const updateSelectedPerson = (changes) => {
		onPeopleChange(people.map((person) => person.id === selectedPerson.id ? { ...person, ...changes } : person));
	};

	const toggleAccessItem = (itemId) => {
		const itemIds = selectedPerson.itemIds.includes(itemId)
			? selectedPerson.itemIds.filter((id) => id !== itemId)
			: [...selectedPerson.itemIds, itemId];
		updateSelectedPerson({ itemIds });
	};

	const addPerson = (event) => {
		event.preventDefault();
		const name = newPerson.name.trim();
		if (!name) return;

		const person = {
			id: `person-${Date.now()}`,
			name,
			relationship: newPerson.relationship.trim() || 'Trusted person',
			accessMode: 'when-needed',
			itemIds: []
		};
		onPeopleChange([...people, person]);
		setSelectedPersonId(person.id);
		setNewPerson(emptyPerson);
		setShowAddPerson(false);
	};

	return (
		<div className='people-page'>
			<header>
				<p>MY PEOPLE</p>
				<h1>A circle built on trust.</h1>
				<span>Select a person, then choose exactly what they may access.</span>
			</header>
			<section className='people-orbit' aria-label='Trusted people'>
				<div className='orbit-center'>
					<span className='brand-door'><i /></span>
					<strong>Your<br />OnePlace</strong>
				</div>
				<i className='orbit-line line-a' />
				<i className='orbit-line line-b' />
				{people.slice(0, 3).map((person, index) => (
					<TrustedPersonButton
						className={`person-${['one', 'two', 'three'][index]}`}
						key={person.id}
						onSelect={() => setSelectedPersonId(person.id)}
						person={person}
						selected={selectedPerson?.id === person.id}
					/>
				))}
				<button
					aria-controls='add-trusted-person-panel'
					aria-expanded={showAddPerson}
					className='orbit-add'
					onClick={() => setShowAddPerson((shown) => !shown)}
					type='button'
				>
					<Icon name='plus' /> Add trusted person
				</button>
			</section>
			{people.length > 3 && (
				<div className='additional-trusted-people screen-enter' aria-label='Additional trusted people'>
					{people.slice(3).map((person) => (
						<TrustedPersonButton
							key={person.id}
							onSelect={() => setSelectedPersonId(person.id)}
							person={person}
							selected={selectedPerson?.id === person.id}
						/>
					))}
				</div>
			)}

			{showAddPerson && (
				<form className='add-person-panel screen-enter' id='add-trusted-person-panel' onSubmit={addPerson}>
					<div>
						<p>ADD TRUSTED PERSON</p>
						<h2>Who would you like to add?</h2>
					</div>
					<label>
						Full name
						<input
							autoComplete='name'
							onChange={(event) => setNewPerson((person) => ({ ...person, name: event.target.value }))}
							placeholder='Name'
							value={newPerson.name}
						/>
					</label>
					<label>
						Relationship <span>Optional</span>
						<input
							onChange={(event) => setNewPerson((person) => ({ ...person, relationship: event.target.value }))}
							placeholder='For example, daughter or friend'
							value={newPerson.relationship}
						/>
					</label>
					<div className='add-person-actions'>
						<button onClick={() => setShowAddPerson(false)} type='button'>Cancel</button>
						<button disabled={!newPerson.name.trim()} type='submit'>Add person <Icon name='arrow' /></button>
					</div>
				</form>
			)}

			{selectedPerson && (
				<section className='access-manager' aria-labelledby='access-manager-title'>
					<header>
						<span className='access-person-avatar'>{getInitials(selectedPerson.name)}</span>
						<div>
							<p>ACCESS FOR {selectedPerson.name.toUpperCase()}</p>
							<h2 id='access-manager-title'>Choose what {selectedPerson.name} can access.</h2>
							<span>{selectedPerson.relationship}</span>
						</div>
					</header>

					<fieldset className='access-timing'>
						<legend>When should this access be available?</legend>
						<label aria-label='Access now' className={selectedPerson.accessMode === 'now' ? 'selected' : ''} htmlFor={`access-now-${selectedPerson.id}`}>
							<input
								checked={selectedPerson.accessMode === 'now'}
								id={`access-now-${selectedPerson.id}`}
								name={`access-mode-${selectedPerson.id}`}
								onChange={() => updateSelectedPerson({ accessMode: 'now' })}
								type='radio'
							/>
							<span><strong>Access now</strong><small>Available after a secure invitation is accepted.</small></span>
						</label>
						<label aria-label='When needed' className={selectedPerson.accessMode === 'when-needed' ? 'selected' : ''} htmlFor={`access-needed-${selectedPerson.id}`}>
							<input
								checked={selectedPerson.accessMode === 'when-needed'}
								id={`access-needed-${selectedPerson.id}`}
								name={`access-mode-${selectedPerson.id}`}
								onChange={() => updateSelectedPerson({ accessMode: 'when-needed' })}
								type='radio'
							/>
							<span><strong>When needed</strong><small>Held until the future release conditions you set are met.</small></span>
						</label>
					</fieldset>

					<fieldset className='access-item-picker'>
						<legend>Which specific information can they see?</legend>
						<p>Choose individual references and personal items. Nothing is shared automatically.</p>
						<div>
							{accessItems.map((item) => {
								const selected = selectedPerson.itemIds.includes(item.id);
								return (
									<label className={selected ? 'selected' : ''} key={item.id}>
										<input checked={selected} onChange={() => toggleAccessItem(item.id)} type='checkbox' />
										<span className='access-item-copy'>
											<small>{item.category}</small>
											<strong>{item.title}</strong>
											<span>{item.description}</span>
										</span>
										<span className='access-item-state'>{selected ? 'Shared' : 'Private'}</span>
									</label>
								);
							})}
						</div>
					</fieldset>

					<div className='access-selection-summary' aria-live='polite'>
						<Icon name='check' />
						<p>
							<strong>{selectedPerson.itemIds.length} {selectedPerson.itemIds.length === 1 ? 'item' : 'items'} selected for {selectedPerson.name}</strong>
							<span>These choices are kept only while you use this prototype.</span>
						</p>
					</div>
				</section>
			)}

			<div className='trust-note people-control-note'>
				<Icon name='shield' />
				<div>
					<strong>This demonstrates the intended permission model.</strong>
					<p>No invitation is sent and no real access is granted in this prototype.</p>
				</div>
			</div>
		</div>
	);
};

export default PeopleView;
