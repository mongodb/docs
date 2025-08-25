// Register Joe
const joeEmail = "joe@example.com";
const joePassword = "passw0rd";
await app.emailPasswordAuth.registerUser({
  email: joeEmail,
  password: joePassword,
});
// Log in as Joe
const joeCredentials = Realm.Credentials.emailPassword(
  joeEmail,
  joePassword
);
const joe = await app.logIn(joeCredentials);
// The active user is now Joe
console.assert(joe.id === app.currentUser.id);

// Register Emma
const emmaEmail = "emma@example.com";
const emmaPassword = "passw0rd";
await app.emailPasswordAuth.registerUser({
  email: emmaEmail,
  password: emmaPassword,
});
// Log in as Emma
const emmaCredentials = Realm.Credentials.emailPassword(
  emmaEmail,
  emmaPassword
);
const emma = await app.logIn(emmaCredentials);
// The active user is now Emma, but Joe is still logged in
console.assert(emma.id === app.currentUser.id);
