/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				background: "var(--background)",
				border: "var(--border)",
				"title-text": "var(--title-text)",
				"text-color": "var(--text-color)",
				"header-bg": "var(--header-bg)",
				"header-bg-hover": "var(--header-bg-hover)",
				filters: "var(--filters)",
				"filter-def": "var(--filter-def)",
				blink: "var(--blink)",
				"table-bg": "var(--table-bg)",
				"data-bg": "var(--data-bg)",
			},
		},
	},
	plugins: [],
};
