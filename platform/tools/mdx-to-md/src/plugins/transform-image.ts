import { visit } from "unist-util-visit";

/**
 * Transform Image JSX components to markdown image syntax
 * Example: <Image src="/path/to/image.png" alt="description" />
 * Becomes: ![description](/path/to/image.png)
 */
export function transformImage() {
  return (tree: any) => {
    visit(tree, "mdxJsxFlowElement", (node: any) => {
      if (node.name === "Image") {
        // Extract attributes
        const attrs = node.attributes || [];
        const srcAttr = attrs.find((attr: any) => attr.name === "src");
        const altAttr = attrs.find((attr: any) => attr.name === "alt");

        const src = srcAttr?.value || "";
        const alt = altAttr?.value || "";

        // Convert to markdown image syntax
        node.type = "image";
        node.url = src;
        node.alt = alt;
        node.title = null;
        // Remove JSX-specific properties
        delete node.name;
        delete node.attributes;
        delete node.children;
      }
    });
  };
}
