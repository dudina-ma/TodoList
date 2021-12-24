const todos = [{
	id: 1,
	title: 'Shop',
	isDone: false,
	category: 2,
	isUrgent: false,
	description: 'To buy eggs'
},
{
	id: 2,
	title: 'Wash clothes',
	isDone: false,
	category: 1,
	isUrgent: false,
	description: 'White clothes'
},
{
	id: 3,
	title: 'Wash the dishes',
	isDone: true,
	category: 1,
	isUrgent: true,
	description: 'With soap'
},
{
	id: 4,
	title: 'Visit a doctor',
	isDone: false,
	category: 5,
	isUrgent: false,
	description: '12.24.2021'
},
{
	id: 5,
	title: 'Call to mom',
	isDone: false,
	category: 3,
	isUrgent: true,
	description: 'Tell about a new student program'
},
{
	id: 6,
	title: 'Return the book to Tom',
	isDone: false,
	category: 4,
	isUrgent: true,
	description: 'Twilight'
},
{
	id: 7,
	title: 'Feed the cats',
	isDone: false,
	category: 1,
	isUrgent: false,
	description: 'tuesday, thursday, saturday, sunday'
},
{
	id: 8,
	title: 'Watch the film',
	isDone: false,
	category: 1,
	isUrgent: false,
	description: 'Nobody'
},
];

const categories = [{
	id: 1,
	title: 'home',
},
{
	id: 2,
	title: 'shop',
},
{
	id: 3,
	title: 'family',
},
{
	id: 4,
	title: 'friends',
},
{
	id: 5,
	title: 'health',
},
];

module.exports = { todos, categories };
