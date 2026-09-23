import { render, screen } from '@testing-library/react';
import { RelatedLinksList } from './RelatedLinksList';

describe('RelatedLinksList', () => {
  it('renders each suggested link', () => {
    render(
      <RelatedLinksList
        results={[
          { title: 'Manual', url: 'https://www.mongodb.com/docs/manual/', score: 0.9, confidence: 'high' },
          {
            title: 'Vector Search',
            url: 'https://www.mongodb.com/docs/vector-search/',
            score: 0.7,
            confidence: 'medium',
          },
        ]}
      />,
    );

    expect(screen.getByText('The MongoDB Assistant suggests the following pages instead:')).toBeInTheDocument();
    expect(screen.getByText('Manual')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'https://www.mongodb.com/docs/manual/' })).toHaveAttribute(
      'href',
      'https://www.mongodb.com/docs/manual/',
    );
    expect(screen.getByText('Vector Search')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'https://www.mongodb.com/docs/vector-search/' })).toBeInTheDocument();
  });
});
