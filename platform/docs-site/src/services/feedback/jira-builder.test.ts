import type { ObjectId } from 'mongodb';
import type { FeedbackDocument } from '@/services/db/feedback';

// buildJiraDescription is a pure function of `feedback`; it never touches
// the Jira client. This module-level import only exists for the other
// exports in jira-builder.ts, and constructing the real client throws if
// JIRA_USERNAME/PASSWORD env vars aren't set, so it's mocked out here.
jest.mock('@/utils/jira-client', () => ({ jiraClientWithAuth: {} }));

import { buildJiraDescription } from './jira-builder';

// Wiki-markup injection regression tests (DOP-7289 §7); see
// stripJiraWikiMarkup in jira-builder.ts for the rationale.

function buildFeedback(overrides: Partial<FeedbackDocument> = {}): FeedbackDocument {
  return {
    _id: 'feedback-id-1' as unknown as ObjectId,
    fingerprint: { userAgent: null, ipAddress: 'unknown' },
    submittedAt: new Date('2026-01-01T00:00:00Z'),
    page: {
      slug: 'docs/tutorial',
      title: 'Tutorial',
      url: 'https://www.mongodb.com/docs/tutorial',
      docs_property: 'manual',
    },
    user: { id: 'u1', email: '' },
    comment: undefined,
    category: 'Positive',
    rating: 5,
    attachments: [],
    snootyEnv: 'production',
    ...overrides,
  };
}

describe('buildJiraDescription', () => {
  it('strips wiki-markup characters from an attacker-controlled page.title', () => {
    const feedback = buildFeedback({
      page: {
        slug: 'docs/tutorial',
        title: 'Real Docs Page|https://attacker.example',
        url: 'https://www.mongodb.com/docs/tutorial',
        docs_property: 'manual',
      },
    });
    const description = buildJiraDescription(feedback);
    const feedbackLine = description.split('\n')[0];
    expect(feedbackLine.match(/\[/g)).toHaveLength(1);
    expect(feedbackLine.match(/\]/g)).toHaveLength(1);
    expect(feedbackLine.match(/\|/g)).toHaveLength(1);
  });

  it('strips wiki-markup characters from an attacker-controlled page.url', () => {
    const feedback = buildFeedback({
      page: {
        slug: 'docs/tutorial',
        title: 'Tutorial',
        url: 'https://www.mongodb.com/docs/tutorial|{malicious}',
        docs_property: 'manual',
      },
    });
    const description = buildJiraDescription(feedback);
    expect(description).not.toContain('{malicious}');
  });

  it('strips wiki-markup characters from user.email', () => {
    const feedback = buildFeedback({ user: { id: 'u1', email: 'a@example.com|[spoofed]' } });
    const description = buildJiraDescription(feedback);
    expect(description).not.toContain('[spoofed]');
  });

  it('strips wiki-markup characters from comment', () => {
    const feedback = buildFeedback({ comment: 'nice page{but}here is a [link|https://attacker.example]' });
    const description = buildJiraDescription(feedback);
    expect(description).not.toContain('[link|https://attacker.example]');
  });

  it('preserves ordinary comment text containing a shell pipe', () => {
    const feedback = buildFeedback({ comment: 'run docker ps | grep mongod' });
    const description = buildJiraDescription(feedback);
    expect(description).toContain('run docker ps');
    expect(description).toContain('grep mongod');
  });

  it('strips a wiki-markup image embed from an attacker-controlled comment', () => {
    const feedback = buildFeedback({ comment: 'nice page !https://attacker.example/x.png!' });
    const description = buildJiraDescription(feedback);
    expect(description).not.toContain('!https://attacker.example/x.png!');
  });
});
