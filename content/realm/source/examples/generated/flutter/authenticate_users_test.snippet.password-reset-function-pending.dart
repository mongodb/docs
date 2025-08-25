// The password reset function takes any number of
// arguments.
final args = [];

EmailPasswordAuthProvider authProvider = EmailPasswordAuthProvider(app);
await authProvider.callResetPasswordFunction(
    "lisa@example.com", "n3wSt0ngP4ssw0rd!",
    functionArgs: args);

// ... Later...

// Token and tokenId are parameters you can access
// in the App Services function context. You could send
// this to the user via email, SMS, or some other method.
final token = "someToken";
final tokenId = "someTokenId";

await authProvider.completeResetPassword(
    "n3wSt0ngP4ssw0rd!", token, tokenId);
