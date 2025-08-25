final googleIdTokenCredentials = Credentials.googleIdToken(idToken);
final currentUser = await app.logIn(googleIdTokenCredentials);
