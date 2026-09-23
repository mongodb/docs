import { render } from '@testing-library/react';
import { ThinkingBox } from './ThinkingBox';

describe('ThinkingBox', () => {
  it('renders the "thinking" copy and three animated loading dots', () => {
    const { getByTestId, getAllByTestId } = render(<ThinkingBox />);

    expect(getByTestId('thinking-header-text').textContent).toBe('The MongoDB Assistant is thinking...');
    expect(getAllByTestId('thinking-dot')).toHaveLength(3);
  });
});
