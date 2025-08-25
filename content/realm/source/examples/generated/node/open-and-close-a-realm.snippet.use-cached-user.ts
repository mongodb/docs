// Log user into your App Services App.
// On first login, the user must have a network connection.
const getUser = async () => {
  // If the device has no cached user credentials, log in.
  if (!app.currentUser) {
    const credentials = Realm.Credentials.anonymous();
    await app.logIn(credentials);
  }

  // If the app is offline, but credentials are
  // cached, return existing user.
  return app.currentUser!;
};
