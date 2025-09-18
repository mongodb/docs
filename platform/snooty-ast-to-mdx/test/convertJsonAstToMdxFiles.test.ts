import fs from 'node:fs/promises';
import path from 'node:path';
import type { SnootyNode } from '../src/core/convertSnootyAstToMdast/types';
import { convertJsonAstToMdxFiles } from '../src/core/convertJsonAstToMdxFiles/convertJsonAstToMdxFiles';

// no files will get output since we mock the fs calls below
const OUTPUT_PATH = './test/__snapshots__/out.mdx';
// however we can get the resulting MDX strings from the mock calls (for snapshots, etc.)
const fsWriteFileSpy = jest.spyOn(fs, 'writeFile').mockImplementation(() => Promise.resolve());
const fsMkdirSpy = jest.spyOn(fs, 'mkdir').mockImplementation(() => Promise.resolve(undefined));
const fsReadFileSpy = jest.spyOn(fs, 'readFile').mockImplementation(() => Promise.resolve(''));

const simpleAst: SnootyNode = {
  type: 'root',
  children: [
    {
      type: 'paragraph',
      children: [{ type: 'text', value: 'Body' }],
    },
  ],
};

describe('convertJsonAstToMdx', () => {
  it('writes only the main file when there are no includes or references', async () => {
    const { fileCount, emittedReferencesFile } = await convertJsonAstToMdxFiles({
      ast: simpleAst,
      outputPath: OUTPUT_PATH,
    });

    expect(fileCount).toBe(1);
    expect(emittedReferencesFile).toBeUndefined();

    expect(fsWriteFileSpy).toHaveBeenCalledWith(OUTPUT_PATH, expect.any(String));
    expect(fsMkdirSpy).toHaveBeenCalledWith(path.dirname(OUTPUT_PATH), { recursive: true });
    expect(fsReadFileSpy).not.toHaveBeenCalled();

    const writtenMdx = (fsWriteFileSpy.mock.calls[0][1] as string).trim();
    expect(writtenMdx).toMatchSnapshot('simple-no-refs');
  });

  it('emits include file only once even if referenced twice', async () => {
    const includedRstPath = 'included-file.rst';
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'directive',
          name: 'include',
          argument: includedRstPath,
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', value: 'Hi from include' }],
            },
          ],
        },
        // duplicate include
        {
          type: 'directive',
          name: 'include',
          argument: includedRstPath,
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', value: 'Hi from include' }],
            },
          ],
        },
      ],
    };

    const { fileCount } = await convertJsonAstToMdxFiles({ ast, outputPath: OUTPUT_PATH });

    expect(fileCount).toBe(2);

    const includePath = path.join(path.dirname(OUTPUT_PATH), includedRstPath.replace('.rst', '.mdx'));
    expect(fsWriteFileSpy).toHaveBeenCalledWith(includePath, expect.any(String));
    expect(fsMkdirSpy).toHaveBeenCalledWith(path.dirname(OUTPUT_PATH), { recursive: true });
    expect(fsReadFileSpy).not.toHaveBeenCalled();

    const writes = Object.fromEntries(
      fsWriteFileSpy.mock.calls.map(([path, content]) => [path, String(content).trim()]),
    );
    expect(writes[OUTPUT_PATH]).toMatchSnapshot('main-mdx-with-include');
    expect(writes[includePath]).toMatchSnapshot('include-mdx');
  });

  it('collects substitutions/refs and emits references artifacts', async () => {
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'substitution_reference',
              refname: 'prod',
              children: [{ type: 'text', value: 'MongoDB' }],
            },
            {
              type: 'doc',
              url: '/docs/page',
              children: [{ type: 'text', value: 'Doc Page' }],
            },
          ],
        },
      ],
    };

    const { fileCount, emittedReferencesFile } = await convertJsonAstToMdxFiles({ ast, outputPath: OUTPUT_PATH });

    expect(fileCount).toBe(1);
    expect(emittedReferencesFile).toBeDefined();

    const refsJson = emittedReferencesFile!.replace('.ts', '.json');
    expect(fsWriteFileSpy).toHaveBeenCalledWith(emittedReferencesFile, expect.any(String));
    expect(fsWriteFileSpy).toHaveBeenCalledWith(refsJson, expect.any(String));
    expect(fsMkdirSpy).toHaveBeenCalledWith(path.dirname(OUTPUT_PATH), { recursive: true });
    expect(fsReadFileSpy).toHaveBeenCalled();

    const jsonEntry = fsWriteFileSpy.mock.calls.find(([path]) => path === refsJson) as [string, string];
    expect(jsonEntry).toBeDefined();
    expect(JSON.parse(jsonEntry[1])).toMatchSnapshot('references-json');
  });

  it('respects outputRootDir when emitting includes', async () => {
    const rootDir = './tmp/out';
    const mainOut = path.join(rootDir, 'guides/page.mdx');

    const sharedRstPath = 'shared/included.rst';
    const ast: SnootyNode = {
      type: 'root',
      children: [
        {
          type: 'directive',
          name: 'include',
          argument: sharedRstPath,
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', value: 'some included content' }],
            },
          ],
        },
      ],
    };

    await convertJsonAstToMdxFiles({ ast, outputPath: mainOut, outputRootDir: rootDir });

    const mdxIncludedPath = path.join(rootDir, sharedRstPath.replace('.rst', '.mdx'));
    expect(fsWriteFileSpy).toHaveBeenCalledWith(mdxIncludedPath, expect.any(String));
    expect(fsMkdirSpy).toHaveBeenCalledWith(path.dirname(OUTPUT_PATH), { recursive: true });
    expect(fsReadFileSpy).toHaveBeenCalled();
  });

  it('will throw an error if the writeFile fails', async () => {
    const errorMessage = 'write error';
    fsWriteFileSpy.mockImplementationOnce(() => Promise.reject(errorMessage));

    try {
      await convertJsonAstToMdxFiles({ ast: simpleAst, outputPath: OUTPUT_PATH });

      fail('Expected an error to be thrown');
    } catch (error) {
      expect(error).toBe(errorMessage);
    }
  });
});
