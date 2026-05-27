import type { Dispatch, SetStateAction, ReactNode } from 'react';
import { useState, useCallback, useContext, useEffect, createContext, useTransition } from 'react';
import { usePathname } from 'next/navigation';
import type { Viewport } from '@/hooks/use-viewport';
import { getViewport } from '@/hooks/use-viewport';
import type { SnootyEnv } from '@/types/data';
import { reportAnalytics } from '@/utils/report-analytics';
import { currentScrollPosition } from '@/utils/current-scroll-position';
import type { FeedbackUser } from './upsert-feedback';
import { useBrowserUser } from './upsert-feedback';
import type { FeedbackPageData } from './use-feedback-data';
import { upsertFeedback } from './upsert-feedback';

type SubmitAllFeedbackProps = {
  comment?: string;
  email?: string;
  dataUri?: string;
  viewport?: Viewport;
};

export type Feedback = {
  rating?: number;
};

type FeedbackSentiment = 'Negative' | 'Suggestion' | 'Positive';

export type FeedbackPayload = {
  page: {
    title: string;
    slug: string;
    url: string | null;
    docs_property: string;
  };
  user: FeedbackUser;
  attachment?: {
    type: 'screenshot';
    dataUri: string;
    viewport: Viewport;
  };
  viewport: Viewport;
  category: FeedbackSentiment;
  rating: number;
  snootyEnv: SnootyEnv;
  comment?: string;
  feedback_id?: string;
};

export type FeedbackContextType = {
  feedback?: Feedback;
  progress: boolean[];
  view: FeedbackViewType;
  screenshotTaken: boolean;
  setScreenshotTaken: Dispatch<SetStateAction<boolean>>;
  initializeFeedback: (nextView: FeedbackViewType) => { newFeedback: Feedback };
  setProgress: Dispatch<SetStateAction<boolean[]>>;
  submitAllFeedback: (props: SubmitAllFeedbackProps) => void;
  abandon: () => void;
  selectedRating: number | undefined;
  setSelectedRating: Dispatch<SetStateAction<number | undefined>>;
  selectInitialRating: (rating: number) => Promise<void>;
  isScreenshotButtonClicked: boolean;
  setIsScreenshotButtonClicked: Dispatch<SetStateAction<boolean>>;
  detachForm: boolean;
  setDetachForm: Dispatch<SetStateAction<boolean>>;
};

export type FeedbackViewType = 'waiting' | 'comment' | 'rating' | 'submitted';
export type FeedbackTestInput = {
  feedback: Feedback;
  view: FeedbackViewType;
  screenshotTaken: boolean;
};

const initialValue: FeedbackContextType = {
  progress: [true, false, false],
  view: 'waiting',
  screenshotTaken: false,
  setScreenshotTaken: () => {},
  initializeFeedback: () => ({ newFeedback: {} }),
  setProgress: () => {},
  submitAllFeedback: () => {},
  abandon: () => {},
  selectedRating: undefined,
  setSelectedRating: () => {},
  selectInitialRating: async () => {},
  isScreenshotButtonClicked: false,
  setIsScreenshotButtonClicked: () => {},
  detachForm: false,
  setDetachForm: () => {},
};

const FeedbackContext = createContext<FeedbackContextType>(initialValue);

export type FeedbackContextProps = {
  page: FeedbackPageData;
  test?: FeedbackTestInput;
  children: ReactNode;
  position?: 'right column' | 'body';
};

export function FeedbackProvider({ page, test, position = 'right column', ...props }: FeedbackContextProps) {
  const hasExistingFeedback =
    !!test?.feedback && typeof test.feedback === 'object' && Object.keys(test.feedback).length > 0;
  const [feedback, setFeedback] = useState<Feedback | undefined>(
    () => (hasExistingFeedback && test.feedback) || undefined,
  );
  const [feedbackId, setFeedbackId] = useState<string | undefined>(() => undefined);
  const [detachForm, setDetachForm] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | undefined>(test?.feedback?.rating || undefined);
  const [view, setView] = useState<FeedbackViewType>(test?.view || 'waiting');
  const [screenshotTaken, setScreenshotTaken] = useState(test?.screenshotTaken || false);
  const [progress, setProgress] = useState([true, false, false]);
  const [isScreenshotButtonClicked, setIsScreenshotButtonClicked] = useState(false);
  const [, startTransition] = useTransition();
  const { user, reassignCurrentUser } = useBrowserUser();
  const pathname = usePathname();
  const snootyEnv = (process.env.NEXT_PUBLIC_ENV || 'development') as SnootyEnv;

  const createFeedbackPayload = useCallback(
    (rating: number, email?: string, dataUri?: string, viewport?: Viewport, comment?: string) => {
      const res: FeedbackPayload = {
        page: {
          title: page.title,
          slug: page.slug,
          url: page.url,
          docs_property: page.docs_property,
        },
        user: { id: user?.id || '' },
        viewport: getViewport(),
        comment,
        category: createSentiment(rating),
        rating: rating,
        snootyEnv,
        ...test?.feedback,
      };
      if (user?.id) {
        res.user.id = user.id;
      }
      if (email) {
        res.user.email = email;
      }
      if (dataUri && viewport) {
        res.attachment = {
          type: 'screenshot',
          dataUri,
          viewport,
        };
      }
      if (feedbackId) {
        res.feedback_id = feedbackId;
      }

      return res;
    },
    [feedbackId, page.docs_property, page.slug, page.title, page.url, snootyEnv, test?.feedback, user],
  );

  // Create a new feedback document
  const initializeFeedback = (nextView: FeedbackViewType = 'rating') => {
    const newFeedback = {};
    startTransition(() => {
      setFeedback(newFeedback);
      setView(nextView);
      setProgress([true, false, false]);
      setSelectedRating(undefined);
    });
    return { newFeedback };
  };

  const selectInitialRating = async (ratingValue: number) => {
    reportAnalytics('Click', {
      position: position,
      position_context: 'Rating',
      label: ratingValue,
      scroll_position: currentScrollPosition(),
      tagbook: 'true',
    });
    setSelectedRating(ratingValue);
    setView('comment');
    setProgress([false, true, false]);
    const payload = createFeedbackPayload(ratingValue);
    try {
      const res = await upsertFeedback(payload);
      setFeedbackId(res);
    } catch (e) {
      console.error('Error while creating new feedback', e);
    }
  };

  // Create a placeholder sentiment based on the selected rating to avoid any breaking changes from external dependencies
  const createSentiment = (selectedRating: number): FeedbackSentiment => {
    if (selectedRating < 3) {
      return 'Negative';
    } else if (selectedRating === 3) {
      return 'Suggestion';
    } else {
      return 'Positive';
    }
  };

  const retryFeedbackSubmission = async (newFeedback: FeedbackPayload) => {
    try {
      const newUser = await reassignCurrentUser();
      if (newUser) {
        newFeedback.user.id = newUser.id;
        await upsertFeedback(newFeedback);
        setFeedback(newFeedback);
      }
    } catch (e) {
      console.error('Error when retrying feedback submission', e);
    }
  };

  const submitAllFeedback = async ({ comment = '', email = '', dataUri, viewport }: SubmitAllFeedbackProps) => {
    // Route the user to their "next steps"
    setProgress([false, false, true]);
    setView('submitted');
    setDetachForm(false);

    if (!selectedRating) return;
    // Submit the full feedback document
    const newFeedback = createFeedbackPayload(selectedRating, email, dataUri, viewport, comment);
    try {
      await upsertFeedback(newFeedback);
    } catch (err) {
      // This catch block will most likely only be hit after Next API route attempts internal retry logic
      // after access token is refreshed
      console.error('There was an error submitting feedback', err);
      if (err instanceof Error && 'statusCode' in err && err.statusCode === 401) {
        // Explicitly retry 1 time to avoid any infinite loop
        await retryFeedbackSubmission(newFeedback);
      }
    } finally {
      setFeedback(undefined);
      setFeedbackId(undefined);
    }
  };

  // Stop giving feedback (if in progress) and reset the widget to the
  // initial state.
  const abandon = useCallback(() => {
    setView('waiting');
    setFeedback(undefined);
    setSelectedRating(undefined);
    setFeedbackId(undefined);
    setIsScreenshotButtonClicked(false);
    setDetachForm(false);
  }, []);

  const value = {
    feedback,
    progress,
    view,
    setScreenshotTaken,
    screenshotTaken,
    initializeFeedback,
    setProgress,
    submitAllFeedback,
    abandon,
    selectedRating,
    setSelectedRating,
    selectInitialRating,
    isScreenshotButtonClicked,
    setIsScreenshotButtonClicked,
    detachForm,
    setDetachForm,
  };

  // reset feedback when route changes
  useEffect(() => {
    // disable effect for testing views
    if (test?.view) return;
    abandon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return <FeedbackContext.Provider value={value}> {props.children} </FeedbackContext.Provider>;
}

export const useFeedbackContext = () => {
  const feedback = useContext(FeedbackContext);
  if (!feedback && feedback !== null) {
    throw new Error('You must nest useFeedbackContext() inside of a FeedbackProvider.');
  }
  return feedback;
};
