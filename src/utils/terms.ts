import { getCollection } from "astro:content";
import type { ContentEntryModule } from "astro";

type TermsFrontMatter = {
	title: string;
	ja: string;
	en: string;
};

type TermsEntity = Omit<ContentEntryModule, "data"> & {
	data: TermsFrontMatter;
};

/**
 * 用語のマークダウンコレクションを取得する
 */
export const getTermsCollection = async () => {
	const terms: TermsEntity[] = await getCollection("terms");

	return terms;
};
