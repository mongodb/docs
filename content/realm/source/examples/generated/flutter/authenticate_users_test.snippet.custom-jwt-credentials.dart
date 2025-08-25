final token = await authenticateWithExternalSystem();
final jwtCredentials = Credentials.jwt(token);
final currentUser = await app.logIn(jwtCredentials);
