import { render, screen, waitFor } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { NotFoundBody } from './NotFoundBody';
import { getRelatedLinks } from '@/services/eai/related-links';

jest.mock('@/services/eai/related-links', () => ({
  getRelatedLinks: jest.fn(),
}));

// The "thinking" copy has a decorative animated-dots span alongside it, so
// assert on textContent rather than screen.getByText's default text-node match.
const thinkingElement = () =>
  document.querySelector('.headerText')?.textContent === 'The MongoDB Assistant is thinking...'
    ? document.querySelector('.headerText')
    : null;

describe('NotFoundBody', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/docs/manuall/');
  });

  it('shows the thinking state, then resolves into suggested links', async () => {
    (getRelatedLinks as jest.Mock).mockResolvedValue([
      { title: 'Manual', url: 'https://www.mongodb.com/docs/manual/', score: 0.9, confidence: 'high' },
    ]);

    render(<NotFoundBody />);

    expect(thinkingElement()).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('The MongoDB Assistant suggests the following pages instead:')).toBeInTheDocument();
    });
    expect(thinkingElement()).not.toBeInTheDocument();
  });

  it('resolves to no suggestion box on an "abstain" (empty results) response', async () => {
    (getRelatedLinks as jest.Mock).mockResolvedValue([]);

    render(<NotFoundBody />);

    await waitFor(() => {
      expect(thinkingElement()).not.toBeInTheDocument();
    });
    expect(screen.queryByText('The MongoDB Assistant suggests the following pages instead:')).not.toBeInTheDocument();
  });
});
