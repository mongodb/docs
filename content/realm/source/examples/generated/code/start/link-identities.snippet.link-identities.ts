async function linkAccounts(
  user: Realm.User,
  email: string,
  password: string
) {
  const emailPasswordUserCredentials = Realm.Credentials.emailPassword(
    email,
    password
  );
  const linkedAccount = await user.linkCredentials(
    emailPasswordUserCredentials
  );
  return linkedAccount;
}