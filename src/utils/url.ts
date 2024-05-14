import { join } from "node:path";

type Url = [""] | ["terms", string];

export const getUrl = <K extends Url>(...args: K): string => {
	return join(import.meta.env.BASE_URL, args.join("/"))
		.concat("/")
		.replace(/\/+/g, "/");
};
