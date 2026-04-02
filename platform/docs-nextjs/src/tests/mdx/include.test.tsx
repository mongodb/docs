import { render } from '@testing-library/react';
import { Include } from '@/mdx-components/Include';
import { Replacement } from '@/mdx-components/Include/Replacement';
import { loadMDX } from '@/mdx-utils/load-mdx';

jest.mock('@/mdx-utils/load-mdx', () => ({
  loadMDX: jest.fn(),
}));

const mockLoadMDX = loadMDX as jest.MockedFunction<typeof loadMDX>;

describe('Include', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders the loaded content', async () => {
    mockLoadMDX.mockResolvedValue({
      content: <p>Hello from include</p>,
      frontmatter: {},
    });

    const result = await Include({ projectPath: 'django-mongodb/current', src: '/_includes/test' });
    const { getByText } = render(result);

    expect(getByText('Hello from include')).toBeTruthy();
    expect(mockLoadMDX).toHaveBeenCalledWith(expect.arrayContaining(['_includes', 'test']), undefined);
  });

  it('extracts replacements from Replacement children and passes to loadMDX', async () => {
    mockLoadMDX.mockResolvedValue({
      content: <p>Content with replacement</p>,
      frontmatter: {},
    });

    const result = await Include({
      projectPath: 'django-mongodb/current',
      src: '/_includes/use-sample-data',
      children: [
        <Replacement key="model-classes" name="model-classes">
          <code>Movie</code> model includes
        </Replacement>,
        <Replacement key="model-imports" name="model-imports">
          <pre>
            <code>from app.models import Movie</code>
          </pre>
        </Replacement>,
      ],
    });

    render(result);

    const [, replacements] = mockLoadMDX.mock.calls[0];
    expect(replacements).toMatchObject({
      'model-classes': expect.anything(),
      'model-imports': expect.anything(),
    });
  });

  it('renders an error when the include file is not found', async () => {
    mockLoadMDX.mockResolvedValue(null);

    const result = await Include({ projectPath: 'django-mongodb/current', src: '/_includes/missing' });
    const { getByText } = render(result);

    expect(getByText(/Error: Could not load content/)).toBeTruthy();
  });
});
