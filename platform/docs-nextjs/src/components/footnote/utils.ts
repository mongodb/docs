import type { ASTNode } from '@/types/ast';
import type { FootnoteNode, FootnoteReferenceNode } from '@/types/ast';
import { findAllKeyValuePairs } from '@/utils/find-all-key-value-pairs';
import type { FootnoteType } from './footnote-context';

export const getFootnotes = (nodes: ASTNode[]) => {
  const footnotes = findAllKeyValuePairs(nodes, 'type', 'footnote') as FootnoteNode[];
  const footnoteReferences = findAllKeyValuePairs(nodes, 'type', 'footnote_reference') as FootnoteReferenceNode[];
  const numAnonRefs = footnoteReferences.filter(
    (node) => !Object.prototype.hasOwnProperty.call(node, 'refname'),
  ).length;
  // We label our footnotes by their index, regardless of their names to
  // circumvent cases such as [[1], [#], [2], ...]
  return footnotes.reduce<Record<string, FootnoteType>>((map, footnote, index) => {
    if (footnote.name) {
      // Find references associated with a named footnote

      map[footnote.name] = {
        label: index + 1,
        references: getNamedFootnoteReferences(footnoteReferences, footnote.name),
      };
    } else {
      // Find references associated with an anonymous footnote
      // Replace potentially broken anonymous footnote ids
      footnote.id = `${index + 1}`;

      map[footnote.id] = {
        label: index + 1,
        references: getAnonymousFootnoteReferences(index, numAnonRefs),
      };
    }
    return map;
  }, {});
};

// Find all footnote_reference node IDs associated with a given footnote by
// that footnote's refname
const getNamedFootnoteReferences = (footnoteReferences: FootnoteReferenceNode[], refname: string) => {
  return footnoteReferences.filter((node) => node.refname === refname).map((node) => node.id);
};

// They are used infrequently, but here we match an anonymous footnote to its reference.
// The nth footnote on a page is associated with the nth reference on the page. Since
// anon footnotes and footnote references are anonymous, we assume a 1:1 pairing, and
// have no need to query nodes. If there are more anonymous footnotes than references,
// we may return an empty array
const getAnonymousFootnoteReferences = (index: number, numAnonRefs: number) => {
  return index > numAnonRefs ? [] : [`id${index + 1}`];
};
