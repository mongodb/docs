import { stripIndent } from "common-tags";
import { SnootyNode } from "./SnootyDataSource";
import { parse, visit, findAll, AnyNode } from "docdoctor";

export const rstToSnootyAst = (rst: string): SnootyNode => {
  const node = parse(rst);

  // Transform docdoctor/restructured nodes to Snooty AST nodes according to
  // type
  visit(node, (node) => {
    const transform = restructuredToSnootyTypes[node.type];
    if (transform === undefined) {
      return;
    }
    const transforms = Array.isArray(transform) ? transform : [transform];
    transforms.forEach((transform) => {
      Object.assign(
        node,
        typeof transform === "string"
          ? { ...node, type: transform }
          : transform(node)
      );
    });
  });

  return node;
};

type Transform = (node: AnyNode) => AnyNode;

const stripTargets: Transform = (node) => {
  visit(node, (node) => {
    if (node.children === undefined) {
      return;
    }

    let children = node.children
      .map((child: AnyNode) => {
        // Restructured leaves the target in the inner text node: remove it.
        // e.g. `some ref <some-target>`
        return {
          ...child,
          value: child.value?.replace(/\s*<[^>]+>\s*$/, ""),
        };
      })
      .filter((child: AnyNode) => {
        // Remove child nodes that are just targets ("<some-target>")
        return child.value !== "";
      });

    // Trim space from last if needed
    children = children.map((child: AnyNode, i: number) => {
      return i === children.length - 1
        ? { ...child, value: child.value.replace(/\s+$/, "") }
        : child;
    });
    Object.assign(node, { ...node, children });
  });
  return node;
};

const restructuredToSnootyTypes: {
  // String = quick rename of 'type' property. Function = more involved
  // transformation. Array will apply transformations from left to right (a
  // string is always 'rename', last one wins).
  [k: string]: string | Transform | (string | Transform)[];
} = {
  document: "root",
  label(node) {
    return {
      type: "target_identifier",
      children: [{ type: "target", children: node.children }],
    };
  },
  directive(nodeIn) {
    const name = nodeIn.directive;
    const node = { ...nodeIn, name };
    if (name === "code-block") {
      const textNodes = findAll(node, ({ value }) => value !== undefined);
      return {
        type: "code",
        lang: node.args,
        value: stripIndent(
          textNodes.map(({ value }: AnyNode) => value).join("\n")
        ),
        directive: undefined,
        children: undefined,
      };
    }
    if (/^tabs.*/.test(name)) {
      return { ...node, name: "tabs" };
    }

    if (name === "tab") {
      // `argument` becomes the tab label
      return { ...node, argument: [{ type: "text", value: node.args }] };
    }
    return node;
  },
  title: "heading",
  interpreted_text: [stripTargets, "ref_role"],
  bullet_list(node) {
    return {
      ...node,
      type: "list",
      enumtype: "unordered",
    };
  },
  list_item: "listItem",
  reference: stripTargets,
  enumerated_list(node) {
    return {
      ...node,
      type: "list",
      enumtype: "arabic",
    };
  },
  text(node) {
    return { ...node, value: node.value.replace(/\n$/, " ") };
  },
};
