import { useState } from 'react';
import type { FeedbackPayload } from './context';

export interface FeedbackUser {
  id: string;
  email?: string;
}

const FEEDBACK_USER_KEY = 'feedback_user_session';

/**
 * Generates a new anonymous user session ID
 */
export const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Deletes localStorage data for all users
 */
export const deleteLocalStorageData = async (): Promise<void> => {
  if (isValidWindow()) {
    localStorage.removeItem(FEEDBACK_USER_KEY);
  }
};

/**
 *  User Authentication & Management
 * Gets or creates an anonymous user session ID for feedback
 */
export const loginAnonymous = (): FeedbackUser => {
  if (!isValidWindow()) {
    // Server-side: generate temporary ID
    return { id: generateUserId() };
  }

  try {
    const localId = localStorage.getItem(FEEDBACK_USER_KEY);
    if (localId) {
      return { id: localId };
    }
  } catch (e) {
    console.error('Failed to access localStorage for feedback user', e);
  }

  // If no existing ID or localStorage failed, create new one
  const userId = generateUserId();
  localStorage.setItem(FEEDBACK_USER_KEY, userId);
  return { id: userId };
};

export const useBrowserUser = () => {
  const [user, setUser] = useState(loginAnonymous());

  async function reassignCurrentUser() {
    // Clean up invalid data from local storage to avoid bubbling up local storage sizes for broken user credentials
    // This should be safe since only old users' data would be deleted, and we make a new user right after
    deleteLocalStorageData();

    const newUser = loginAnonymous();
    setUser(newUser);
    return newUser;
  }

  return { user, reassignCurrentUser };
};

export function isValidWindow() {
  return typeof window !== 'undefined';
}

// Feedback Widget Functions
export async function upsertFeedback({ page, user, attachment, ...rest }: FeedbackPayload): Promise<string> {
  const { viewport, comment, category, rating, snootyEnv, feedback_id } = rest;

  const res = await fetch('/api/feedback/upsert/', {
    method: 'POST',
    body: JSON.stringify({
      page,
      user,
      attachment,
      viewport,
      comment,
      category,
      rating,
      snootyEnv,
      feedback_id,
    }),
  });
  const updateOneRes = await res.json();
  return updateOneRes.upsertedId?.toString() || '';
}
