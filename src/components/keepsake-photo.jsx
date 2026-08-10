import { useRef } from 'react';
import Icon from './icon';

const KeepsakePhoto = ({ entry, index, onChange }) => {
	const photoRef = useRef(null);
	const choosePhoto = () => photoRef.current?.click();

	const addPhoto = (event) => {
		const file = event.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.addEventListener('load', () => {
			onChange({ photo: reader.result, photoName: file.name });
		});
		reader.readAsDataURL(file);
		event.target.value = '';
	};

	const removePhoto = () => {
		onChange({ photo: '', photoName: '' });
	};

	const itemName = entry.item.trim() || `possession ${index + 1}`;

	return (
		<div className={`keepsake-photo ${entry.photo ? 'has-photo' : ''}`}>
			<input
				ref={photoRef}
				className='keepsake-photo-input'
				type='file'
				accept='image/*'
				capture='environment'
				onChange={addPhoto}
				aria-label={`Take or add a photo of ${itemName}`}
			/>
			{entry.photo ? (
				<>
					<img src={entry.photo} alt={`Preview of ${itemName}`} />
					<div className='keepsake-photo-copy'>
						<span><Icon name='check' size={17} /> Photo added</span>
						<strong>{entry.photoName || 'Keepsake photo'}</strong>
						<small>Kept only in this browser session.</small>
					</div>
					<div className='keepsake-photo-actions'>
						<button onClick={choosePhoto}><Icon name='camera' size={18} /> Change photo</button>
						<button className='remove-photo' onClick={removePhoto}>Remove photo</button>
					</div>
				</>
			) : (
				<button className='add-keepsake-photo' onClick={choosePhoto}>
					<span><Icon name='camera' size={24} /></span>
					<span><strong>Take or add a photo</strong><small>Use your camera or choose an existing picture. The photo stays in this browser session.</small></span>
					<Icon name='plus' size={20} />
				</button>
			)}
		</div>
	);
};

export default KeepsakePhoto;
