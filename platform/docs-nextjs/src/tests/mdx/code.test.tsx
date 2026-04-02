import { render } from '@testing-library/react';
import { Code } from '@/mdx-components/Code';
import { CodeProvider } from '@/components/code/code-context';
import { TabProvider } from '@/context/tabs-context';
import * as browserStorage from '@/utils/browser-storage';

jest.mock('@/context/page-context', () => ({
  usePageContext: () => ({
    slug: '/test',
  }),
}));

const mockSelectors = {
  drivers: {
    nodejs: [{ type: 'text', position: { start: { line: 0 } }, value: 'Node.js' }],
    python: [{ type: 'text', position: { start: { line: 0 } }, value: 'Python' }],
    shell: [{ type: 'text', position: { start: { line: 0 } }, value: 'MongoDB Shell' }],
  },
};

it('renders correctly', () => {
  const wrapper = render(
    <Code
      lang="javascript"
      copyable={true}
      caption="Test Caption"
      value={
        'mongoimport --db test --collection inventory ^\n          --authenticationDatabase admin --username <user> --password <password> ^\n          --drop --file ~\\downloads\\inventory.crud.json'
      }
      emphasize_lines={[]}
      linenos={false}
    />,
  );
  expect(wrapper.asFragment()).toMatchSnapshot();
});

it('renders correctly when none is passed in as a language', () => {
  const wrapper = render(
    <Code
      lang="none"
      copyable={true}
      emphasize_lines={[]}
      linenos={false}
      value="[{plot A trio of guys try and make up for missed opportunities in childhood by forming a three-player baseball team to compete against standard children baseball squads.}]"
    />,
  );
  expect(wrapper.asFragment()).toMatchSnapshot();
});

it('renders a fenced code block via pre override', () => {
  const wrapper = render(
    <Code lang="javascript" value={'console.log("hi")'} copyable={true} emphasize_lines={[]} linenos={false} />,
  );
  expect(wrapper.asFragment()).toMatchSnapshot();
});

it('passes metadata props to Code', () => {
  const wrapper = render(
    <Code
      lang="python"
      value={'x = 1\ny = 2'}
      copyable={true}
      emphasize_lines={[1, 3]}
      linenos={true}
      lineno_start={5}
      caption="Example"
    />,
  );
  expect(wrapper.container.querySelector('[data-testid="leafygreen-code-panel"]')).toBeTruthy();
  expect(wrapper.asFragment()).toMatchSnapshot();
});

it('defaults copyable=true, emphasize_lines=[], linenos=false when meta is absent', () => {
  const wrapper = render(<Code lang="sh" value={'echo hi'} />);
  expect(wrapper.asFragment()).toMatchSnapshot();
});

describe('when rendering with selectors', () => {
  jest.useFakeTimers();

  let mockGetLocalValue: jest.SpyInstance;

  beforeAll(() => {
    const mockActiveTabs = { drivers: 'shell' };
    mockGetLocalValue = jest.spyOn(browserStorage, 'getLocalValue').mockImplementation(() => mockActiveTabs);
  });

  afterAll(() => {
    mockGetLocalValue.mockClear();
  });

  it('renders with the correct active tab', () => {
    const wrapper = render(
      <TabProvider selectors={mockSelectors as never}>
        <CodeProvider>
          <Code lang="javascript" copyable={true} emphasize_lines={[]} linenos={false} value="Testing code" />
        </CodeProvider>
      </TabProvider>,
    );

    expect(wrapper.getByText('MongoDB Shell')).toBeTruthy();
    expect(wrapper.getByRole('button')).toHaveAttribute('aria-labelledby', 'Language Picker');
  });
});
