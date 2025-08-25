async function loginAnonymous() {
  // Create an anonymous credential
  const credentials = Realm.Credentials.anonymous();

  // Authenticate the user
  const user = await app.logIn(credentials);
  // `App.currentUser` updates to match the logged in user
  console.assert(user.id === app.currentUser.id);

  return user;
}
const user = await loginAnonymous();
