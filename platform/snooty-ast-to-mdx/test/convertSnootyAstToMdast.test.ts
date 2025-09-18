/**
 * This test suite should be used for tests that
 * require more granularity than simple snapshots.
 */

import yaml from 'yaml';
import { convertSnootyAst } from './utils';
import type { SnootyNode } from '../src/core/convertSnootyAstToMdast/types';
import type { ReferencesArtifact } from '../src/core/convertJsonAstToMdxFiles/buildReferencesArtifacts';

describe('convertSnootyAstToMdast', () => {
  it('converts plain text paragraph', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'text', value: 'Hello world' }],
        },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });

    expect(mdx).toBe('Hello world');
  });

  it('collects meta directives into frontmatter', () => {
    const ast: SnootyNode = {
      type: 'root',
      options: { page: 'opts' },
      children: [
        { type: 'directive', name: 'meta', options: { foo: 'bar' } },
        { type: 'paragraph', children: [{ type: 'text', value: 'Body' }] },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });

    const frontmatter = mdx.split('---')[1];
    const frontmatterObject = yaml.parse(frontmatter);

    expect(frontmatterObject).toEqual({ page: 'opts', foo: 'bar' });
  });

  it('extracts image path from child nodes and handles alt/width/height numeric attributes', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'directive',
          name: 'image',
          // Provide no argument – path is nested in child nodes instead
          children: [{ type: 'text', value: 'images/example.png' }],
          options: { alt: 'Alt text', width: '300', height: 'abc' },
        },
      ],
    };
    const { mdx } = convertSnootyAst({ ast });

    expect(mdx).toEqual(
      `import ExampleImg from '../images/example.png';\n\n<Image src={ExampleImg} alt="Alt text" width={300} height="abc" />`,
    );
  });

  it('registers image import and renders Image component', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [{ type: 'directive', name: 'image', argument: 'images/example.png' }],
    };
    const onRegisterImport = jest.fn();
    const { mdx } = convertSnootyAst({ ast, onRegisterImport });

    expect(onRegisterImport).toHaveBeenCalledTimes(1);

    const [{ componentName, importPath }] = onRegisterImport.mock.calls[0];
    expect(componentName).toBe('ExampleImg');
    expect(importPath).toBe('../images/example.png');

    expect(mdx).toEqual(`import ExampleImg from '../images/example.png';\n\n<Image src={ExampleImg} />`);
  });

  it('converts include directive and calls onEmitMdxFile', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'directive',
          name: 'include',
          argument: 'included-file.rst',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', value: 'Hello from included file' }],
            },
          ],
        },
      ],
    };
    const onEmitMdxFile = jest.fn();
    const onRegisterImport = jest.fn();
    const { mdx } = convertSnootyAst({ ast, onEmitMdxFile, onRegisterImport });

    expect(onEmitMdxFile).toHaveBeenCalledTimes(1);
    expect(onRegisterImport).toHaveBeenCalledTimes(1);

    const [{ outfilePath, mdastRoot }] = onEmitMdxFile.mock.calls[0];
    expect(outfilePath).toBe('included-file.mdx');
    expect(mdastRoot).toHaveProperty('type', 'root');

    const [{ componentName, importPath }] = onRegisterImport.mock.calls[0];
    expect(componentName).toBe('IncludedFile');
    expect(importPath).toBe('./included-file.mdx');

    expect(mdx).toBe(`import IncludedFile from './included-file.mdx';\n\n<IncludedFile />`);
  });

  it('collects substitutions and refs into root.__references', () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            { type: 'substitution_reference', refname: 'prod', children: [{ type: 'text', value: 'MongoDB' }] },
            { type: 'doc', url: '/docs/page', children: [{ type: 'text', value: 'Doc' }] },
          ],
        },
      ],
    };
    const { mdast } = convertSnootyAst({ ast });

    const refs = mdast.__references as ReferencesArtifact;

    expect(refs).toBeDefined();
    expect(refs.substitutions).toHaveProperty('prod', 'MongoDB');
    expect(refs.refs['/docs/page'].title).toBe('Doc');
  });
});
