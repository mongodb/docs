const app = new Realm.App({ id: "myapp-abcde" });

// Log in as Joe
const joeCredentials = Realm.Credentials.emailPassword("joe@example.com", "passw0rd")
const joe = await app.logIn(joeCredentials);
// The active user is now Joe
assert(joe.id === app.currentUser.id);

// Log in as Emma
const emmaCredentials = Realm.Credentials.emailPassword("emma@example.com", "pa55word")
const emma = await app.logIn(emmaCredentials);
// The active user is now Emma, but Joe is still logged in
assert(emma.id === app.currentUser.id);
