// The password reset function takes any number of
// arguments. You might ask the user to provide answers to
// security questions, for example, to verify the user
// should be able to complete the password reset.
final args = [
  "Snowball II",
  "Springfield Elementary School",
  "Bouvier"
];

EmailPasswordAuthProvider authProvider = EmailPasswordAuthProvider(app);
await authProvider.callResetPasswordFunction(
    "lisa@example.com", "n3wSt0ngP4ssw0rd!",
    functionArgs: args);
