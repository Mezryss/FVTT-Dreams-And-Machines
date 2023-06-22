/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'templates/**/*.hbs',
		'module/**/*.{js,mjs}',
	],
	theme: {
		extend: {
			borderWidth: {
				'1': '1px',
			},
			fontFamily: {
				'roboto-flex': '"Roboto Flex", sans-serif',
			},
		},
		fontFamily: {
			body: ['Roboto Flex', 'sans-serif'],
			sans: ['Roboto Flex', 'sans-serif'],
		},
	},
	plugins: [
		require('@tailwindcss/container-queries'),
		require('@tailwindcss/custom-forms'),
		require('@tailwindcss/typography'),
	],
};
