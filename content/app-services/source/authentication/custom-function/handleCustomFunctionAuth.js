exports = async function handleCustomFunctionAuth(payload) {
  const auth = require("some-external-auth-system");
  const user = await auth.login(payload);
  return user.id;
};
