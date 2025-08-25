async function loginCustomFunction(payload) {
  // Create a Custom Function credential
  const credentials = Realm.Credentials.function(payload);

  // Authenticate the user
  const user = await app.logIn(credentials);
  // `App.currentUser` updates to match the logged in user
  console.assert(user.id === app.currentUser.id);

  return user;
}
const user = await loginCustomFunction({ username: "ilovemongodb" });
