import { type CollectionEntry, getCollection } from "astro:content";

type TermsFrontMatter = {
	title: string;
	ja: string;
	en: string;
};

type TermsEntity = Omit<CollectionEntry<"terms">, "data" | "slug"> & {
	slug: string;
	frontmatter: TermsFrontMatter;
};

/**
 * 用語のマークダウンコレクションを取得する
 */
export const getTermsCollection = async () => {
	const terms = await getCollection("terms");

	return terms
		.filter(({ slug }) => import.meta.env.DEV || !slug.startsWith("-"))
		.map(
			({ data, ...term }) =>
				({
					...term,
					slug: term.slug.replace(/^-/, ""),
					frontmatter: data as TermsFrontMatter,
				}) satisfies TermsEntity,
		);
};
