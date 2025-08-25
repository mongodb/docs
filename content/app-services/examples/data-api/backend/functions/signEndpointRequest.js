// :snippet-start: signEndpointRequest
/**
 * Generate an HMAC request signature.
 * @param {string} secret - The secret validation string, e.g. "12345"
 * @param {object} body - The endpoint request body e.g. { "message": "MESSAGE" }
 * @returns {string} The HMAC SHA-256 request signature in hex format.
 */
exports = function signEndpointRequest(secret, body) {
  const payload = EJSON.stringify(body);
  return utils.crypto.hmac(payload, secret, "sha256", "hex");
};
// :snippet-end:
