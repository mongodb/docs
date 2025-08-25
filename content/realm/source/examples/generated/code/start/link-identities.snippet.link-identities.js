async function linkAccounts(user, email, password) {
  const emailPasswordUserCredentials = Realm.Credentials.emailPassword(
    email,
    password
  );
  const linkedAccount = await user.linkCredentials(
    emailPasswordUserCredentials
  );
  return linkedAccount;
}