import { timingSafeEqual } from 'crypto';

/**
 * Validates a token using constant-time comparison to prevent timing attacks.
 *
 * @param token - The token to validate
 * @param expectedToken - The expected token value
 * @returns true if tokens match, false otherwise
 */
export function validateToken(token: string, expectedToken: string): boolean {
  if (!expectedToken) {
    return false;
  }

  // Use constant-time comparison to prevent timing attacks
  // timingSafeEqual requires buffers of the same length
  if (token.length !== expectedToken.length) {
    console.warn('Token length mismatch:', token.length, expectedToken.length);
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
 * @returns The extracted token if valid, null otherwise
 */
export function validateBearerToken(authHeader: string | null, expectedToken: string): boolean {
  if (!authHeader) {
    console.warn('Authorization header is null');
    return false;
  }

  // Extract the token
  const token = authHeader.split('Bearer ')[1];

  if (!token) {
    console.warn('Authorization header does not contain a valid Bearer token');
    return false;
  }

  return validateToken(token, expectedToken);
}
