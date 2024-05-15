import typography from "@tailwindcss/typography";
import daisyUI from "daisyui";
import type { Config } from "tailwindcss";

export default {
	content: ["src/**/*.{astro,ts,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [typography, daisyUI],
} satisfies Config;
