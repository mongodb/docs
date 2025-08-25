const auth = require("some-external-auth-system");
try {
  const user = await auth.login(payload);
  return user.id;
} catch (err) {
  throw new Error(`Authentication failed with reason: ${err.message}`);
}
