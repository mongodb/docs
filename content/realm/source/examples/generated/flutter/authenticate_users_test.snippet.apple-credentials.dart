final appleCredentials = Credentials.apple(idToken);
final currentUser = await app.logIn(appleCredentials);
