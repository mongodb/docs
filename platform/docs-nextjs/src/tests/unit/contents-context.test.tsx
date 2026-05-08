import React, { useContext } from 'react';
import { render } from '@testing-library/react';
import { ContentsContext, ContentsProvider } from '@/context/contents-context';
import type { HeadingOption } from '@/types/ast';

jest.mock('@/utils/use-snooty-metadata', () => ({
  useSnootyMetadata: () => ({ project: 'test-project' }),
}));

jest.mock('@/hooks/use-active-heading', () => jest.fn(() => null));

// Cast as unknown first because test fixtures omit optional unist Node fields
const headingNodes = [
  {
    depth: 2,
    // Snooty-style ID with trailing period — github-slugger should normalize it
    id: 'create-the-payload-file.',
    selector_ids: {},
    title: [{ type: 'text', value: 'Create the Payload File.' }],
  },
  {
    depth: 2,
    id: 'connect-to-mongodb',
    selector_ids: {},
    title: [{ type: 'text', value: 'Connect to MongoDB' }],
  },
  {
    depth: 3,
    // Duplicate title (different depth) — slugger deduplicates with a suffix
    id: 'connect-to-mongodb-1',
    selector_ids: {},
    title: [{ type: 'text', value: 'Connect to MongoDB' }],
  },
] as unknown as HeadingOption[];

type ContentsCtxValue = React.ContextType<typeof ContentsContext>;

const HeadingIdsConsumer = ({ onContext }: { onContext?: (ctx: ContentsCtxValue) => void }) => {
  const ctx = useContext(ContentsContext);
  onContext?.(ctx);
  return (
    <ul>
      {ctx.headingNodes.map((node) => (
        <li key={node.id} data-testid="heading-node" data-id={node.id} />
      ))}
    </ul>
  );
};

describe('ContentsProvider heading ID normalization', () => {
  it('normalizes Snooty IDs to github-slugger form using title text', () => {
    const { getAllByTestId } = render(
      <ContentsProvider headingNodes={headingNodes}>
        <HeadingIdsConsumer />
      </ContentsProvider>,
    );

    const items = getAllByTestId('heading-node');
    expect(items[0].getAttribute('data-id')).toBe('create-the-payload-file');
    expect(items[1].getAttribute('data-id')).toBe('connect-to-mongodb');
    // Duplicate title text gets a suffix from the fresh page slugger
    expect(items[2].getAttribute('data-id')).toBe('connect-to-mongodb-1');
  });

  it('provides a context slugger that produces the same IDs as the normalized headingNodes', () => {
    let capturedCtx: ContentsCtxValue | null = null;

    render(
      <ContentsProvider headingNodes={headingNodes}>
        <HeadingIdsConsumer onContext={(ctx) => (capturedCtx = ctx)} />
      </ContentsProvider>,
    );

    // The heading slugger starts fresh — feeding it the same title text in document
    // order must produce IDs matching the normalized headingNodes, ensuring ToC
    // links and Permalink anchors stay in sync.
    expect(capturedCtx!.slugger.slug('Create the Payload File.')).toBe('create-the-payload-file');
    expect(capturedCtx!.slugger.slug('Connect to MongoDB')).toBe('connect-to-mongodb');
    expect(capturedCtx!.slugger.slug('Connect to MongoDB')).toBe('connect-to-mongodb-1');
  });

  it('resets heading IDs on remount so repeated pages do not produce suffixed IDs', () => {
    const { getAllByTestId, unmount } = render(
      <ContentsProvider headingNodes={headingNodes}>
        <HeadingIdsConsumer />
      </ContentsProvider>,
    );

    const firstIds = getAllByTestId('heading-node').map((el) => el.getAttribute('data-id'));

    unmount();

    const { getAllByTestId: getAll2 } = render(
      <ContentsProvider headingNodes={headingNodes}>
        <HeadingIdsConsumer />
      </ContentsProvider>,
    );

    const secondIds = getAll2('heading-node').map((el) => el.getAttribute('data-id'));

    // After remounting (simulating SPA navigation), the slugger state is fresh —
    // IDs must not accumulate suffixes across navigations.
    expect(secondIds).toEqual(firstIds);
  });
});
