import BankSelectionAnswer from './bank-selection-answer';
import DocumentReferenceAnswer from './document-reference-answer';
import FinancialReferenceAnswer from './financial-reference-answer';
import MultipleChoiceAnswer from './multiple-choice-answer';
import PlaceNameAnswer from './place-name-answer';
import PossessionsAnswer from './possessions-answer';
import SingleChoiceAnswer from './single-choice-answer';
import TrustedPersonAnswer from './trusted-person-answer';
import VoiceMessageAnswer from './voice-message-answer';

const QuestionBody = ({ question, value, onChange }) => {
	if (question.type === 'multi') {
		return <MultipleChoiceAnswer options={question.options} value={value} onChange={onChange} />;
	}

	if (question.type === 'single') {
		return <SingleChoiceAnswer options={question.options} value={value} onChange={onChange} />;
	}

	if (question.type === 'name') {
		return <PlaceNameAnswer value={value} onChange={onChange} />;
	}

	if (question.type === 'document-reference') {
		return <DocumentReferenceAnswer value={value} onChange={onChange} />;
	}

	if (question.type === 'banks') {
		return <BankSelectionAnswer options={question.options} value={value} onChange={onChange} />;
	}

	if (question.type === 'financial-reference') {
		return <FinancialReferenceAnswer value={value} onChange={onChange} />;
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
