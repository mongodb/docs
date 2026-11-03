import { render } from '@testing-library/react';
import { Code } from '@/mdx-components/Code';

jest.mock('@/utils/isOfflineBuild', () => ({ isOfflineBuild: true }));
jest.mock('@/context/page-context', () => ({
  usePageContext: () => ({ slug: '/test' }),
}));

it.each([
  ['without a panel', {}],
  ['with a caption panel', { caption: 'Example' }],
])('renders a copy button %s even when copyable is false', (_, props) => {
  const wrapper = render(<Code lang="python" value="x = 1" copyable={false} {...props} />);
  expect(wrapper.getByRole('button', { name: 'Copy' })).toBeTruthy();
});
