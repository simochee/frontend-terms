import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	site: import.meta.env.ASTRO_SITE,
	base: import.meta.env.ASTRO_BASE,
	integrations: [tailwind()],
	vite: {
		plugins: [tsconfigPaths()],
	},
});
