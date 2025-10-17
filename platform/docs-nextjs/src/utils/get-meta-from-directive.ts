// Grabs the metadata values in question and returns them as an object

import type { ASTNode, Directive, MetaNode, ParentNode, Root, TwitterNode } from '@/types/ast';

// for the Meta & TwitterMeta tags
const grabMetadata = (nodes: ASTNode[], target: 'meta' | 'twitter') => {
  if (!nodes) {
    return [];
  }
  return nodes.filter((c) => {
    const lookup = c.type === 'directive' ? (c as Directive).name : c.type;
    return lookup === target;
  });
};

/**
 * Gets metadata directives from the AST nodes
 *
 * .. meta directive can be written in the root level, or in a section (below a heading)
 * so we need to check two levels
 *
 */
const getMetaFromDirective = ({ rootNode }: { rootNode: Root }) => {
  const children = rootNode.children;
  const metaNodes = grabMetadata(children, 'meta');
  const twitterNodes = grabMetadata(children, 'twitter');

  // getting the meta from pageNodes
  // extract the section to look for the metadata in the second layer
  const section = children.find((node) => node.type === 'section') as ParentNode;
  if (section) {
    // get the nested values from section
    // and look for the metadata to collect
    const sectionNodes = section.children ?? ([] as ASTNode[]);
    metaNodes.push(...grabMetadata(sectionNodes, 'meta'));
    twitterNodes.push(...grabMetadata(sectionNodes, 'twitter'));
  }

  // Extract the first found meta and twitter nodes
  const metaNode = metaNodes[0] as MetaNode | undefined;
  const twitterNode = twitterNodes[0] as TwitterNode | undefined;

  // Return object with extracted values
  return {
    description: metaNode?.options?.description,
    robots: metaNode?.options?.robots,
    keywords: metaNode?.options?.keywords,
    canonical: metaNode?.options?.canonical,
    twitter: {
      creator: twitterNode?.options?.creator,
      image: twitterNode?.options?.image,
      'image-alt': twitterNode?.options?.['image-alt'],
      site: twitterNode?.options?.site,
      title: twitterNode?.options?.title,
    },
  };
};

export { getMetaFromDirective };
