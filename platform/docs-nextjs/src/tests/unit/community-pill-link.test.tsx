import { render } from '@testing-library/react';
import CommunityPillLink from '@/components/community-pill-link';

// data for this component
import mockData from '../data/community-pill-link.test.json';
import type { CommunityDriverPill } from '@/types/ast';

it('community drivers directives render correctly', () => {
  const { argument, options } = mockData as CommunityDriverPill;
  const tree = render(<CommunityPillLink argument={argument} options={options} />);
  expect(tree.asFragment()).toMatchSnapshot();
});
