import { getCollection } from "astro:content";
import type { ContentEntryModule } from "astro";

type TermsFrontMatter = {
	title: string;
	ja: string;
	en: string;
};

type TermsEntityModule = Omit<ContentEntryModule, "data"> & {
	data: TermsFrontMatter;
};

type TermsEntity = {
	slug: string;
	title: string;
	ja: string;
	en: string;
	markdown: string;
};

/**
 * 用語のマークダウンコレクションを取得する
 */
export const getTermsCollection = async () => {
	const terms: TermsEntityModule[] = await getCollection("terms");

	return terms.map(
		({ slug, data: { title, ja, en }, body }) =>
			({
				slug,
				title,
				ja,
				en,
				markdown: body,
			}) satisfies TermsEntity,
	);
};
