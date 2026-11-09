/**
 * @jest-environment node
 */
import { validateBearerToken } from './validate-token';

const TOKEN = 'test-webhook-token';

describe('validateBearerToken', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('accepts a matching Bearer token', () => {
    expect(validateBearerToken(`Bearer ${TOKEN}`, TOKEN)).toBe(true);
  });

  it('rejects a missing header', () => {
    expect(validateBearerToken(null, TOKEN)).toBe(false);
  });

  it('rejects a header without the Bearer scheme', () => {
    expect(validateBearerToken(TOKEN, TOKEN)).toBe(false);
  });

  it('rejects a wrong token of the same length', () => {
    expect(validateBearerToken(`Bearer ${'x'.repeat(TOKEN.length)}`, TOKEN)).toBe(false);
  });

  it('rejects a wrong token of a different length', () => {
    expect(validateBearerToken('Bearer short', TOKEN)).toBe(false);
  });

  it('rejects any token when the expected token is empty', () => {
    expect(validateBearerToken('Bearer anything', '')).toBe(false);
  });

  it('rejects tokens with the same character count but different byte length', () => {
    expect(validateBearerToken('Bearer é', 'e')).toBe(false);
  });
});
