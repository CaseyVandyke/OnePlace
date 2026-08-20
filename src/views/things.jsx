import Icon from '../components/icon';
import { rooms } from '../constants/dashboard';

const ThingsView = ({ onOpenRoom }) => {
	return (
		<div className='collection-page'>
			<header>
				<p>MY THINGS</p>
				<h1>Every part of your life,<br />given a proper place.</h1>
				<span>Choose a section to review or continue.</span>
			</header>
			<div className='room-shelf'>
				{rooms.map((room, index) => (
					<button
						className={`room-block room-${room.color}`}
						key={room.id}
						onClick={() => onOpenRoom(room.id)}
						type='button'
					>
						<span className='room-number'>0{index + 1}</span>
						<span className='room-icon'><Icon name={room.icon} /></span>
						<small>{room.count}</small>
						<strong>{room.name}</strong>
						<p>{room.copy}</p>
						<i><Icon name='arrow' /></i>
					</button>
				))}
			</div>
		</div>
	);
};

export default ThingsView;
