import { remark } from 'remark';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import remarkStringify from 'remark-stringify';
import { getContentString } from '@/mdx-utils/get-content-string';
import { remarkResolveImports } from '@/mdx-utils/remark-resolve-imports';

jest.mock('@/mdx-utils/get-content-string', () => ({
  getContentString: jest.fn(),
}));

const mockGetContentString = getContentString as jest.MockedFunction<typeof getContentString>;

const PROJECT_PATH = 'csharp/current';

/**
 * Mirrors the markdown export route: resolve includes/replacements, stringify to
 * MDX, then re-parse that MDX (the step that crashed in production when a block
 * <Tabs> replacement was collapsed into an inline element).
 */
async function resolveToMdx(pageMdx: string): Promise<string> {
  const file = await remark()
    .use(remarkFrontmatter, ['yaml'])
    .use(remarkGfm)
    .use(remarkMdx)
    .use(remarkResolveImports, { projectPath: PROJECT_PATH })
    .use(remarkStringify)
    .process(pageMdx);
  return String(file);
}

function reparseMdx(mdx: string): Promise<unknown> {
  return remark().use(remarkFrontmatter, ['yaml']).use(remarkMdx).use(remarkStringify).process(mdx);
}

describe('remarkResolveImports replacement slots', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetContentString.mockImplementation(async (rawPath: string) => {
      if (rawPath.endsWith('_references.json')) return '{}';
      if (rawPath.includes('code-example-template')) {
        return [
          'The following code example demonstrates the operation:',
          '',
          '<Reference refKey="code-tabs" type="replacement" />',
          '',
        ].join('\n');
      }
      if (rawPath.includes('inline-template')) {
        // Reference embedded in an inline (sentence) context.
        return 'Click <Reference refKey="ui-target" type="replacement" /> to continue.\n';
      }
      if (rawPath.includes('selfclosing-template')) {
        // A `public class` code block, then a block-position reference whose slot is a
        // self-closing element. This mirrors the real csharp pages (sample-data code +
        // an <Instruqt>/<Target> replacement).
        return [
          '### Sample Data',
          '',
          '```csharp copyable={true} linenos={false}',
          'public class Restaurant',
          '{',
          '    public ObjectId Id { get; set; }',
          '}',
          '```',
          '',
          '<Reference refKey="lab" type="replacement" />',
          '',
          '## Next',
          '',
          'More content here.',
          '',
        ].join('\n');
      }
      return null;
    });
  });

  it('keeps a block <Tabs> replacement (with nested code) parseable after a round-trip', async () => {
    const pageMdx = [
      '# Update Many',
      '',
      '<Include src="/_includes/code-example-template">',
      '  <Replacement name="code-tabs">',
      '    <Tabs>',
      '      <Tab tabid="sync" name="UpdateMany (Sync)">',
      '        ```csharp copyable={true} linenos={false}',
      '        var filter = Builders<Restaurant>.Filter.Eq("cuisine", "Pizza");',
      '        _restaurantsCollection.UpdateMany(filter, combinedUpdate);',
      '        ```',
      '      </Tab>',
      '    </Tabs>',
      '  </Replacement>',
      '</Include>',
      '',
    ].join('\n');

    const resolved = await resolveToMdx(pageMdx);

    // The Tabs must remain a block element wrapping a fenced code block, not be
    // collapsed onto a single inline line.
    expect(resolved).toContain('```csharp');
    expect(resolved).toContain('_restaurantsCollection.UpdateMany(filter, combinedUpdate);');
    expect(resolved).toMatch(/<Tabs>\n/);

    // Production then re-parses the stringified MDX; this previously threw
    // "Could not parse expression with acorn" / "Expected a closing tag".
    await expect(reparseMdx(resolved)).resolves.toBeDefined();
  });

  it('keeps a block self-closing replacement from collapsing the document (public-class crash)', async () => {
    const pageMdx = [
      '# Update Many',
      '',
      '<Include src="/_includes/selfclosing-template">',
      '  <Replacement name="lab">',
      '    <Instruqt drawer={true} title="Lesson" embedValue="/x" />',
      '  </Replacement>',
      '</Include>',
      '',
    ].join('\n');

    const resolved = await resolveToMdx(pageMdx);

    // Blocks must stay separated: the csharp fence must start its own line so it is
    // recognized as a code fence (otherwise `public` is parsed as a JS expression).
    expect(resolved).toMatch(/\n```csharp/);
    expect(resolved).toMatch(/\n## Next/);
    await expect(reparseMdx(resolved)).resolves.toBeDefined();
  });

  it('still inlines genuinely inline replacement content split across blank lines', async () => {
    const pageMdx = [
      '# Heading',
      '',
      '<Include src="/_includes/inline-template">',
      '  <Replacement name="ui-target">',
      '    <Icon name="mms" />',
      '',
      '    <Guilabel>Clusters</Guilabel>',
      '  </Replacement>',
      '</Include>',
      '',
    ].join('\n');

    const resolved = await resolveToMdx(pageMdx);

    // Inline content collapses into the surrounding sentence rather than breaking
    // out into block-level lines.
    expect(resolved).toContain('Click <Icon name="mms" /><Guilabel>Clusters</Guilabel> to continue.');
    await expect(reparseMdx(resolved)).resolves.toBeDefined();
  });
});
