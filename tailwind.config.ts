import type { Config } from "tailwindcss"

interface AddUtilities {
	(config: any): void
}

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			height: {
				screen: "calc(var(--vh, 1vh) * 100)",
				navScreen: "calc(calc(var(--vh, 1vh) * 100) - 64px)",
				bottomNavScreen: "calc(calc(var(--vh, 1vh) * 100) - 220px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		function ({ addUtilities }: { addUtilities: Function }) {
			addUtilities(
				{
					".scrollbar-hide": {
						/* IE and Edge */
						"-ms-overflow-style": "none",
						/* Firefox */
						"scrollbar-width": "none",
						/* Safari and Chrome */
						"&::-webkit-scrollbar": {
							display: "none",
						},
					},
					".scrollbar": {
						/* IE and Edge */
						"-ms-overflow-style": "auto",
						/* Firefox */
						"scrollbar-width": "auto",
						/* Safari and Chrome */
						"&::-webkit-scrollbar": {
							display: "block",
							width: "6px",
							height: "6px",
						},
						"&::-webkit-scrollbar-track": {
							background: "transparent",
						},

						"&::-webkit-scrollbar-thumb": {
							background: "#8880",
							borderRadius: "35px",
						},

						"&::-webkit-scrollbar-thumb:hover": {
							background: "#555",
						},

						"&::-webkit-scrollbar-corner": {
							background: "transparent",
						},
					},
					".scrollbar:hover": {
						"&::-webkit-scrollbar-thumb": {
							background: "#888",
						},
					},
				},
				["responsive"]
			)
		},
	],
} satisfies Config

export default config
