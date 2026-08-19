import Icon from './icon';
import { mapStops, mapTrailSegments } from '../constants/journey';

const WorldMap = ({ chapter = 0, compact = false, onSelectStop, preview = false, selectableStops }) => {
	return (
		<div className={`world-map ${compact ? 'map-compact' : ''} ${preview ? 'map-preview' : ''}`}>
			<div className='map-paper'>
				<svg className='map-contours' viewBox='0 0 700 530' preserveAspectRatio='none' aria-hidden='true'>
					<path className='map-shore' d='M65 390C20 315 56 215 133 179c55-26 66-116 169-122 91-6 118 69 188 77 115 13 166 80 140 169-21 72 5 128-83 164-100 41-157-4-237 12-103 21-199-14-245-89Z' />
					<path d='M97 361c-22-76 33-124 88-151 63-31 70-99 143-106 69-6 105 69 173 70 67 1 111 47 89 111-25 74 13 118-70 143-75 23-137-8-204 9-80 20-192-15-219-76Z' />
					<path d='M154 339c-9-56 40-86 79-106 48-25 71-78 126-73 48 4 74 42 119 43 58 1 78 40 58 84-26 57 0 86-57 104-58 19-96-4-147 9-64 16-165-7-178-61Z' />
					<g className='map-trail'>
						{mapTrailSegments.map((segment, index) => (
							<g key={segment}>
								<path className='trail-segment-base' d={segment} />
								<path className={`trail-segment-light ${index < chapter ? 'lit' : ''}`} d={segment} pathLength='100' />
							</g>
						))}
					</g>
					<path className='river-line' d='M338 112c12 70 93 65 60 132s-15 98 46 143' />
				</svg>
				<div className='map-water water-one'><i /><i /><i /></div>
				<div className='map-mountains'><i /><i /><i /><span>▲</span></div>
				<div className='map-trees trees-a'>{Array.from({ length: 6 }).map((_, index) => <i key={index} />)}</div>
				<div className='map-trees trees-b'>{Array.from({ length: 5 }).map((_, index) => <i key={index} />)}</div>
				<div className='map-compass' aria-label='Map compass pointing north'><b>NORTH</b><i /><span>✦</span></div>
				{mapStops.map((stop, index) => {
					const current = index === chapter;
					const unlocked = index <= chapter || preview;
					const interactive = Boolean(onSelectStop && (!selectableStops || selectableStops.includes(stop.name)));
					const Stop = interactive ? 'button' : 'div';

					return (
						<Stop
							aria-current={current ? 'location' : undefined}
							aria-label={interactive ? `Open ${stop.name}` : undefined}
							className={`map-stop ${interactive ? 'map-stop-button' : ''} ${stop.className} ${current ? 'current' : ''} ${unlocked ? 'unlocked' : 'locked'}`}
							key={stop.name}
							onClick={interactive ? () => onSelectStop(stop.name) : undefined}
							style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
							type={interactive ? 'button' : undefined}
						>
							<span className='map-stop-icon'><Icon name={stop.icon} size={15} /></span>
							<strong>{stop.name}</strong>
							{stop.name === 'Mount Vault' && <small>Codes & digital keys</small>}
						</Stop>
					);
				})}
				{preview && <div className='map-preview-note'><Icon name='spark' size={13} /> Your family map begins here</div>}
			</div>
		</div>
	);
};

export default WorldMap;
