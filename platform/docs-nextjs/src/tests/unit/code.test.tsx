import { render } from '@testing-library/react';
import Code from '@/components/code';
import { CodeProvider } from '@/components/code/code-context';
import { TabProvider } from '@/context/tabs-context';
import * as browserStorage from '@/utils/browser-storage';
import type { CodeNode, Selectors } from '@/types/ast';

import mockData from '@/tests/data/code.test.json';

const mockSelectors = {
  drivers: {
    nodejs: [
      {
        type: 'text',
        position: {
          start: {
            line: 0,
          },
        },
        value: 'Node.js',
      },
    ],
    python: [
      {
        type: 'text',
        position: {
          start: {
            line: 0,
          },
        },
        value: 'Python',
      },
    ],
    shell: [
      {
        type: 'text',
        position: {
          start: {
            line: 0,
          },
        },
        value: 'MongoDB Shell',
      },
    ],
  },
};

const shallowCode = ({ data }: { data: CodeNode }) => {
  return render(<Code {...data} />);
};

const mountCodeWithSelector = ({ data }: { data: CodeNode }) => {
  return render(
    <TabProvider selectors={mockSelectors as Selectors}>
      <CodeProvider>
        <Code {...data} />
      </CodeProvider>
    </TabProvider>,
  );
};

it('renders correctly', () => {
  const wrapper = shallowCode({ data: mockData.testCode as unknown as CodeNode });
  expect(wrapper.asFragment()).toMatchSnapshot();
});

it('renders correctly when none is passed in as a language', () => {
  const wrapper = render(<Code {...(mockData.testNoneLanguage as CodeNode)} />);
  expect(wrapper.asFragment()).toMatchSnapshot();
});

describe('when rendering with selectors', () => {
  jest.useFakeTimers();

  const testData = mockData.testWithSelectors as CodeNode;
  let mockGetLocalValue: jest.SpyInstance;

  beforeAll(() => {
    const mockActiveTabs = {
      drivers: 'shell',
    };
    mockGetLocalValue = jest.spyOn(browserStorage, 'getLocalValue').mockImplementation(() => mockActiveTabs);
  });

  afterAll(() => {
    mockGetLocalValue.mockClear();
  });

  it('renders with the correct active tab', () => {
    const wrapper = mountCodeWithSelector({ data: testData as CodeNode });

    expect(wrapper.getByText('MongoDB Shell')).toBeTruthy();
    expect(wrapper.getByRole('button')).toHaveAttribute('aria-labelledby', 'Language Picker');
  });
});
