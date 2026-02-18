import { visit } from "unist-util-visit";
import type { Root, Heading, Paragraph } from "mdast";

type MdastNode = Root["children"][number];

function toNumber(v: unknown): number {
  if (typeof v === "number") return v;
  if (typeof v === "string") return parseInt(v, 10);
  if (v && typeof v === "object" && "value" in v)
    return toNumber((v as { value: unknown }).value);
  return NaN;
}

function isSectionNode(p: unknown): boolean {
  return (
    typeof p === "object" &&
    p !== null &&
    ((p as any).type === "mdxJsxFlowElement" ||
      (p as any).type === "mdxJsxTextElement") &&
    (p as any).name === "Section"
  );
}

/**
 * Transform <Heading> and <Section>…<Heading> from Snooty/RST into markdown headings.
 *
 * RST heading level is determined by section nesting: root-level = h1, inside one
 * Section = h2, inside two Sections = h3, etc. We infer level by counting Section
 * ancestors (flow or inline), then replace each <Heading> with an mdast heading node.
 */
export function transformHeading() {
  return (tree: Root) => {
    const parentMap = new Map<unknown, { children: MdastNode[] }>();
    visit(tree, (node: unknown, index: number | undefined, parent: unknown) => {
      if (
        parent &&
        typeof (parent as { children?: unknown[] }).children !== "undefined"
      ) {
        parentMap.set(node, parent as { children: MdastNode[] });
      }
    });

    const replacements: Array<{
      parent: { children: MdastNode[] };
      index: number;
      nodes: MdastNode[];
    }> = [];

    const getDepth = (node: any, parent: any): 1 | 2 | 3 | 4 | 5 | 6 => {
      const attrs = node.attributes || [];
      const depthAttr = attrs.find(
        (a: any) => a.name === "depth" || a.name === "level"
      );
      const explicitDepth =
        depthAttr?.value != null ? toNumber(depthAttr.value) : NaN;
      const hasExplicit =
        Number.isInteger(explicitDepth) &&
        explicitDepth >= 1 &&
        explicitDepth <= 6;
      if (hasExplicit) return explicitDepth as 1 | 2 | 3 | 4 | 5 | 6;
      let sectionDepth = 0;
      let p: unknown = parent;
      while (p) {
        if (isSectionNode(p)) sectionDepth += 1;
        p = parentMap.get(p);
      }
      // First level of Section (or no Section) = h1; nested Section = h2, etc.
      return Math.min(6, Math.max(1, sectionDepth)) as 1 | 2 | 3 | 4 | 5 | 6;
    };

    const toPhrasing = (nodes: unknown[]): Heading["children"] => {
      const out: Heading["children"] = [];
      for (const n of nodes) {
        if (typeof n !== "object" || n === null) continue;
        const obj = n as { type?: string; children?: unknown[] };
        if (
          obj.type === "text" ||
          obj.type === "emphasis" ||
          obj.type === "strong" ||
          obj.type === "inlineCode" ||
          obj.type === "link"
        ) {
          out.push(n as any);
        } else if (obj.type === "paragraph" && Array.isArray(obj.children)) {
          out.push(...toPhrasing(obj.children));
        } else if (Array.isArray(obj.children)) {
          out.push(...toPhrasing(obj.children));
        }
      }
      return out;
    };

    visit(tree, (node: any, index: number | undefined, parent: any) => {
      if (index === undefined || !parent) return;
      const isFlow =
        node.type === "mdxJsxFlowElement" && node.name === "Heading";
      const isInline =
        node.type === "mdxJsxTextElement" && node.name === "Heading";
      if (!isFlow && !isInline) return;

      const depth = getDepth(node, parent);
      const headingChildren: Heading["children"] = Array.isArray(node.children)
        ? toPhrasing(node.children)
        : [];
      const heading: Heading = {
        type: "heading",
        depth,
        children: headingChildren,
      };

      if (isFlow) {
        replacements.push({
          parent: parent as { children: MdastNode[] },
          index,
          nodes: [heading],
        });
        return;
      }

      const grandparent = parentMap.get(parent) as
        | { children: MdastNode[] }
        | undefined;
      if (!grandparent) return;

      if (parent.type === "paragraph") {
        const parIndex = grandparent.children.indexOf(parent);
        if (parIndex === -1) return;
        if (parent.children?.length === 1) {
          replacements.push({
            parent: grandparent,
            index: parIndex,
            nodes: [heading],
          });
          return;
        }
        const rest = (parent.children as any[]).filter((c: any) => c !== node);
        const restPhrasing = toPhrasing(rest);
        if (restPhrasing.length > 0) {
          const restParagraph: Paragraph = {
            type: "paragraph",
            children: restPhrasing as Paragraph["children"],
          };
          replacements.push({
            parent: grandparent,
            index: parIndex,
            nodes: [heading, restParagraph],
          });
        } else {
          replacements.push({
            parent: grandparent,
            index: parIndex,
            nodes: [heading],
          });
        }
        return;
      }

      if (isSectionNode(parent)) {
        const paragraph = grandparent as MdastNode;
        const container = parentMap.get(paragraph) as
          | { children: MdastNode[] }
          | undefined;
        if (!container) return;
        const paragraphIndex = container.children.indexOf(paragraph);
        if (paragraphIndex === -1) return;
        const siblingNodes = (parent.children as any[]).filter(
          (c: any) => c !== node
        );
        const rest: MdastNode[] = [];
        for (const s of siblingNodes) {
          if (s?.type === "text" && typeof s.value === "string") {
            const trimmed = (s.value as string).trim();
            if (trimmed) {
              const p: MdastNode = {
                type: "paragraph",
                children: [{ type: "text", value: s.value }],
              };
              rest.push(p);
            }
          }
        }
        replacements.push({
          parent: container,
          index: paragraphIndex,
          nodes: [heading, ...rest],
        });
      }
    });

    const byParent = new Map<
      { children: MdastNode[] },
      Array<{ index: number; nodes: MdastNode[] }>
    >();
    for (const r of replacements) {
      const list = byParent.get(r.parent) ?? [];
      list.push({ index: r.index, nodes: r.nodes });
      byParent.set(r.parent, list);
    }
    for (const [parent, list] of byParent) {
      list.sort((a, b) => b.index - a.index);
      for (const { index, nodes } of list) {
        parent.children.splice(index, 1, ...nodes);
      }
    }
  };
}
