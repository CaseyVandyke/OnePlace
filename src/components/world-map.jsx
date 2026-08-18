import Icon from './icon';
import NorthStar from './north-star';
import { mapStops } from '../constants/journey';

const WorldMap = ({ chapter = 0, compact = false, preview = false }) => {
	const position = mapStops[Math.min(chapter, 5)];

	return (
		<div className={`world-map ${compact ? 'map-compact' : ''} ${preview ? 'map-preview' : ''}`}>
			<div className='map-paper'>
				<svg className='map-contours' viewBox='0 0 700 530' preserveAspectRatio='none' aria-hidden='true'>
					<path className='map-shore' d='M65 390C20 315 56 215 133 179c55-26 66-116 169-122 91-6 118 69 188 77 115 13 166 80 140 169-21 72 5 128-83 164-100 41-157-4-237 12-103 21-199-14-245-89Z' />
					<path d='M97 361c-22-76 33-124 88-151 63-31 70-99 143-106 69-6 105 69 173 70 67 1 111 47 89 111-25 74 13 118-70 143-75 23-137-8-204 9-80 20-192-15-219-76Z' />
					<path d='M154 339c-9-56 40-86 79-106 48-25 71-78 126-73 48 4 74 42 119 43 58 1 78 40 58 84-26 57 0 86-57 104-58 19-96-4-147 9-64 16-165-7-178-61Z' />
					<path className='trail-line' d='M119 406C93 326 78 267 95 228s108-47 151-97 158 70 145 129 82 134 78 90 79-117 105-131 9-77 8-112' />
					<path className='river-line' d='M338 112c12 70 93 65 60 132s-15 98 46 143' />
				</svg>
				<div className='map-water water-one'><i /><i /><i /></div>
				<div className='map-mountains'><i /><i /><i /><span>▲</span></div>
				<div className='map-trees trees-a'>{Array.from({ length: 6 }).map((_, index) => <i key={index} />)}</div>
				<div className='map-trees trees-b'>{Array.from({ length: 5 }).map((_, index) => <i key={index} />)}</div>
				<div className='map-compass' aria-label='Map compass pointing north'><b>NORTH</b><i /><span>✦</span></div>
				{mapStops.map((stop, index) => (
					<div
						className={`map-stop ${stop.className} ${index === chapter ? 'current' : ''} ${index <= chapter || preview ? 'unlocked' : 'locked'}`}
						style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
						key={stop.name}
					>
						<span><Icon name={stop.icon} size={15} /></span>
						<strong>{stop.name}</strong>
						{stop.name === 'Mount Vault' && <small>Codes & digital keys</small>}
					</div>
				))}
				{!preview && (
					<div className={`map-explorer map-explorer-${position.className}`} style={{ left: `${position.x}%`, top: `${position.y}%` }}>
						<span className='map-explorer-marker'><NorthStar size={compact ? 42 : 54} /></span>
						<span>You are here</span>
					</div>
				)}
				{preview && (
					<div className='map-preview-marker' style={{ left: `${mapStops[0].x}%`, top: `${mapStops[0].y}%` }}>
						<NorthStar size={54} />
						<span className='map-marker-label'>Your North Star</span>
					</div>
				)}
				{preview && <div className='map-preview-note'><Icon name='spark' size={13} /> Your family map begins here</div>}
			</div>
		</div>
	);
};

export default WorldMap;
