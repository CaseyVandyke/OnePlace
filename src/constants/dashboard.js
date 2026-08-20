export const pathStops = [
	{ chapter: 'Basecamp', title: 'Set your starting point', copy: 'Who you’re preparing for and what your family calls this place', icon: 'home', questionIndexes: [0, 1] },
	{ chapter: 'Paper Port', title: 'Make your legal papers easy to find', copy: 'Will, document contacts and where the original is kept', icon: 'file', questionIndexes: [2, 3] },
	{ chapter: 'Money Meadow', title: 'Leave a clear trail—not a treasure hunt', copy: 'Financial institutions and safe contact references', icon: 'bank', questionIndexes: [4, 5] },
	{ chapter: 'Safety Harbor', title: 'Connect the protections that matter', copy: 'Life, disability, medical and care wishes', icon: 'shield', questionIndexes: [6] },
	{ chapter: 'Kindred Grove', title: 'Choose the people who matter', copy: 'Trusted people, meaningful possessions and recipients', icon: 'people', questionIndexes: [7, 8] },
	{ chapter: 'Memory Lake', title: 'Leave more than instructions', copy: 'A personal message in your own voice', icon: 'message', questionIndexes: [9] }
];

export const rooms = [
	{ id: 'paper-port', icon: 'file', name: 'Paper Port', count: '3 items', copy: 'Your important papers are in good order', color: 'red' },
	{ id: 'money-meadow', icon: 'bank', name: 'Money Meadow', count: '2 items', copy: 'Four steps will make the trail clear', color: 'purple' },
	{ id: 'safety-harbor', icon: 'shield', name: 'Safety Harbor', count: '1 item', copy: 'Add life or disability insurance next', color: 'blue' },
	{ id: 'mount-vault', icon: 'key', name: 'Mount Vault', count: 'Not started', copy: 'Vault codes, devices and digital access', color: 'iris' },
	{ id: 'memory-lake', icon: 'heart', name: 'Memory Lake', count: '1 message', copy: 'Stories and wishes in your own words', color: 'pink' },
	{ id: 'possessions', icon: 'gift', name: 'Possessions & keepsakes', count: '2 wishes', copy: 'Meaningful belongings and who should receive them', color: 'plum' }
];

export const messagePrompts = [
	'Tell the story behind something you treasure.',
	'Share a family tradition you hope continues.',
	'Say what you’re most proud of.',
	'Leave advice for a future milestone.'
];

export const quickStepOptions = [
	'Password manager',
	'Printed instructions',
	'With a trusted person',
	'Somewhere else'
];
