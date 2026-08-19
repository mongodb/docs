import { validateFeedbackInput } from './feedback-input';

/**
 * Security regression tests for the feedback input hardening (DOP-7023):
 *  - NoSQL operator injection via page.docs_property is rejected.
 *  - HTML/markup in the comment is stripped.
 */

const validPage = {
  slug: '/tutorial',
  title: 'Tutorial',
  url: 'https://www.mongodb.com/docs/tutorial',
  docs_property: 'manual',
};
const validUser = { id: 'u1', email: 'a@example.com' };

describe('validateFeedbackInput', () => {
  it('rejects a NoSQL operator injection in page.docs_property', () => {
    const result = validateFeedbackInput({
      page: { ...validPage, docs_property: { $ne: null } },
      user: validUser,
      category: 'Positive',
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toBe('Invalid page data');
  });

  it('rejects a non-string comment', () => {
    const result = validateFeedbackInput({
      page: validPage,
      user: validUser,
      comment: { $ne: null },
      category: 'Positive',
    });
    expect(result.ok).toBe(false);
  });

  it('rejects an invalid category', () => {
    const result = validateFeedbackInput({
      page: validPage,
      user: validUser,
      category: 'Malicious',
    });
    expect(result.ok).toBe(false);
  });

  it('strips HTML/script from the comment', () => {
    const result = validateFeedbackInput({
      page: validPage,
      user: validUser,
      comment: '<script>alert(1)</script><b>bad</b> feedback',
      category: 'Negative',
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.comment).not.toContain('<script>');
      expect(result.comment).not.toContain('<b>');
      expect(result.comment).not.toContain('alert(1)');
      expect(result.comment).toContain('feedback');
    }
  });

  it('caps the comment length at 5000 characters', () => {
    const result = validateFeedbackInput({
      page: validPage,
      user: validUser,
      comment: 'a'.repeat(6000),
    });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.comment?.length).toBe(5000);
  });

  it('returns a page rebuilt from only its known string fields', () => {
    const result = validateFeedbackInput({
      page: { ...validPage, extra: 'should-be-dropped' },
      user: validUser,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.page).toEqual(validPage);
      expect(result.page).not.toHaveProperty('extra');
    }
  });

  it('accepts a valid payload with no comment', () => {
    const result = validateFeedbackInput({ page: validPage, user: validUser, category: 'Positive' });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.comment).toBeUndefined();
  });
});
