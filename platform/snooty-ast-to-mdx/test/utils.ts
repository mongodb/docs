import { convertMdastToMdx } from '../src/core/convertMdastToMdx';
import { convertSnootyAstToMdast } from '../src/core/convertSnootyAstToMdast/convertSnootyAstToMdast';
import type { ConversionContext, SnootyNode } from '../src/core/convertSnootyAstToMdast/types';

interface ConvertSnootyAstArgs {
  ast: SnootyNode;
  onEmitMdxFile?: ConversionContext['emitMdxFile'];
}

/** Converts a Snooty AST to an MDX string and mdast tree for testing */
export const convertSnootyAst = ({ ast, onEmitMdxFile }: ConvertSnootyAstArgs) => {
  let rootNode = ast;
  if (ast.type !== 'root') {
    rootNode = { type: 'root', children: [ast] };
  }
  // make the output path relative to the current file
  const currentOutfilePath = './';

  const mdast = convertSnootyAstToMdast(rootNode, { onEmitMdxFile, currentOutfilePath });
  const mdx = convertMdastToMdx(mdast).trim();

  return { mdast, mdx };
};
