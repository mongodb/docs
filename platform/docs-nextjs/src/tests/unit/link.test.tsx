import { render } from '@testing-library/react';
import Link from '@/components/link';
import { TestWrapper } from '../utils/test-wrapper';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';

jest.mock('@/utils/use-snooty-metadata', () => ({
  useSnootyMetadata: jest.fn(),
}));

beforeAll(() => {
  (useSnootyMetadata as jest.Mock).mockImplementation(() => ({ project: 'docs-node', branch: 'v4.9' }));
});

const setup = ({ text, ...rest }: { text: string; [key: string]: unknown }) => {
  return render(
    <TestWrapper>
      <Link {...rest}>{text}</Link>
    </TestWrapper>,
  );
};

describe('Link component renders a variety of strings correctly', () => {
  it('empty string', () => {
    const tree = setup({ to: '', text: 'Empty string' });
    expect(tree.asFragment()).toMatchSnapshot();
  });

  it('external URL', () => {
    const tree = setup({ to: 'http://mongodb.com', text: 'MongoDB Company' });
    expect(tree.asFragment()).toMatchSnapshot();
  });

  it('external MDB docs URL', () => {
    const tree = setup({ to: 'https://www.mongodb.com/docs/atlas/', text: 'MongoDB Atlas Docs' });
    expect(tree.asFragment()).toMatchSnapshot();
  });

  it('external MDB non-docs URL', () => {
    const tree = setup({ to: 'https://account.mongodb.com/account/', text: 'MongoDB Atlas Registration Page' });
    expect(tree.asFragment()).toMatchSnapshot();
  });

  it('external non-MDB docs URL', () => {
    const tree = setup({ to: 'https://safety.google/authentication/', text: 'Google 2-Step Verification' });
    expect(tree.asFragment()).toMatchSnapshot();
  });

  it('external URL with hidden external icon', () => {
    const tree = setup({ to: 'http://mongodb.com', hideExternalIcon: true, text: 'MongoDB Company' });
    expect(tree.asFragment()).toMatchSnapshot();
  });

  it('internal link', () => {
    const tree = setup({ to: 'drivers/c', text: 'C Driver', className: 'test-class' });
    expect(tree.asFragment()).toMatchSnapshot();
  });

  it('internal link with hash', () => {
    const tree = setup({ to: 'drivers/pymongo#installation', text: 'C Driver', className: 'test-class' });
    expect(tree.asFragment()).toMatchSnapshot();
  });

  it('internal link query param', () => {
    const tree = setup({ to: 'drivers/ruby?site=drivers', text: 'C Driver', className: 'test-class' });
    expect(tree.asFragment()).toMatchSnapshot();
  });

  it('internal link that already includes trailing slash', () => {
    const tree = setup({ to: 'drivers/nodejs/#installation', text: 'C Driver', className: 'test-class' });
    expect(tree.asFragment()).toMatchSnapshot();
  });

  it('identfies mailto links as external urls', () => {
    const tree = setup({ to: 'mailto:docs@mongodb.com', text: 'docs@mongodb.com' });
    expect(tree.asFragment()).toMatchSnapshot();
  });
});
