// Create a custom jwt credential.
const jwt = await authenticateWithExternalSystem();
const credentials = Realm.Credentials.jwt(jwt);
const user = await app.logIn(credentials);
