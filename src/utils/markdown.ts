import DOMPurify from "isomorphic-dompurify";
import { parse } from "marked";

export const parseMarkdown = async (markdown: string): Promise<string> => {
	return DOMPurify.sanitize(await parse(markdown));
};
