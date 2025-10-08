import { render } from '@testing-library/react';
import List from '@/components/list';
import type { ListNode } from '@/types/ast';

// we may want to think about using .ts for mockData rather than json, since
// when importing JSON data in TS, the type property is inferred as string rather
// than the literal type "list".
// This is because JSON doesn't preserve TypeScript's literal types.
import mockData from '../data/list.test.json';

it('List renders correctly', () => {
  const nodeChildren = mockData.children as ListNode['children'];
  const enumtype = mockData.enumtype as ListNode['enumtype'];
  const startat = mockData.startat as ListNode['startat'];

  const tree = render(<List enumtype={enumtype} startat={startat} nodeChildren={nodeChildren} />);
  expect(tree.asFragment()).toMatchSnapshot();
});
