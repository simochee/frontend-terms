import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	site: process.env.ASTRO_SITE,
	base: process.env.ASTRO_BASE,
	integrations: [tailwind()],
	vite: {
		plugins: [tsconfigPaths()],
	},
});
