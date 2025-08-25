// The user's email address
const email = "joe.jasper@example.com";
// The new password to use
const password = "newPassw0rd";
// Additional arguments for the reset function
const args = [];

await app.emailPasswordAuth.callResetPasswordFunction(
  { email, password },
  ...args
);
