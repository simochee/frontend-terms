import typography from "@tailwindcss/typography";
import daisyUI, { type Config as DaisyUIConfig } from "daisyui";
import type { Config } from "tailwindcss";

export default {
	content: ["src/**/*.{astro,ts,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [typography, daisyUI],
	daisyui: {
		themes: ["nord", "dracula"],
		darkTheme: "dracula",
	} satisfies DaisyUIConfig,
} satisfies Config;
