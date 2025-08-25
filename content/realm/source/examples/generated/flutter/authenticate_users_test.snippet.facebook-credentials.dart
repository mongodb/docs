final facebookCredentials = Credentials.facebook(accessToken);
final currentUser = await app.logIn(facebookCredentials);
