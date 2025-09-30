import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import ContentsList from '@/components/contents/contents-list';

const renderContentsList = (label = 'On This Page') => {
  return render(
    <ContentsList label={label}>
      <li>List Item 1</li>
      <li>List Item 2</li>
    </ContentsList>,
  );
};

// Note: all lengths of components are "doubled" because mobile and desktop components are always rendered.
// CSS media queries control which is visible.
// However, our jsdom cannot read the styles to test this functionality in this unit test
describe('ContentsList', () => {
  it('renders correctly with a label', () => {
    const labelText = 'On This Page';
    const wrapper = renderContentsList(labelText);

    expect(wrapper.getAllByText(labelText)).toHaveLength(2);
    expect(wrapper.container.querySelectorAll('li')).toHaveLength(4);
    expect(wrapper.getAllByText('List Item', { exact: false })).toHaveLength(4);
  });

  it('renders correctly without a label', () => {
    const wrapper = renderContentsList();

    expect(wrapper.container.querySelectorAll('li')).toHaveLength(4);
    expect(wrapper.getAllByText('List Item', { exact: false })).toHaveLength(4);
  });
});
