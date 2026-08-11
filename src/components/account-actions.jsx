import PrototypeAction from './prototype-action';

const AUTH_PROTOTYPE_MESSAGE = 'This is a prototype — login and account creation aren’t available yet.';

const AccountActions = ({ className, id }) => {
	return (
		<div className={className} id={id}>
			<PrototypeAction message={AUTH_PROTOTYPE_MESSAGE}>Log in</PrototypeAction>
			<PrototypeAction message={AUTH_PROTOTYPE_MESSAGE}>Create account</PrototypeAction>
		</div>
	);
};

export default AccountActions;
