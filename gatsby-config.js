module.exports = {
	siteMetadata: {
		title: "Game of Life",
	},
	plugins: [
		{
			resolve: `gatsby-plugin-sass`,
			options: {
				postCssPlugins: [
					require("postcss-import"),
					require("tailwindcss"),
					require("./tailwind.config.js"),
					require("autoprefixer"),
				],
			},
		},
	],
}
