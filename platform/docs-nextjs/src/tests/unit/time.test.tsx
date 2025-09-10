import Time from '@/components/time';
import { render } from '@testing-library/react';
import type { Directive } from '@/types/ast';

import mockData from '../data/time.test.json';
const typedMockData = mockData as Directive;

it('renders correctly', () => {
  const wrapper = render(<Time argument={typedMockData.argument} />);
  expect(wrapper.getByText('Time required: 15 minutes')).toBeTruthy();
});
