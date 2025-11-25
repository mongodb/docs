import { render } from '@testing-library/react';
import { mockLocation } from '../utils/mock-location';
import ContentsListItem from '@/components/contents/contents-list-item';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';

jest.mock('@/utils/use-snooty-metadata', () => ({
  useSnootyMetadata: jest.fn(),
}));

beforeAll(() => {
  mockLocation({ hash: '' });
  (useSnootyMetadata as jest.Mock).mockImplementation(() => ({ project: 'docs-node', branch: 'v4.9' }));
});

describe('ContentsListItem', () => {
  it('renders correctly when active or inactive', () => {
    const wrapper = render(
      <>
        <ContentsListItem id="item-1" isActive={true}>
          Item 1
        </ContentsListItem>
        <ContentsListItem id="item-2">Item 2</ContentsListItem>
      </>,
    );

    // Ensure that id is transformed into correct href
    const link = wrapper.getByText('Item 1').closest('a');
    expect(link).toBeTruthy();
    expect(link).toHaveProperty('href', 'http://localhost/#item-1');
    expect(wrapper.getAllByText('Item', { exact: false })).toHaveLength(2);
  });

  it('renders with different depths', () => {
    const wrapper = render(
      <>
        <ContentsListItem id="item-1" depth={0}>
          Item 1
        </ContentsListItem>
        <ContentsListItem id="item-2" depth={1}>
          Item 2
        </ContentsListItem>
      </>,
    );

    expect(wrapper.getAllByText('Item', { exact: false })).toHaveLength(2);
  });
});
