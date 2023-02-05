module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{png,js,html,css,json,md}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};