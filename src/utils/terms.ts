import { type CollectionEntry, getCollection } from "astro:content";

type TermsFrontMatter = {
	title: string;
	ja: string;
	en: string;
};

type TermsEntity = Omit<CollectionEntry<"terms">, "data"> & {
	frontmatter: TermsFrontMatter;
};

/**
 * 用語のマークダウンコレクションを取得する
 */
export const getTermsCollection = async () => {
	const terms = await getCollection("terms");

	return terms.map(
		({ data, ...term }) =>
			({
				...term,
				frontmatter: data as TermsFrontMatter,
			}) satisfies TermsEntity,
	);
};
