async function linkAccounts(user, email, password) {
  const emailPasswordUserCredentials = Realm.Credentials.emailPassword(
    email,
    password
  );
  await user.linkCredentials(emailPasswordUserCredentials);
  return user;
}
