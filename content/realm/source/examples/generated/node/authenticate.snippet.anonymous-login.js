// Create an anonymous credential
const credentials = Realm.Credentials.anonymous();
const user = await app.logIn(credentials);
