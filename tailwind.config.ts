import { family as IBMPlexMonoFamily } from "@fontsource/ibm-plex-mono/metadata.json";
import { family as IBMPlexSansJPFamily } from "@fontsource/ibm-plex-sans-jp/metadata.json";
import typography from "@tailwindcss/typography";
import daisyUI, { type Config as DaisyUIConfig } from "daisyui";
import type { Config } from "tailwindcss";

export default {
	content: ["src/**/*.{astro,ts,tsx}"],
	theme: {
		extend: {},
		fontFamily: {
			sans: [IBMPlexSansJPFamily, "sans-serif"],
			mono: [IBMPlexMonoFamily, "monospace"],
		},
	},
	plugins: [typography, daisyUI],
	daisyui: {
		themes: ["nord", "dracula"],
		darkTheme: "dracula",
	} satisfies DaisyUIConfig,
} satisfies Config;
