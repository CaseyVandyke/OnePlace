export const accessItems = [
	{
		id: 'will-reference',
		category: 'Paper Port',
		title: 'Will contact and general location',
		description: 'Who holds it, how to reach them, and where the original is generally kept.'
	},
	{
		id: 'financial-references',
		category: 'Money Meadow',
		title: 'Financial institutions and contact paths',
		description: 'Institution names, account categories, and safe ways to contact them—never passwords or full account numbers.'
	},
	{
		id: 'protection-references',
		category: 'Safety Harbor',
		title: 'Insurance and care contacts',
		description: 'Policy categories, professional contacts, and care wishes.'
	},
	{
		id: 'grandmothers-ring',
		category: 'Possessions & keepsakes',
		title: 'Grandmother’s ring',
		description: 'The intended recipient, location, photo, and personal note.'
	},
	{
		id: 'woodworking-tools',
		category: 'Possessions & keepsakes',
		title: 'Dad’s woodworking tools',
		description: 'The intended recipient, location, photo, and personal note.'
	},
	{
		id: 'personal-message',
		category: 'Memory Lake',
		title: 'Personal voice message',
		description: 'The private recording left for the people you love.'
	},
	{
		id: 'device-access-location',
		category: 'Mount Vault',
		title: 'Device-access instruction location',
		description: 'Where instructions are kept—not the password, code, or key itself.'
	}
];

export const initialTrustedPeople = [
	{
		id: 'daniel',
		name: 'Daniel',
		relationship: 'Son',
		accessMode: 'now',
		itemIds: ['will-reference', 'financial-references', 'protection-references', 'device-access-location']
	},
	{
		id: 'emma',
		name: 'Emma',
		relationship: 'Daughter',
		accessMode: 'when-needed',
		itemIds: ['grandmothers-ring', 'personal-message']
	},
	{
		id: 'jack',
		name: 'Jack',
		relationship: 'Brother',
		accessMode: 'when-needed',
		itemIds: ['woodworking-tools']
	}
];
