import Icon from '../components/icon';
import PrototypeAction from '../components/prototype-action';

const PeopleView = () => {
	return (
		<div className='people-page'>
			<header>
				<p>MY PEOPLE</p>
				<h1>A circle built on trust.</h1>
				<span>Each person sees only what you choose, when you choose.</span>
			</header>
			<section className='people-orbit'>
				<div className='orbit-center'>
					<span className='brand-door'><i /></span>
					<strong>Your<br />OnePlace</strong>
				</div>
				<i className='orbit-line line-a' />
				<i className='orbit-line line-b' />
				<div className='orbit-person person-one'>
					<span>DM</span><strong>Daniel</strong><small>12 items · access now</small>
				</div>
				<div className='orbit-person person-two'>
					<span>EM</span><strong>Emma</strong><small>5 items · when needed</small>
				</div>
				<div className='orbit-person person-three'>
					<span>JM</span><strong>Jack</strong><small>5 items · when needed</small>
				</div>
				<PrototypeAction className='orbit-add'><Icon name='plus' /> Invite someone</PrototypeAction>
			</section>
			<div className='trust-note'>
				<Icon name='shield' />
				<div>
					<strong>You are always in control.</strong>
					<p>Adding someone never gives them automatic access. Every item has its own sharing choice.</p>
				</div>
				<PrototypeAction>Review access</PrototypeAction>
			</div>
		</div>
	);
};

export default PeopleView;
