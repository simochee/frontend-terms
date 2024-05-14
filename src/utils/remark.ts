import { readFile } from "node:fs/promises";
import { basename } from "node:path";
import type { RemarkPlugin } from "@astrojs/markdown-remark";
import matter from "gray-matter";
import type { PhrasingContent } from "mdast";
import { is } from "unist-util-is";
import { visit } from "unist-util-visit";
import { getUrl } from "./url";

const modules = await import.meta.glob("../content/terms/*.md");
const paths = Object.keys(modules);
const termsEntries = await Promise.all(
	paths.map(async (path) => {
		const content = await readFile(new URL(path, import.meta.url), "utf-8");
		const { data } = matter(content);

		if ("title" in data && typeof data.title === "string") {
			const slug = basename(path, ".md");

			return [data.title, slug];
		}

		return [];
	}),
);
// 用語集を { [タイトル]: Slug } の形式にしたマップ
const termsMap = Object.fromEntries(
	termsEntries.filter(([title]) => typeof title === "string"),
);

// [タイトル] を用語へのリンクに変換するプラグイン
export const remarkTermsLinkPlugin: RemarkPlugin = () => {
	return async (tree) => {
		return visit(tree, "paragraph", (node, index) => {
			node.children.forEach((childNode, childIndex) => {
				if (!is(childNode, "text")) return;

				const chunks = childNode.value.split(/(\[.+?\])/);

				const children = chunks.map<PhrasingContent>((value, chunkIndex) => {
					if (chunkIndex % 2 === 0) {
						return { type: "text", value };
					}

					const title = value.slice(1, -1);
					const slug = termsMap[title];

					if (!slug) {
						return { type: "text", value: title };
					}

					return {
						type: "link",
						url: getUrl("terms", slug),
						children: [{ type: "text", value: title }],
					};
				});

				node.children.splice(childIndex, 1, ...children);
			});
		});
	};
};
