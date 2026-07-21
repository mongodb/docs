/*
 * Given an array of text nodes with formatting, retrieve the string.
 * Returns plaintext string indicating the nested title.
 */

import type { ASTNode } from '@/types/ast';
import { isParentNode, isTextNode } from '@/types/ast-utils';

export const getPlaintext = (nodeArray: ASTNode[]) => {
  const extractText = (title: string, node: ASTNode): string => {
    if (isTextNode(node)) {
      return title + node.value;
    } else if (isParentNode(node)) {
      return title + node.children.reduce(extractText, '');
    }
    return title;
  };

  return nodeArray && nodeArray.length > 0 ? nodeArray.reduce(extractText, '') : '';
};
