export const chapters = [
	{ name: 'Basecamp', icon: 'home', color: 'coral', short: 'Start with what matters' },
	{ name: 'Paper Port', icon: 'file', color: 'red', short: 'The papers they’ll need' },
	{ name: 'Money Meadow', icon: 'bank', color: 'purple', short: 'Accounts without the hunt' },
	{ name: 'Safety Harbor', icon: 'shield', color: 'blue', short: 'Insurance and care' },
	{ name: 'Kindred Grove', icon: 'people', color: 'iris', short: 'The right access' },
	{ name: 'Memory Lake', icon: 'message', color: 'pink', short: 'More than paperwork' }
];

export const questions = [
	{
		chapter: 0,
		eyebrow: 'Let’s make it yours',
		title: 'Who are you preparing this for?',
		copy: 'Choose everyone who comes to mind. This helps us shape the questions around your life.',
		type: 'multi',
		options: ['My spouse or partner', 'My children', 'Extended family', 'A close friend', 'Someone else']
	},
	{
		chapter: 0,
		eyebrow: 'A little about you',
		title: 'What should your family call this place?',
		copy: 'It can simply be your name, your family name, or something more personal.',
		type: 'name'
	},
	{
		chapter: 1,
		eyebrow: 'Paper Port · Important documents',
		title: 'Do you have a will?',
		copy: 'No judgment either way. Your answer helps us give you the right next step.',
		type: 'single',
		options: ['Yes, I have one', 'I’m working on it', 'Not yet', 'I’m not sure']
	},
	{
		chapter: 1,
		eyebrow: 'Bring it into OnePlace',
		title: 'Want to add your will now?',
		copy: 'Upload a copy, take a photo, or tell us where the original is kept.',
		type: 'upload'
	},
	{
		chapter: 2,
		eyebrow: 'Money Meadow · Accounts',
		title: 'Where do you keep everyday accounts?',
		copy: 'We’ll make a simple inventory first. You decide whether to add account details or passwords later.',
		type: 'banks',
		options: ['Chase', 'Wells Fargo', 'Mountain America', 'Capital One', 'Another institution']
	},
	{
		chapter: 2,
		eyebrow: 'One helpful detail',
		title: 'How should your family identify this account?',
		copy: 'For this concept, use fictional information only.',
		type: 'account'
	},
	{
		chapter: 3,
		eyebrow: 'Safety Harbor · Protection',
		title: 'Which protections do you already have?',
		copy: 'Select anything that applies. We’ll create a short task for each one.',
		type: 'multi',
		options: ['Life insurance', 'Disability insurance', 'Health insurance', 'Long-term care', 'Advance directive', 'Power of attorney']
	},
	{
		chapter: 4,
		eyebrow: 'Kindred Grove · Your people',
		title: 'Who should be your first trusted person?',
		copy: 'They won’t see anything until you explicitly choose what to share.',
		type: 'person'
	},
	{
		chapter: 4,
		eyebrow: 'Kindred Grove · Possessions & keepsakes',
		title: 'Is there something special you want someone to receive?',
		copy: 'Start with one meaningful possession. You can build a complete “who gets what” list later.',
		type: 'possessions'
	},
	{
		chapter: 5,
		eyebrow: 'Memory Lake · Your voice',
		title: 'Would you like to leave a hello?',
		copy: 'A short voice note can mean more than every document combined.',
		type: 'voice'
	}
];

export const mapStops = [
	{ name: 'Basecamp', icon: 'home', x: 18, y: 80, className: 'basecamp' },
	{ name: 'Paper Port', icon: 'file', x: 12, y: 42, className: 'paper-port' },
	{ name: 'Money Meadow', icon: 'bank', x: 36, y: 20, className: 'money-meadow' },
	{ name: 'Safety Harbor', icon: 'shield', x: 68, y: 79, className: 'safety-harbor' },
	{ name: 'Kindred Grove', icon: 'people', x: 84, y: 43, className: 'kindred-grove' },
	{ name: 'Memory Lake', icon: 'message', x: 53, y: 49, className: 'memory-lake' },
	{ name: 'Mount Vault', icon: 'key', x: 79, y: 14, className: 'mount-vault' }
];

export const mapTrailSegments = [
	'M126 424C102 350 70 288 84 223',
	'M84 223C110 170 175 150 252 106',
	'M252 106C340 125 390 320 476 419',
	'M476 419C510 355 535 278 588 228',
	'M588 228C530 205 460 225 371 260'
];

export const journeyIntroSlides = [
	{
		eyebrow: 'HOW THE JOURNEY WORKS · 1 OF 3',
		icon: 'check',
		title: 'One small step at a time.',
		copy: 'We’ll ask one clear question at a time. Add what you know, skip what you don’t, and come back whenever you’re ready.',
		note: 'There is no deadline and no perfect way to begin.'
	},
	{
		eyebrow: 'HOW THE JOURNEY WORKS · 2 OF 3',
		icon: 'spark',
		title: 'Your path lights up as you go.',
		copy: 'Each finished task illuminates more of your trail and brings another important place on the family map to life.',
		note: 'Discover new places, then light them by making progress.'
	},
	{
		eyebrow: 'HOW THE JOURNEY WORKS · 3 OF 3',
		icon: 'shield',
		title: 'You stay in control.',
		copy: 'You choose what to add, who can see it, and when they can access it. Adding a trusted person never gives them automatic access.',
		note: 'For this concept, use fictional information only.'
	}
];
