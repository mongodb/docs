// The redirect URI should be on the same domain as this app and
// specified in the auth provider configuration.
const redirectUri = "https://app.example.com/handleOAuthLogin";
const credentials = Realm.Credentials.facebook(redirectUri);

// Calling logIn() opens a Facebook authentication screen in a new window.
const user = await app.logIn(credentials);

// The app.logIn() promise will not resolve until you call `Realm.handleAuthRedirect()`
// from the new window after the user has successfully authenticated.
console.log(`Logged in with id: ${user.id}`);
