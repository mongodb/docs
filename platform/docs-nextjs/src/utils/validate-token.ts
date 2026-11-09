import { timingSafeEqual } from 'node:crypto';

/**
 * Validates a token using constant-time comparison to prevent timing attacks.
 *
 * @param token - The token to validate
 * @param expectedToken - The expected token value
 * @returns true if tokens match, false otherwise
 */
function validateToken(token: string, expectedToken: string): boolean {
  if (!expectedToken) {
    return false;
  }

  // timingSafeEqual requires buffers of the same length
  if (token.length !== expectedToken.length) {
    console.warn('Token length mismatch');
    return false;
  }

  try {
    return timingSafeEqual(Buffer.from(token, 'utf8'), Buffer.from(expectedToken, 'utf8'));
  } catch {
    console.warn('Timing safe equal failed');
    return false;
  }
}

/**
 * Extracts and validates a Bearer token from a request's Authorization header.
 *
 * @param authHeader - The Authorization header value (e.g., "Bearer <token>")
 * @param expectedToken - The expected token value
 * @returns true if the header contains a Bearer token matching the expected token, false otherwise
 */
export function validateBearerToken(authHeader: string | null, expectedToken: string): boolean {
  if (!authHeader) {
    console.warn('Authorization header is null');
    return false;
  }

  const token = authHeader.split('Bearer ')[1];

  if (!token) {
    console.warn('Authorization header does not contain a valid Bearer token');
    return false;
  }

  return validateToken(token, expectedToken);
}
