// Get Google token and use it to sign into Realm
oauth2Client.getToken(authCodeFromQueryString, async function (
  error,
  token
) {
  if (error) return errorHandler(error);
  try {
    const credential = Realm.Credentials.google({
      idToken: token.id_token,
    });
    const user = await realmApp.logIn(credential);
    console.log("signed in as Realm user", user.id);
  } catch (error) {
    errorHandler(error);
  }
});
