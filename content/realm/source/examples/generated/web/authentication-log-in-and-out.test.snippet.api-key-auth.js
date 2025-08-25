async function loginApiKey(apiKey) {
  // Create an API Key credential
  const credentials = Realm.Credentials.apiKey(apiKey);

  // Authenticate the user
  const user = await app.logIn(credentials);

  // `App.currentUser` updates to match the logged in user
  console.assert(user.id === app.currentUser.id);

  return user;
}

const user = await loginApiKey(REALM_API_KEY.key); // add previously generated API key
