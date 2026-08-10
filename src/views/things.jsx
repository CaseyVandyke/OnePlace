import Icon from '../components/icon';
import { rooms } from '../constants/dashboard';

const ThingsView = ({ onContinue, onPossessions }) => {
	return (
		<div className='collection-page'>
			<header>
				<p>MY THINGS</p>
				<h1>Every part of your life,<br />given a proper place.</h1>
				<span>Seven items are safely organized in this concept.</span>
			</header>
			<div className='room-shelf'>
				{rooms.map(([icon, name, count, copy, color], index) => (
					<button
						className={`room-block room-${color}`}
						onClick={name === 'Possessions & keepsakes' ? onPossessions : undefined}
						key={name}
					>
						<span className='room-number'>0{index + 1}</span>
						<span className='room-icon'><Icon name={icon} /></span>
						<small>{count}</small>
						<strong>{name}</strong>
						<p>{copy}</p>
						<i><Icon name='arrow' /></i>
					</button>
				))}
			</div>
			<button className='floating-add' onClick={onContinue}><Icon name='plus' /> Add something</button>
		</div>
	);
};

export default ThingsView;
