import AccountDetailsAnswer from './account-details-answer';
import BankSelectionAnswer from './bank-selection-answer';
import DocumentUploadAnswer from './document-upload-answer';
import MultipleChoiceAnswer from './multiple-choice-answer';
import PlaceNameAnswer from './place-name-answer';
import PossessionsAnswer from './possessions-answer';
import SingleChoiceAnswer from './single-choice-answer';
import TrustedPersonAnswer from './trusted-person-answer';
import VoiceMessageAnswer from './voice-message-answer';

const QuestionBody = ({ question, value, onChange, uploadedFileName, onUploadedFileNameChange }) => {
	if (question.type === 'multi') {
		return <MultipleChoiceAnswer options={question.options} value={value} onChange={onChange} />;
	}

	if (question.type === 'single') {
		return <SingleChoiceAnswer options={question.options} value={value} onChange={onChange} />;
	}

	if (question.type === 'name') {
		return <PlaceNameAnswer value={value} onChange={onChange} />;
	}

	if (question.type === 'upload') {
		return (
			<DocumentUploadAnswer
				value={value}
				onChange={onChange}
				uploadedFileName={uploadedFileName}
				onUploadedFileNameChange={onUploadedFileNameChange}
			/>
		);
	}

	if (question.type === 'banks') {
		return <BankSelectionAnswer options={question.options} value={value} onChange={onChange} />;
	}

	if (question.type === 'account') {
		return <AccountDetailsAnswer value={value} onChange={onChange} />;
	}

	if (question.type === 'person') {
		return <TrustedPersonAnswer value={value} onChange={onChange} />;
	}

	if (question.type === 'possessions') {
		return <PossessionsAnswer value={value} onChange={onChange} />;
	}

	if (question.type === 'voice') {
		return <VoiceMessageAnswer value={value} onChange={onChange} />;
	}

	return null;
};

export default QuestionBody;
