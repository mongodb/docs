// Create an email/password credential
const credentials = Realm.Credentials.emailPassword(
  "someone@example.com",
  "Pa55w0rd!"
);
const user = await app.logIn(credentials);
