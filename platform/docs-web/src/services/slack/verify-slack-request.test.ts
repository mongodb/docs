import { createHmac } from 'node:crypto';
import { isAllowedSlackResponseUrl, verifySlackRequest } from './verify-slack-request';

const SECRET = 'test-signing-secret';
const RAW_BODY = 'payload=%7B%22type%22%3A%22block_actions%22%7D';
const NOW = 1_760_000_000_000;

jest.mock('@/utils/env-config', () => ({
  __esModule: true,
  default: {
    get SLACK_SIGNING_SECRET() {
      return process.env.SLACK_SIGNING_SECRET ?? '';
    },
  },
}));

function sign({ body = RAW_BODY, timestamp, secret = SECRET }: { body?: string; timestamp: string; secret?: string }) {
  return `v0=${createHmac('sha256', secret).update(`v0:${timestamp}:${body}`).digest('hex')}`;
}

function headersFor({ timestamp, signature }: { timestamp?: string; signature?: string }) {
  const headers = new Headers();
  if (timestamp !== undefined) headers.set('x-slack-request-timestamp', timestamp);
  if (signature !== undefined) headers.set('x-slack-signature', signature);
  return headers;
}

describe('verifySlackRequest', () => {
  const currentTimestamp = String(Math.floor(NOW / 1000));

  beforeEach(() => {
    process.env.SLACK_SIGNING_SECRET = SECRET;
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    delete process.env.SLACK_SIGNING_SECRET;
  });

  it('accepts a correctly signed, current request', () => {
    const result = verifySlackRequest({
      rawBody: RAW_BODY,
      headers: headersFor({ timestamp: currentTimestamp, signature: sign({ timestamp: currentTimestamp }) }),
      now: NOW,
    });

    expect(result).toEqual({ ok: true });
  });

  it('rejects an unsigned request, which is the reported vulnerability', () => {
    const result = verifySlackRequest({ rawBody: RAW_BODY, headers: new Headers(), now: NOW });

    expect(result).toEqual({ ok: false, reason: 'missing_headers' });
  });

  it('rejects a signature computed with the wrong secret', () => {
    const result = verifySlackRequest({
      rawBody: RAW_BODY,
      headers: headersFor({
        timestamp: currentTimestamp,
        signature: sign({ timestamp: currentTimestamp, secret: 'attacker-guess' }),
      }),
      now: NOW,
    });

    expect(result).toEqual({ ok: false, reason: 'invalid_signature' });
  });

  it('rejects a valid signature replayed against a different body', () => {
    const result = verifySlackRequest({
      rawBody: 'payload=%7B%22response_url%22%3A%22http%3A%2F%2F169.254.169.254%22%7D',
      headers: headersFor({ timestamp: currentTimestamp, signature: sign({ timestamp: currentTimestamp }) }),
      now: NOW,
    });

    expect(result).toEqual({ ok: false, reason: 'invalid_signature' });
  });

  it('rejects a correctly signed request older than the replay window', () => {
    const stale = String(Math.floor(NOW / 1000) - 60 * 6);

    const result = verifySlackRequest({
      rawBody: RAW_BODY,
      headers: headersFor({ timestamp: stale, signature: sign({ timestamp: stale }) }),
      now: NOW,
    });

    expect(result).toEqual({ ok: false, reason: 'stale_timestamp' });
  });

  it('rejects a non-numeric timestamp rather than letting a NaN skew check pass', () => {
    const result = verifySlackRequest({
      rawBody: RAW_BODY,
      headers: headersFor({ timestamp: 'not-a-number', signature: sign({ timestamp: 'not-a-number' }) }),
      now: NOW,
    });

    expect(result).toEqual({ ok: false, reason: 'malformed_timestamp' });
  });

  it('fails closed when the signing secret is not configured', () => {
    delete process.env.SLACK_SIGNING_SECRET;

    const result = verifySlackRequest({
      rawBody: RAW_BODY,
      headers: headersFor({ timestamp: currentTimestamp, signature: sign({ timestamp: currentTimestamp }) }),
      now: NOW,
    });

    expect(result).toEqual({ ok: false, reason: 'not_configured' });
  });

  it('rejects a truncated signature without throwing on the length mismatch', () => {
    const result = verifySlackRequest({
      rawBody: RAW_BODY,
      headers: headersFor({ timestamp: currentTimestamp, signature: 'v0=abc' }),
      now: NOW,
    });

    expect(result).toEqual({ ok: false, reason: 'invalid_signature' });
  });
});

describe('isAllowedSlackResponseUrl', () => {
  it('accepts a real Slack response_url', () => {
    expect(isAllowedSlackResponseUrl('https://hooks.slack.com/actions/T0000/1234/abcdEFGH')).toBe(true);
  });

  it.each([
    ['the link-local metadata endpoint', 'http://169.254.169.254/latest/meta-data/'],
    ['an RFC1918 10.x target', 'http://10.0.0.1:80/'],
    ['an RFC1918 172.16.x target', 'https://172.16.0.1/'],
    ['an RFC1918 192.168.x target', 'http://192.168.1.1:27017/'],
    ['loopback', 'http://127.0.0.1:3000/'],
    ['IPv6 loopback', 'http://[::1]/'],
    ['an attacker-controlled public webhook', 'https://attacker.example.com/collect'],
    ['a lookalike suffix host', 'https://hooks.slack.com.attacker.example.com/x'],
    ['a lookalike prefix host', 'https://evilhooks.slack.com/x'],
    ['plaintext http on the allowed host', 'http://hooks.slack.com/actions/T0/1/a'],
    ['an explicit non-standard port on the allowed host', 'https://hooks.slack.com:27017/actions/T0/1/a'],
    ['userinfo parser confusion', 'https://hooks.slack.com@attacker.example.com/x'],
    ['a non-http scheme', 'file:///etc/passwd'],
    ['a relative path', '/actions/T0/1/a'],
  ])('rejects %s', (_label, url) => {
    expect(isAllowedSlackResponseUrl(url)).toBe(false);
  });

  it.each([[undefined], [null], [42], [{}], [['https://hooks.slack.com/actions/T0/1/a']]])(
    'rejects the non-string value %p',
    (value) => {
      expect(isAllowedSlackResponseUrl(value)).toBe(false);
    },
  );
});
