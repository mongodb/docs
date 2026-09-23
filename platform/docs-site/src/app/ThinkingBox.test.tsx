import { render } from '@testing-library/react';
import { ThinkingBox } from './ThinkingBox';

describe('ThinkingBox', () => {
  it('renders the "thinking" copy and three animated loading dots', () => {
    const { container } = render(<ThinkingBox />);

    expect(container.querySelector('.headerText')?.textContent).toBe('The MongoDB Assistant is thinking...');
    expect(container.querySelectorAll('.dot')).toHaveLength(3);
  });
});
