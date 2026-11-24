import type { Dispatch, SetStateAction, ReactNode, RefObject, MutableRefObject } from 'react';
import { useState, useCallback, useContext, useEffect, createContext, useTransition, useId, useRef } from 'react';
import { usePathname } from 'next/navigation';
import type { Viewport } from '@/hooks/use-viewport';
import { getViewport } from '@/hooks/use-viewport';
import type { SnootyEnv } from '@/types/data';
import { reportAnalytics } from '@/utils/report-analytics';
import { currentScrollPosition } from '@/utils/current-scroll-position';
import type { FeedbackUser } from './submit-feedback';
import { useBrowserUser } from './submit-feedback';
import type { FeedbackPageData } from './use-feedback-data';
import { submitFeedback } from './submit-feedback';
import { retrieveDataUri } from './handle-screenshot';

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
  abandon: (options?: { keepGuard?: boolean }) => void;
  exitAndSubmit: () => void;
  selectedRating: number | undefined;
  setSelectedRating: Dispatch<SetStateAction<number | undefined>>;
  selectInitialRating: (rating: number) => void;
  isScreenshotButtonClicked: boolean;
  setIsScreenshotButtonClicked: Dispatch<SetStateAction<boolean>>;
  detachForm: boolean;
  setDetachForm: Dispatch<SetStateAction<boolean>>;
  screenshotElement: Element | null;
  setScreenshotElement: Dispatch<SetStateAction<Element | null>>;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  hasSubmitted: boolean;
  /** Id of this instance's form card. Shared so screenshot-button can target it. */
  cardId: string;
  /** This instance's form card. Use instead of getElementById, which finds the first instance. */
  formRef: RefObject<HTMLDivElement>;
  /** Card position before the screenshot flow moved it off-screen. Kept here to survive the portal remount that detachForm triggers. */
  savedCardPosition: MutableRefObject<DOMRect | null>;
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
  exitAndSubmit: () => {},
  selectedRating: undefined,
  setSelectedRating: () => {},
  selectInitialRating: () => {},
  isScreenshotButtonClicked: false,
  setIsScreenshotButtonClicked: () => {},
  detachForm: false,
  setDetachForm: () => {},
  screenshotElement: null,
  setScreenshotElement: () => {},
  comment: '',
  setComment: () => {},
  email: '',
  setEmail: () => {},
  hasSubmitted: false,
  cardId: '',
  formRef: { current: null },
  savedCardPosition: { current: null },
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
  const [detachForm, setDetachForm] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | undefined>(test?.feedback?.rating || undefined);
  const [view, setView] = useState<FeedbackViewType>(test?.view || 'waiting');
  const [screenshotTaken, setScreenshotTaken] = useState(test?.screenshotTaken || false);
  const [progress, setProgress] = useState([true, false, false]);
  const [isScreenshotButtonClicked, setIsScreenshotButtonClicked] = useState(false);
  const [screenshotElement, setScreenshotElement] = useState<Element | null>(null);
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  // Once a feedback has been submitted on this page, the widget hides itself
  // and won't accept another submission until a full page reload. A soft
  // deterrent against repeated automated submissions, complementing the
  // server-side rate limits.
  const [hasSubmitted, setHasSubmitted] = useState(false);
  // Guards against a submission firing more than once for a single attempt
  // (Submit double-click, Submit racing an exit trigger, or a new rating
  // being started while a previous exit-triggered submission is still in
  // flight in the background). Set the instant either submitAllFeedback or
  // exitAndSubmit begins real work. submitAllFeedback clears it via
  // abandon(); exitAndSubmit closes the modal immediately via
  // abandon({ keepGuard: true }) but holds this true until its own
  // background request actually finishes, so the guard outlives the
  // optimistic close.
  const submissionStartedRef = useRef(false);
  const cardId = `feedback-card-${useId()}`;
  const formRef = useRef<HTMLDivElement>(null);
  const savedCardPosition = useRef<DOMRect | null>(null);
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

      return res;
    },
    [page.docs_property, page.slug, page.title, page.url, snootyEnv, test?.feedback, user],
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

  const selectInitialRating = (ratingValue: number) => {
    // Block starting a new submission once one has been submitted on this
    // page, or while a previous exit-triggered submission is still in
    // flight in the background (the modal may already look closed at that
    // point — see submissionStartedRef).
    if (hasSubmitted || submissionStartedRef.current) return;
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
        await submitFeedback(newFeedback);
        setFeedback(newFeedback);
      }
    } catch (e) {
      console.error('Error when retrying feedback submission', e);
    }
  };

  const submitAllFeedback = async ({ comment = '', email = '', dataUri, viewport }: SubmitAllFeedbackProps) => {
    // Guard against a double-click, or racing an exit-triggered submission.
    if (submissionStartedRef.current) return;
    submissionStartedRef.current = true;

    // Route the user to their "next steps"
    setProgress([false, false, true]);
    setView('submitted');
    setDetachForm(false);

    if (!selectedRating) return;
    // Submit the full feedback document
    const newFeedback = createFeedbackPayload(selectedRating, email, dataUri, viewport, comment);
    try {
      await submitFeedback(newFeedback);
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
      setComment('');
      setEmail('');
      // Mark this page's widget as spent; it will hide once the "submitted"
      // confirmation is dismissed and won't reopen without a page reload.
      setHasSubmitted(true);
    }
  };

  // Stop giving feedback (if in progress) and reset the widget to the
  // initial state. Pass { keepGuard: true } to close the modal without
  // clearing submissionStartedRef — used by exitAndSubmit to close
  // instantly while its background submission is still in flight.
  const abandon = useCallback((options?: { keepGuard?: boolean }) => {
    if (!options?.keepGuard) {
      submissionStartedRef.current = false;
    }
    setView('waiting');
    setFeedback(undefined);
    setSelectedRating(undefined);
    setIsScreenshotButtonClicked(false);
    setDetachForm(false);
    setScreenshotElement(null);
    setComment('');
    setEmail('');
  }, []);

  // Fired when the user exits the widget on the same page/tab (click outside,
  // Escape, or the close button) without pressing Submit. If a rating was
  // selected, this is treated as a real submission carrying whatever fields
  // were filled in so far, rather than discarding it. Switching browser tabs
  // is deliberately not covered here — nothing detects that today, and we're
  // not adding a listener for it.
  const exitAndSubmit = useCallback(async () => {
    // A submission via Submit already completed and is showing the
    // confirmation view — just dismiss it, no need to resubmit.
    if (view === 'submitted') {
      abandon();
      return;
    }

    // A submission is already in flight (e.g. Submit was already clicked
    // and hasn't resolved yet) — do nothing and let that attempt finish
    // undisturbed.
    if (submissionStartedRef.current) return;

    // Nothing to submit — just reset back to the idle state.
    if (selectedRating === undefined) {
      abandon();
      return;
    }

    submissionStartedRef.current = true;

    // Capture everything the payload needs before closing the modal below —
    // abandon() resets this state, but the background request still needs
    // the values as they were at the moment of exit.
    const ratingAtExit = selectedRating;
    const commentAtExit = comment;
    const emailAtExit = email;
    const shouldCaptureScreenshot = screenshotTaken;
    const screenshotElementAtExit = screenshotElement;

    // Close the modal immediately instead of waiting on the screenshot
    // capture and network request below — those can take long enough that
    // waiting for them made the modal feel stuck. Keep the guard held so a
    // new rating can't be started (and double-submitted) while this
    // request is still in flight.
    abandon({ keepGuard: true });

    try {
      let dataUri: string | undefined;
      let viewport: Viewport | undefined;
      if (shouldCaptureScreenshot) {
        viewport = getViewport();
        dataUri = await retrieveDataUri(screenshotElementAtExit);
      }
      const payload = createFeedbackPayload(ratingAtExit, emailAtExit, dataUri, viewport, commentAtExit);
      await submitFeedback(payload);
      setHasSubmitted(true);
    } catch (err) {
      console.error('Error while submitting feedback on exit', err);
    } finally {
      submissionStartedRef.current = false;
    }
  }, [view, selectedRating, comment, email, screenshotTaken, screenshotElement, createFeedbackPayload, abandon]);

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
    exitAndSubmit,
    selectedRating,
    setSelectedRating,
    selectInitialRating,
    isScreenshotButtonClicked,
    setIsScreenshotButtonClicked,
    detachForm,
    setDetachForm,
    screenshotElement,
    setScreenshotElement,
    comment,
    setComment,
    email,
    setEmail,
    hasSubmitted,
    cardId,
    formRef,
    savedCardPosition,
  };

  // reset feedback when route changes
  useEffect(() => {
    // disable effect for testing views
    if (test?.view) return;
    abandon();
    // Re-enable the widget on client-side navigation to a new page.
    setHasSubmitted(false);
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
