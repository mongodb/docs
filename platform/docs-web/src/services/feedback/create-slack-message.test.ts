/**
 * Slack mrkdwn injection regression test (DOP-7289 §7). `slackLink` builds
 * `<url|text>` mrkdwn link syntax, so an unescaped `<`, `>`, or `&` in either
 * argument lets attacker-controlled text or a title break out of the
 * intended link.
 *
 * `create-slack-message.ts` transitively imports the `@/services/db/*`
 * collection helpers (-> `./client` -> the real `mongodb` package, which
 * jest cannot transform under this config) and `./jira-builder` (->
 * `@/utils/jira-client`, which throws at import time without Jira env
 * vars). `slackLink` itself touches none of that, so these modules are
 * mocked out to isolate the pure function under test.
 */
jest.mock('@/services/db/docsets', () => ({}));
jest.mock('@/services/db/docs-metadata', () => ({}));
jest.mock('@/services/db/feedback', () => ({}));
jest.mock('./jira-builder', () => ({ createJiraTicketUrl: jest.fn() }));

import { slackLink } from './create-slack-message';

describe('slackLink', () => {
  it('escapes &, <, > in the link text', () => {
    const result = slackLink('Real Docs Page<https://attacker.example|spoofed>', 'https://www.mongodb.com/docs/x');
    expect(result).not.toContain('<https://attacker.example|spoofed>');
    expect(result).toContain('&lt;https://attacker.example|spoofed&gt;');
  });

  it('escapes &, <, > in the url', () => {
    const result = slackLink('Tutorial', 'https://www.mongodb.com/docs/x?a=1&b=2');
    expect(result).toContain('&amp;b=2');
  });

  it('escapes & before < and > so escaping is not double-applied', () => {
    const result = slackLink('a & <b>', 'https://www.mongodb.com/docs/x');
    expect(result).toBe('<https://www.mongodb.com/docs/x|a &amp; &lt;b&gt;>');
  });

  it('renders a normal link unchanged', () => {
    const result = slackLink('Tutorial', 'https://www.mongodb.com/docs/tutorial');
    expect(result).toBe('<https://www.mongodb.com/docs/tutorial|Tutorial>');
  });
});
