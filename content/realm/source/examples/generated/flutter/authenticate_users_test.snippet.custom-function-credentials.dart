final credentials = {
  "username": "someUsername",
};
// payload must be a JSON-encoded string
final payload = jsonEncode(credentials);

final customCredentials = Credentials.function(payload);
final currentUser = await app.logIn(customCredentials);
