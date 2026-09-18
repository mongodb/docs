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

  it('rejects the incident-report injection payloads in page.url', () => {
    const payloads = [
      'if(now()=sysdate(),sleep(15),0)',
      "(select(0)from(select(sleep(15)))v)/*'+(select(0)from(select(sleep(15)))v)*/",
      '\'"()&%<zzz><ScRiPt >QwpR(9902)</ScRiPt>',
      '(select 198766*667891)',
      '(select 198766*667891 from DUAL)',
      'http://hitdqfvlbsymu.bxss.me/',
      'hitdqfvlbsymu.bxss.me',
    ];
    for (const url of payloads) {
      const result = validateFeedbackInput({
        page: { ...validPage, url },
        user: validUser,
        category: 'Positive',
      });
      expect(result.ok).toBe(false);
    }
  });

  it('rejects string-based host-confusion tricks in page.url', () => {
    const payloads = ['https://www.mongodb.com.evil.com/', 'https://www.mongodb.com@evil.com/'];
    for (const url of payloads) {
      const result = validateFeedbackInput({
        page: { ...validPage, url },
        user: validUser,
        category: 'Positive',
      });
      expect(result.ok).toBe(false);
    }
  });

  it('rejects an arbitrary host with no relation to mongodb.com or a docs preview', () => {
    const payloads = [
      'https://xn--80ak6aa92e.com/docs/',
      'https://evil-site.netlify.app/docs/', // bare *.netlify.app must not be a wildcard
      'https://notdeploypreview--mongodb-manual.netlify.app/docs/', // wrong preview prefix shape
    ];
    for (const url of payloads) {
      const result = validateFeedbackInput({
        page: { ...validPage, url },
        user: validUser,
        category: 'Positive',
      });
      expect(result.ok).toBe(false);
    }
  });

  it('rejects http on the production host', () => {
    const result = validateFeedbackInput({
      page: { ...validPage, url: 'http://www.mongodb.com/docs/manual/' },
      user: validUser,
      category: 'Positive',
    });
    expect(result.ok).toBe(false);
  });

  it('accepts a legitimate page.url from a docs deploy-preview host', () => {
    const result = validateFeedbackInput({
      page: { ...validPage, url: 'https://deploy-preview-19378--mongodb-manual.netlify.app/docs/upcoming/tutorial/' },
      user: validUser,
      category: 'Positive',
    });
    expect(result.ok).toBe(true);
  });

  it('accepts a legitimate page.url from a temp-pr preview host', () => {
    const result = validateFeedbackInput({
      page: { ...validPage, url: 'https://temp-pr-123--mongodb-manual.netlify.app/docs/' },
      user: validUser,
      category: 'Positive',
    });
    expect(result.ok).toBe(true);
  });

  it('accepts a legitimate page.url from the corp staging origin', () => {
    const result = validateFeedbackInput({
      page: { ...validPage, url: 'https://mongodbcom-cdn.staging.corp.mongodb.com/docs/deployment/' },
      user: validUser,
      category: 'Positive',
    });
    expect(result.ok).toBe(true);
  });

  it('rejects http on the corp staging origin', () => {
    const result = validateFeedbackInput({
      page: { ...validPage, url: 'http://mongodbcom-cdn.staging.corp.mongodb.com/docs/deployment/' },
      user: validUser,
      category: 'Positive',
    });
    expect(result.ok).toBe(false);
  });

  it('accepts a legitimate page.url from local dev', () => {
    const result = validateFeedbackInput({
      page: { ...validPage, url: 'http://localhost:3000/docs/tutorial' },
      user: validUser,
      category: 'Positive',
    });
    expect(result.ok).toBe(true);
  });

  it('accepts a legitimate page.url from local dev on 127.0.0.1', () => {
    const result = validateFeedbackInput({
      page: { ...validPage, url: 'http://127.0.0.1:3000/docs/tutorial' },
      user: validUser,
      category: 'Positive',
    });
    expect(result.ok).toBe(true);
  });

  it('accepts a legitimate page.url with a fragment', () => {
    const result = validateFeedbackInput({
      page: { ...validPage, url: 'https://www.mongodb.com/docs/get-started/#std-label-example' },
      user: validUser,
      category: 'Positive',
    });
    expect(result.ok).toBe(true);
  });

  it('accepts a legitimate page.url with a query string', () => {
    const result = validateFeedbackInput({
      page: { ...validPage, url: 'https://www.mongodb.com/docs/tutorial?selected-content=nodejs' },
      user: validUser,
      category: 'Positive',
    });
    expect(result.ok).toBe(true);
  });

  it('rejects a page.slug containing a path-traversal segment', () => {
    const result = validateFeedbackInput({
      page: { ...validPage, slug: '../../etc/passwd' },
      user: validUser,
      category: 'Positive',
    });
    expect(result.ok).toBe(false);
  });

  it('rejects a page.slug with an injected SQLi suffix on a real path prefix', () => {
    const result = validateFeedbackInput({
      page: { ...validPage, slug: "docs/drivers/java/sync/current/get-startedUyY1jHcd') OR 271=(SELECT 271" },
      user: validUser,
      category: 'Positive',
    });
    expect(result.ok).toBe(false);
  });

  it('rejects a page.slug longer than 256 characters', () => {
    const result = validateFeedbackInput({
      page: { ...validPage, slug: 'a'.repeat(257) },
      user: validUser,
      category: 'Positive',
    });
    expect(result.ok).toBe(false);
  });

  it('accepts a real versioned slug containing a version dot', () => {
    const result = validateFeedbackInput({
      page: { ...validPage, slug: 'docs/entity-framework/v8.0/get-started' },
      user: validUser,
      category: 'Positive',
    });
    expect(result.ok).toBe(true);
  });

  it('accepts both the docs/-prefixed and leading-slash page.slug shapes', () => {
    for (const slug of ['docs/tutorial', '/tutorial']) {
      const result = validateFeedbackInput({
        page: { ...validPage, slug },
        user: validUser,
        category: 'Positive',
      });
      expect(result.ok).toBe(true);
    }
  });

  it('rejects a page.docs_property containing out-of-charset characters', () => {
    const result = validateFeedbackInput({
      page: { ...validPage, docs_property: 'manual<script>' },
      user: validUser,
      category: 'Positive',
    });
    expect(result.ok).toBe(false);
  });

  it('rejects a page.title longer than 200 characters', () => {
    const result = validateFeedbackInput({
      page: { ...validPage, title: 'a'.repeat(201) },
      user: validUser,
      category: 'Positive',
    });
    expect(result.ok).toBe(false);
  });

  it('rejects a page.title containing control characters', () => {
    const result = validateFeedbackInput({
      page: { ...validPage, title: 'Tutorial' },
      user: validUser,
      category: 'Positive',
    });
    expect(result.ok).toBe(false);
  });

  it('accepts a real live page title containing literal angle brackets', () => {
    const result = validateFeedbackInput({
      page: { ...validPage, title: '$[<identifier>] (update operator)' },
      user: validUser,
      category: 'Positive',
    });
    expect(result.ok).toBe(true);
  });

  it('rejects a comment containing control characters', () => {
    const result = validateFeedbackInput({
      page: validPage,
      user: validUser,
      comment: 'feedbacktext',
      category: 'Positive',
    });
    expect(result.ok).toBe(false);
  });

  it('accepts a multi-line comment from the Textarea widget', () => {
    const result = validateFeedbackInput({
      page: validPage,
      user: validUser,
      comment: 'line one\nline two\r\nline three',
      category: 'Positive',
    });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.comment).toBe('line one\nline two\r\nline three');
  });
});
