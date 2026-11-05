import { useState, useEffect, useId } from 'react';
import { Button } from '@via-ds/components/button';
import { TextArea } from '@via-ds/components/text-area';
import { TextField } from '@via-ds/components/text-field';
import Loadable from '@loadable/component';
import sanitizeHtml from 'sanitize-html';
import { Layout } from '../components/view-components';
import { useFeedbackContext } from '../context';
import { retrieveDataUri } from '../handle-screenshot';
import { useViewport } from '@/hooks/use-viewport';
import useScreenSize from '@/hooks/use-screen-size';
import validateEmail from '@/utils/validate-email';
import StarRating from '../components/star-rating';
import {
  COMMENT_PLACEHOLDER_TEXT,
  COMMENT_PLACEHOLDER_TEXT_LOW,
  EMAIL_ERROR_TEXT,
  EMAIL_PLACEHOLDER_TEXT,
  FEEDBACK_SUBMIT_BUTTON_TEXT,
} from '../constants';
import styles from './comment-view.module.scss';
const ScreenshotButton = Loadable(() => import('../components/screenshot-button'));

const useValidation = (inputValue: string, validator: (input: string) => boolean) => {
  const [isValid, setIsValid] = useState<boolean>(() => validator(inputValue));
  useEffect(() => {
    setIsValid(validator(inputValue));
  }, [inputValue, validator]);

  return isValid;
};

const CommentView = () => {
  const {
    submitAllFeedback,
    screenshotTaken,
    screenshotElement,
    setSelectedRating,
    selectedRating = 0,
    comment,
    setComment,
    email,
    setEmail,
  } = useFeedbackContext();
  const instanceId = useId();
  const commentInputId = `feedback-comment-${instanceId}`;
  const emailInputId = `feedback-email-${instanceId}`;
  const [hasEmailError, setHasEmailError] = useState(false);
  const isValidEmail = useValidation(email, validateEmail);
  const viewport = useViewport();
  const { isTabletOrMobile } = useScreenSize();

  const handleSubmit = async () => {
    if (isValidEmail) {
      // Sanitize the comment to remove any potentially dangerous HTML/scripts
      const sanitizedComment = sanitizeHtml(comment, {
        allowedTags: [], // Remove all HTML tags
        allowedAttributes: {}, // Remove all attributes
      });

      if (screenshotTaken) {
        const dataUri = await retrieveDataUri(screenshotElement);
        await submitAllFeedback({ comment: sanitizedComment, email, dataUri, viewport });
      } else {
        await submitAllFeedback({ comment: sanitizedComment, email });
      }
    } else {
      setHasEmailError(true);
    }
  };

  return (
    <Layout>
      <StarRating className={styles.starRating} handleRatingSelection={setSelectedRating} />
      <TextArea
        id={commentInputId}
        aria-label="Comment Text Box"
        className={styles.commentInput}
        placeholder={selectedRating < 4 ? COMMENT_PLACEHOLDER_TEXT_LOW : COMMENT_PLACEHOLDER_TEXT}
        value={comment}
        onChange={setComment}
      />
      <TextField
        type="email"
        id={emailInputId}
        aria-label="Email Text Box"
        className={styles.emailInput}
        placeholder={EMAIL_PLACEHOLDER_TEXT}
        value={email}
        onChange={setEmail}
        errorMessage={EMAIL_ERROR_TEXT}
        isInvalid={hasEmailError}
      />
      {!isTabletOrMobile && <ScreenshotButton />}
      <Button className={styles.submitButton} onPress={() => handleSubmit()} type="submit">
        {FEEDBACK_SUBMIT_BUTTON_TEXT}
      </Button>
    </Layout>
  );
};

export default CommentView;
