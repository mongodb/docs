const token = "someToken";
const tokenId = "someTokenId";

try {
  await app.emailPasswordAuth.confirmUser({ token, tokenId });
  // User email address confirmed.
  console.log("Successfully confirmed user.");
} catch (err) {
  console.log(`User confirmation failed: ${err}`);
}
