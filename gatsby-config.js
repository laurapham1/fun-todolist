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
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: `Fun To-do list`,
				start_url: `/`,
				icon: 'src/images/favicon.ico',
			},
		},
	],
};
