import { render } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';
import ComposableTutorial from '@/mdx-components/ComposableTutorial';
import ComposableContent from '@/mdx-components/ComposableTutorial/ComposableContent';
import { PageContextProvider } from '@/context/page-context';
import type { PageTemplateType } from '@/types/ast';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({ toString: () => '' }),
}));

jest.mock('@/hooks/use-hash', () => ({
  useHash: () => '',
}));

// Two selection dimensions: interface (driver | mongosh) and language (nodejs | python)
const composableOptions = [
  {
    value: 'interface',
    text: 'Interface',
    default: 'driver',
    dependencies: [],
    selections: [
      { value: 'driver', text: 'Driver' },
      { value: 'mongosh', text: 'Mongosh' },
    ],
  },
  {
    value: 'language',
    text: 'Language',
    default: 'nodejs',
    dependencies: [],
    selections: [
      { value: 'nodejs', text: 'Node.js' },
      { value: 'python', text: 'Python' },
    ],
  },
];

const pageOptions = {
  template: 'document' as PageTemplateType,
  composable_tutorial: {
    validSelections: [
      'interface=driver**language=nodejs',
      'interface=driver**language=python',
      'interface=mongosh**language=nodejs',
      'interface=mongosh**language=python',
    ],
    refToSelection: {} as Record<string, Record<string, string>>,
  },
};

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <ThemeProvider theme={theme}>
      <PageContextProvider template="document" slug="/test" tabsMainColumn={null} options={pageOptions}>
        {ui}
      </PageContextProvider>
    </ThemeProvider>,
  );
}

describe('ComposableTutorial (mdx-components) unit tests', () => {
  it('renders ComposableTutorial with two dropdowns (interface + language) and ComposableContent for each combination', () => {
    const tree = renderWithProviders(
      <ComposableTutorial composableOptions={composableOptions}>
        <ComposableContent selections={{ interface: 'driver', language: 'nodejs' }}>
          Driver + Node.js content
        </ComposableContent>
        <ComposableContent selections={{ interface: 'driver', language: 'python' }}>
          Driver + Python content
        </ComposableContent>
        <ComposableContent selections={{ interface: 'mongosh', language: 'nodejs' }}>
          Mongosh + Node.js content
        </ComposableContent>
        <ComposableContent selections={{ interface: 'mongosh', language: 'python' }}>
          Mongosh + Python content
        </ComposableContent>
      </ComposableTutorial>,
    );
    expect(tree.asFragment()).toMatchSnapshot();
  });

  it('renders ComposableContent only when selections match (legacy SelectedContent with no prop always shows)', () => {
    const tree = renderWithProviders(
      <ComposableTutorial composableOptions={composableOptions}>
        <ComposableContent>Always visible (no selections prop)</ComposableContent>
      </ComposableTutorial>,
    );
    expect(tree.asFragment()).toMatchSnapshot();
  });
});
