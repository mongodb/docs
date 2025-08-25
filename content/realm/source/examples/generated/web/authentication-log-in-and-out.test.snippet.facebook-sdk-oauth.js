// Get the access token from the Facebook SDK
const { accessToken } = FB.getAuthResponse();
// Define credentials with the access token from the Facebook SDK
const credentials = Realm.Credentials.facebook(accessToken);
// Log the user in to your app
await app.logIn(credentials);
