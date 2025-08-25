// on app start without registration
final anonymousUser = await app.logIn(Credentials.anonymous());

// ... user interacts with app

//... user decides to sign up for app with email/password auth
final authProvider = EmailPasswordAuthProvider(app);
await authProvider.registerUser(USERNAME, PASSWORD);

// link email/password credentials to anonymous user's credentials
final linkedCredentialUser = await anonymousUser
    .linkCredentials(Credentials.emailPassword(USERNAME, PASSWORD));
