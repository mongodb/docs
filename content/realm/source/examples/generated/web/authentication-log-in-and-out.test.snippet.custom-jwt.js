async function loginCustomJwt(jwt) {
  // Create a Custom JWT credential
  const credentials = Realm.Credentials.jwt(jwt);

  // Authenticate the user
  const user = await app.logIn(credentials);
  // `App.currentUser` updates to match the logged in user
  console.assert(user.id === app.currentUser.id);

  return user;
}
const user = await loginCustomJwt("eyJ0eXAi...Q3NJmnU8oP3YkZ8");
