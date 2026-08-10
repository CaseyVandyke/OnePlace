import { useRef } from 'react';
import Icon from './icon';

const DocumentUploadAnswer = ({ value, onChange, uploadedFileName, onUploadedFileNameChange }) => {
	const fileRef = useRef(null);
	const uploadFile = (event) => {
		const [file] = event.target.files;
		if (!file) return;
		onUploadedFileNameChange(file.name);
		onChange('uploaded');
	};

	return (
		<div className='upload-answer'>
			<input ref={fileRef} type='file' accept='.pdf,image/*' onChange={uploadFile} />
			<button className={uploadedFileName ? 'upload-zone has-file' : 'upload-zone'} onClick={() => fileRef.current?.click()}>
				<span><Icon name={uploadedFileName ? 'check' : 'upload'} /></span>
				<strong>{uploadedFileName || 'Choose a file or take a photo'}</strong>
				<small>{uploadedFileName ? 'Ready to keep safely at Paper Port' : 'PDF, JPG or PNG · Concept only'}</small>
			</button>
			<button className='location-choice' onClick={() => onChange('location')}>
				<Icon name='home' />
				<span>
					<strong>Tell us where the original is</strong>
					<small>Example: fireproof box in the home office</small>
				</span>
				<i className={value === 'location' ? 'chosen' : ''} />
			</button>
		</div>
	);
};

export default DocumentUploadAnswer;
