// Create a custom function credential.
const credentials = Realm.Credentials.function({
  username: "ilovemongodb",
});
const user = await app.logIn(credentials);
