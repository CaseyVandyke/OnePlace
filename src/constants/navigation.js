export const screens = {
	WELCOME: 'welcome',
	INTRO: 'intro',
	JOURNEY: 'journey',
	COMPLETE: 'complete',
	APP: 'app'
};

export const appViews = {
	PATH: 'My path',
	THINGS: 'My things',
	POSSESSIONS: 'Possessions',
	PEOPLE: 'My people',
	MESSAGES: 'Messages'
};

export const appNavigationItems = [
	appViews.PATH,
	appViews.THINGS,
	appViews.PEOPLE,
	appViews.MESSAGES
];

export const mapDestinationViews = {
	Basecamp: appViews.PATH,
	'Paper Port': appViews.THINGS,
	'Money Meadow': appViews.THINGS,
	'Safety Harbor': appViews.THINGS,
	'Kindred Grove': appViews.PEOPLE,
	'Memory Lake': appViews.MESSAGES
};
