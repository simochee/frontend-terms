import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import tsconfigPaths from "vite-tsconfig-paths";
import { remarkDrawioPlugin } from "./src/remark/DrawioPlugin";
import { remarkTermsLinkPlugin } from "./src/remark/TermsLinkPlugin";

export default defineConfig({
	site: process.env.ASTRO_SITE,
	base: process.env.ASTRO_BASE,
	trailingSlash: "always",
	integrations: [tailwind({ nesting: true })],
	vite: {
		plugins: [tsconfigPaths()],
	},
	markdown: {
		remarkPlugins: [remarkDrawioPlugin, remarkTermsLinkPlugin],
	},
});
