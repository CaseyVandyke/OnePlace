import { useEffect, useRef, useState } from 'react';
import { companionGuides } from '../constants/companion-guides';
import CompanionGuide from './companion-guide';
import '../styles/components/guide-picker.css';

const GuidePicker = ({ selectedGuideId, onSelect, onClose, returnFocusRef }) => {
	const [draftGuideId, setDraftGuideId] = useState(selectedGuideId);
	const dialogRef = useRef(null);
	const selectedGuide = companionGuides.find(({ id }) => id === draftGuideId) ?? companionGuides[0];

	useEffect(() => {
		const dialog = dialogRef.current;
		const returnFocusTarget = returnFocusRef?.current;
		dialog.showModal();

		return () => {
			if (dialog.open) dialog.close();
			returnFocusTarget?.focus({ preventScroll: true });
		};
	}, [returnFocusRef]);

	const confirmSelection = () => {
		onSelect(draftGuideId);
		onClose();
	};

	return (
		<dialog
			ref={dialogRef}
			className='guide-picker-dialog'
			aria-labelledby='guide-picker-title'
			aria-describedby='guide-picker-description'
			onCancel={(event) => {
				event.preventDefault();
				onClose();
			}}
			onPointerDown={(event) => {
				if (event.target === event.currentTarget) onClose();
			}}
		>
			<section
				className='guide-picker-panel'
			>
				<header>
					<div>
						<p className='question-eyebrow'>YOUR TRAVELING COMPANION</p>
						<h2 id='guide-picker-title'>Choose the companion who guides you.</h2>
						<p id='guide-picker-description'>This is optional. You can change your guide anytime.</p>
					</div>
					<button className='guide-picker-close' type='button' onClick={onClose} aria-label='Close guide picker'>×</button>
				</header>

				<fieldset className='guide-options'>
					<legend className='sr-only'>Available companion guides</legend>
					{companionGuides.map((guide) => (
						<label className={guide.id === draftGuideId ? 'selected' : ''} key={guide.id}>
							<input
								type='radio'
								name='companion-guide'
								value={guide.id}
								checked={guide.id === draftGuideId}
								onChange={() => setDraftGuideId(guide.id)}
							/>
							<span className='guide-option-art'><CompanionGuide guideId={guide.id} size={76} /></span>
							<span className='guide-option-copy'>
								<strong>{guide.name}</strong>
								<b>{guide.title}</b>
								<small>{guide.description}</small>
							</span>
							<span className='guide-option-check' aria-hidden='true'>✓</span>
						</label>
					))}
				</fieldset>

				<footer>
					<button className='guide-picker-cancel' type='button' onClick={onClose}>Keep my current guide</button>
					<button className='continue-button' type='button' onClick={confirmSelection}>Travel with {selectedGuide.name}</button>
				</footer>
			</section>
		</dialog>
	);
};

export default GuidePicker;
