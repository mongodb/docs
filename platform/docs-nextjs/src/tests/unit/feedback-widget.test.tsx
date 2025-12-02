import { act, render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { matchers } from '@emotion/jest';
import FeedbackWidget, { FeedbackProvider, FeedbackForm } from '@/components/widgets/feedback-widget';
import type { FeedbackViewType, Feedback } from '@/components/widgets/feedback-widget/context';
import type { RenderResult } from '@testing-library/react';
import type { TextNode } from '@/types/ast';

import { tick, mockMutationObserver, mockSegmentAnalytics, setDesktop } from '@/tests/utils';
import {
  stitchFunctionMocks,
  mockStitchFunctions,
  clearMockStitchFunctions,
} from '@/tests/utils/mock-feedback-widget-stitch-function';
import Heading from '@/components/heading';
import {
  screenshotFunctionMocks,
  mockScreenshotFunctions,
  clearMockScreenshotFunctions,
} from '@/tests/utils/mock-screenshot';
import { mockLocation } from '@/tests/utils/mock-location';
import {
  CLOSE_BUTTON_ALT_TEXT,
  COMMENT_PLACEHOLDER_TEXT,
  EMAIL_ERROR_TEXT,
  EMAIL_PLACEHOLDER_TEXT,
  FEEDBACK_SUBMIT_BUTTON_TEXT,
  RATING_QUESTION_TEXT,
  SCREENSHOT_BUTTON_TEXT,
  SCREENSHOT_OVERLAY_ALT_TEXT,
  SUBMITTED_VIEW_RESOURCE_LINKS,
  SUBMITTED_VIEW_SUPPORT_LINK,
  SUBMITTED_VIEW_TEXT,
} from '@/components/widgets/feedback-widget/constants';
import { PageContext } from '@/context/page-context';
import { MetadataProvider } from '@/utils/use-snooty-metadata';
import { createMockMetadata } from '@/tests/utils/mock-snooty-metadata';
import headingData from '@/tests/data/heading.test.json';

// Mock chatbot context
jest.mock('@/context/chatbot-context', () => ({
  useChatbotModal: () => ({
    chatbotClicked: false,
    setChatbotClicked: jest.fn(),
    text: '',
    setText: jest.fn(),
  }),
  ChatbotProvider: ({ children }: { children: React.ReactNode }) => children,
}));

async function mountFormWithFeedbackState(
  feedbackState: {
    view?: FeedbackViewType;
    isSupportRequest?: boolean;
    screenshotTaken?: boolean;
    [key: string]: unknown;
  } = {},
) {
  const { view, screenshotTaken, ...feedback } = feedbackState;
  const wrapper = render(
    <>
      <FeedbackProvider
        test={{
          view: view || 'waiting',
          feedback: (Object.keys(feedback).length ? feedback : {}) as Feedback,
          screenshotTaken: screenshotTaken || false,
        }}
        page={{
          title: 'Test Page Please Ignore',
          slug: '/test',
          url: 'https://docs.mongodb.com/test',
          docs_property: 'test',
        }}
      >
        <FeedbackForm />
        <div>
          <Heading nodeChildren={headingData.children as [TextNode]} sectionDepth={1} id={headingData.id} />
        </div>
      </FeedbackProvider>
    </>,
  );
  // Need to wait for the next tick to let Loadable components load
  await tick();
  return wrapper;
}

// Finds all of the stars in the rating view and ensures the correct number are shown
const checkSelectedStars = (wrapper: RenderResult, selectedRating: number) => {
  const maxStars = 5;
  const highlightedStars = wrapper.queryAllByTestId('rating-star-highlighted');
  const unselectedStars = wrapper.queryAllByTestId('rating-star');

  expect(highlightedStars.length + unselectedStars.length).toEqual(maxStars);
  expect(highlightedStars).toHaveLength(selectedRating);
  expect(unselectedStars).toHaveLength(maxStars - selectedRating);
};

const click = async (element: Element) => {
  await act(async () => {
    userEvent.click(element);
    await tick();
  });
  await tick();
};

expect.extend(matchers);

describe('FeedbackWidget', () => {
  jest.useFakeTimers();
  let wrapper: RenderResult;
  beforeAll(mockMutationObserver);
  beforeAll(mockSegmentAnalytics);
  beforeEach(setDesktop);
  beforeEach(mockStitchFunctions);
  afterEach(clearMockStitchFunctions);
  beforeEach(mockScreenshotFunctions);
  afterEach(clearMockScreenshotFunctions);
  beforeEach(() => mockLocation({ pathname: '/docs/atlas' }));

  describe('FeedbackWidget', () => {
    it('is not rendered when hidefeedback page option has value "page"', () => {
      const pageContextValue = {
        page: null,
        template: null,
        slug: '/',
        tabsMainColumn: null,
        options: {
          template: 'document' as const,
          hidefeedback: 'page',
        },
      };

      wrapper = render(
        <PageContext.Provider value={pageContextValue}>
          <MetadataProvider value={createMockMetadata()}>
            <FeedbackWidget slug={'/'} className="test-class" />
          </MetadataProvider>
        </PageContext.Provider>,
      );

      // Should not be rendered
      expect(wrapper.queryByTestId('feedback-container')).not.toBeInTheDocument();
    });
  });

  describe('FeedbackForm', () => {
    it('waiting state when the form is closed', async () => {
      wrapper = await mountFormWithFeedbackState({
        view: 'rating',
      });
      // Click the close button
      userEvent.click(wrapper.getByLabelText(CLOSE_BUTTON_ALT_TEXT));
      await tick();
      expect(wrapper.queryAllByText(RATING_QUESTION_TEXT)).toHaveLength(0);
    });

    describe('RatingView', () => {
      it('Shows 5 stars for rating', async () => {
        wrapper = await mountFormWithFeedbackState({
          view: 'rating',
        });
        expect(wrapper.getAllByTestId('rating-star')).toHaveLength(5);
      });

      it('transitions to the comment view and submits a feedback when a rating is clicked', async () => {
        wrapper = await mountFormWithFeedbackState({
          view: 'rating',
        });
        const stars = wrapper.getAllByTestId('rating-star');
        const selectedRating = 5;
        const selectedStar = stars[selectedRating - 1];
        await click(selectedStar);

        checkSelectedStars(wrapper, selectedRating);
        expect(wrapper.getByPlaceholderText(COMMENT_PLACEHOLDER_TEXT)).toBeTruthy();
        expect(stitchFunctionMocks['upsertFeedback']).toHaveBeenCalledTimes(1);
      });

      it('transitions to the comment view when using keyboard to select a rating', async () => {
        wrapper = await mountFormWithFeedbackState({
          view: 'rating',
        });
        const stars = wrapper.getAllByTestId('rating-star');
        const selectedRating = 4;
        const selectedStar = stars[selectedRating - 1];
        // Focus the star first and wait for state updates
        await act(async () => {
          selectedStar.focus();
        });
        await tick();
        // Then send the keyboard event directly on the focused element
        await act(async () => {
          fireEvent.keyDown(selectedStar, { code: 'Enter', key: 'Enter' });
        });
        await tick();

        checkSelectedStars(wrapper, selectedRating);
        expect(wrapper.getByPlaceholderText(COMMENT_PLACEHOLDER_TEXT)).toBeTruthy();
        expect(stitchFunctionMocks['upsertFeedback']).toHaveBeenCalledTimes(1);
      });
    });

    describe('CommentView', () => {
      it('shows correct comment view text', async () => {
        const expectedRating = 4;
        wrapper = await mountFormWithFeedbackState({
          view: 'comment',
          sentiment: 'Positive',
          rating: expectedRating,
          comment: '',
        });
        // Check that present rating is shown
        checkSelectedStars(wrapper, expectedRating);

        expect(wrapper.getByPlaceholderText(EMAIL_PLACEHOLDER_TEXT)).toBeTruthy();
        expect(wrapper.getByText('Send')).toBeTruthy();
      });

      describe('when the Screenshot button is clicked', () => {
        it('shows the overlays and adds event listener', async () => {
          wrapper = await mountFormWithFeedbackState({
            view: 'comment',
            comment: 'This is a test comment.',
            user: { email: 'test@example.com' },
            rating: 5,
          });

          // Wait for Loadable ScreenshotButton component to load and click it
          const screenshotButton = await waitFor(() => wrapper.getByText(SCREENSHOT_BUTTON_TEXT).closest('button'));
          if (screenshotButton) {
            await click(screenshotButton);
          }

          expect(screenshotFunctionMocks['addEventListener']).toHaveBeenCalled();

          // Wait for overlays to appear after click
          const overlay = await waitFor(() => wrapper.getByAltText(SCREENSHOT_OVERLAY_ALT_TEXT));
          expect(overlay.getElementsByClassName('overlay-instructions')).toBeTruthy();
        });

        it('adds the screenshot attachment on send', async () => {
          wrapper = await mountFormWithFeedbackState({
            view: 'comment',
            comment: 'This is a test comment.',
            sentiment: 'Positive',
            user: { email: 'test@example.com' },
            screenshotTaken: true,
          });

          const submitButton = wrapper.getByText(FEEDBACK_SUBMIT_BUTTON_TEXT).closest('button');
          if (submitButton) {
            await click(submitButton);
          }

          expect(screenshotFunctionMocks['retrieveDataUri']).toHaveBeenCalled();
        });
      });

      describe('when the Send button is clicked', () => {
        it('submits the feedback and transitions to the submitted view if the inputs are valid', async () => {
          wrapper = await mountFormWithFeedbackState({
            view: 'comment',
            comment: 'This is a test comment.',
            sentiment: 'Positive',
            rating: 5,
            user: { email: 'test@example.com' },
          });
          // Click the submit button
          const submitButton = wrapper.getByText(FEEDBACK_SUBMIT_BUTTON_TEXT).closest('button');
          if (submitButton) {
            await click(submitButton);
          }
          expect(stitchFunctionMocks['upsertFeedback']).toHaveBeenCalledTimes(1);
        });

        it('raises an input error if an invalid email is specified', async () => {
          wrapper = await mountFormWithFeedbackState({
            view: 'comment',
            comment: '',
            user: { email: 'test invalid email' },
          });
          // Type in an invalid email address
          const emailInput = wrapper.getByPlaceholderText(EMAIL_PLACEHOLDER_TEXT);
          fireEvent.change(emailInput, { target: { value: 'invalid email address' } });
          await tick(); // Wait for validation to complete

          // Click the submit button
          const submitButton = wrapper.getByText(FEEDBACK_SUBMIT_BUTTON_TEXT).closest('button');
          if (submitButton) {
            await click(submitButton);
          }
          expect(wrapper.getByText(EMAIL_ERROR_TEXT)).toBeTruthy();
        });

        it('attempts to resubmit on 401 error', async () => {
          const customError: Error & { statusCode?: number } = new Error('mock error message');
          customError.statusCode = 401;
          stitchFunctionMocks['upsertFeedback'].mockRejectedValueOnce(customError);

          wrapper = await mountFormWithFeedbackState({
            view: 'comment',
            comment: 'This is a test comment.',
            sentiment: 'Positive',
            rating: 5,
            user: { email: 'test@example.com' },
          });

          const submitButton = wrapper.getByText(FEEDBACK_SUBMIT_BUTTON_TEXT).closest('button');
          if (submitButton) {
            await click(submitButton);
          }
          expect(stitchFunctionMocks['upsertFeedback']).toHaveBeenCalledTimes(2);
        });
      });
    });

    describe('SubmittedView', () => {
      const standardViewCopy = [
        SUBMITTED_VIEW_TEXT.HEADING,
        SUBMITTED_VIEW_TEXT.SUB_HEADING,
        ...SUBMITTED_VIEW_RESOURCE_LINKS.map(({ text }) => text),
      ];
      const negativeViewCopy = [SUBMITTED_VIEW_TEXT.SUPPORT_CTA, SUBMITTED_VIEW_SUPPORT_LINK.text];

      it('shows self-serve support links for negative path', async () => {
        wrapper = await mountFormWithFeedbackState({
          sentiment: 'Negative',
          rating: 1,
          view: 'submitted',
        });
        const viewCopy = [...standardViewCopy, ...negativeViewCopy];
        viewCopy.forEach((text) => {
          expect(wrapper.getByText(text)).toBeTruthy();
        });
      });

      it('shows summary information for positive path', async () => {
        wrapper = await mountFormWithFeedbackState({
          sentiment: 'Positive',
          rating: 5,
          view: 'submitted',
        });
        standardViewCopy.forEach((text) => {
          expect(wrapper.getByText(text)).toBeTruthy();
        });
        negativeViewCopy.forEach((text) => {
          expect(wrapper.queryAllByText(text)).toHaveLength(0);
        });
      });
    });
  });
});
