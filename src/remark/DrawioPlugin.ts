import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { RemarkPlugin } from "@astrojs/markdown-remark";
import sizeOf from "image-size";
import { is } from "unist-util-is";
import { visit } from "unist-util-visit";
import { toUrl } from "../utils/url";

export const remarkDrawioPlugin: RemarkPlugin = () => {
	return async (tree) => {
		return visit(tree, "paragraph", (node) => {
			if (node.children.length !== 1) return;

			const [childNode] = node.children;

			if (!is(childNode, "text")) return;

			const [, id] = childNode.value.match(/^\[\[(\w+)\]\]$/) || [];

			if (!id) return;

			try {
				const filePath = `/drawio/${id}.drawio.svg`;
				const { width, height } = sizeOf(
					fileURLToPath(
						new URL(join("../../public/", filePath), import.meta.url),
					),
				);

				node.data ||= {};
				node.data.hProperties ||= {};
				node.data.hProperties.className = ["drawio"];
				node.children = [
					{
						type: "image",
						data: {
							hProperties: { width, height },
						},
						url: toUrl(filePath),
					},
				];
			} catch (err) {
				console.error(err);

				node.children = [
					{
						type: "html",
						value: `<!-- [[${id}]] -->`,
					},
				];
			}
		});
	};
};
