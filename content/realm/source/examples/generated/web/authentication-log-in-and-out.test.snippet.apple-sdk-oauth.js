// Get the ID token from the Apple SDK
const { id_token } = await AppleID.auth.signIn();

// Define credentials with the ID token from the Apple SDK
const credentials = Realm.Credentials.apple(id_token);

// Log the user in to your app
const user = await app.logIn(credentials);
