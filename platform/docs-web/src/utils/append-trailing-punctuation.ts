import type { ASTNode, ReferenceNode, RefRoleNode } from '@/types/ast';
import { isReferenceNode, isRefRoleNode, isTextNode } from '@/types/ast-utils';

// Append dangling punctuation to preceding Link's text
export const appendTrailingPunctuation = (nodes: ASTNode[]) => {
  const truncatedNodes = [];

  for (let i = 0; i < nodes.length; i++) {
    const currNode = nodes[i];
    const nextNode = nodes[i + 1];
    const hasDanglingSibling = isTextNode(nextNode) && nextNode.value.length === 1 && !nextNode.value.match(/\s/);
    // Note: If issues arise, instead of matching for non-whitespace, we might consider checking FOR certain singular punctuation
    // ie: regex match for  .?!,:;)*"']}`

    if ((isReferenceNode(currNode) || isRefRoleNode(currNode)) && hasDanglingSibling) {
      const copyOfNodeWithDeepCopiedChildren = deepCopyNodesChildren(currNode);
      copyOfNodeWithDeepCopiedChildren.children.push(nextNode);
      truncatedNodes.push(copyOfNodeWithDeepCopiedChildren);
      i++;
      continue;
    }
    truncatedNodes.push(currNode);
  }
  return truncatedNodes;
};

// Make a copy of node with a deep copy of the new child node
function deepCopyNodesChildren(refNode: ReferenceNode | RefRoleNode) {
  if (!refNode.children || !refNode.children.length) return { ...refNode };
  const copyOfChildren = [...refNode.children];

  const copyOfNode = {
    ...refNode,
    children: copyOfChildren,
  };
  return copyOfNode;
}
