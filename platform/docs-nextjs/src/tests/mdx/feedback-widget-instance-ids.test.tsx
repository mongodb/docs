import { render, screen } from '@testing-library/react';
import { FeedbackProvider } from '@/mdx-components/FeedbackWidget/context';
import FeedbackForm from '@/mdx-components/FeedbackWidget/feedback-form';
import RatingView from '@/mdx-components/FeedbackWidget/views/rating-view';
import CommentView from '@/mdx-components/FeedbackWidget/views/comment-view';

jest.mock('next/navigation', () => ({
  usePathname: () => '/test-page',
}));

jest.mock('@/mdx-components/FeedbackWidget/upsert-feedback', () => ({
  useBrowserUser: () => ({ user: { id: 'test-user' }, reassignCurrentUser: jest.fn() }),
  upsertFeedback: jest.fn(),
}));

const page = {
  slug: 'test-page',
  title: 'Test Page',
  url: 'https://example.com/test-page',
  docs_property: 'docs',
};

const Widget = () => (
  <FeedbackProvider page={page} test={{ feedback: {}, view: 'rating', screenshotTaken: false }}>
    <FeedbackForm className="test-form" />
    <RatingView />
  </FeedbackProvider>
);

// UXE-820: hardcoded DOM ids meant a second instance collided with the first.
describe('FeedbackWidget with two instances on one page', () => {
  it('emits no duplicate DOM ids', () => {
    const { container } = render(
      <>
        <Widget />
        <Widget />
      </>,
    );

    const ids = Array.from(container.querySelectorAll('[id]')).map((el) => el.id);
    expect(ids.length).toBeGreaterThan(0);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('gives each instance its own feedback card id', () => {
    const { container } = render(
      <>
        <Widget />
        <Widget />
      </>,
    );

    const cards = container.querySelectorAll('.test-form');
    expect(cards).toHaveLength(2);
    expect(cards[0].id).not.toBe(cards[1].id);
    expect(cards[0].id).toBeTruthy();
  });

  it('gives every star group a distinct, resolvable label', () => {
    const { container } = render(
      <>
        <Widget />
        <Widget />
      </>,
    );

    // Two per widget: the standalone RatingView, plus the one inside the open card.
    const groups = container.querySelectorAll('[role="group"]');
    expect(groups).toHaveLength(4);

    const labelIds = Array.from(groups).map((g) => g.getAttribute('aria-labelledby'));
    expect(new Set(labelIds).size).toBe(labelIds.length);

    // Pre-fix, htmlFor="rating" pointed at nothing at all.
    labelIds.forEach((id) => {
      const label = container.querySelector(`[id="${id}"]`);
      expect(label).not.toBeNull();
      expect(label).toHaveTextContent('Rate this page');
    });
  });
});

// Both fields are placeholder-only, so aria-label carries the accessible name.
describe('FeedbackWidget comment view labelling', () => {
  it('gives the comment and email fields accessible names', () => {
    render(
      <FeedbackProvider page={page} test={{ feedback: { rating: 5 }, view: 'comment', screenshotTaken: false }}>
        <CommentView />
      </FeedbackProvider>,
    );

    // LG puts the aria-label on the field wrapper as well as the control.
    expect(screen.getAllByLabelText('Comment Text Box').length).toBeGreaterThan(0);
    expect(screen.getAllByLabelText('Email Text Box').length).toBeGreaterThan(0);
  });
});
