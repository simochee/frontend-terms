import { join } from "node:path";

type Url = [""] | ["terms", string];

export const toUrl = (path: string): string => {
	return join(process.env.ASTRO_BASE || import.meta.env.BASE_URL, path);
};

export const getUrl = <K extends Url>(...args: K): string => {
	return toUrl(args.join("/")).concat("/").replace(/\/+/g, "/");
};
