/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
	siteMetadata: {
		title: `Fun Todolist`,
		siteUrl: `https://www.yourdomain.tld`,
	},
	plugins: [
		'gatsby-plugin-postcss',
		{
			options: {
				icon: 'src/images/favicon.ico',
			},
		},
	],
};
