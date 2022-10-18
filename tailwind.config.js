/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				header: "url('/header.png')",
			},
		},
		fontFamily: {
			sans: ['Inter', 'sans-serif'],
		},
	},
	plugins: [require('daisyui')],
    daisyui: {
        themes: ["light"],
    },
};
