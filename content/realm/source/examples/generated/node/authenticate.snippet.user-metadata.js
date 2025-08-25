try {
  await app.logIn(
    Realm.Credentials.emailPassword("someone@example.com", "Pa55w0rd!")
  );
} catch (error) {
  await app.emailPasswordAuth.registerUser({ "someone@example.com", "Pa55w0rd!" });
  await app.logIn(
    Realm.Credentials.emailPassword("someone@example.com", "Pa55w0rd!")
  );
}

const userEmail = app.currentUser.profile.email;
