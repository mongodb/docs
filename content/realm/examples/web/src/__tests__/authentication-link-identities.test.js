import * as Realm from "realm-web";
import { APP_ID } from "../realm.config.json";

const app = new Realm.App({ id: APP_ID });

describe("Link user identities", () => {
  beforeAll(async () => {
    try {
      await app.emailPasswordAuth.registerUser({
        email: "hom3r@simpsonfamily.com",
        password: "doh123!",
      });
    } catch (err) {
      console.error(err);
    }
  });
  afterAll(async () => {
    await app.deleteUser(app.currentUser);
  });
  // Skipping this test, which started failing with realm-web v2.0.1 with the
  // error: "Request failed (POST): linking forbidden without first specifying allowed
  // request origins (status 403 Forbidden)"
  test.skip("Link Accounts", async () => {
    // :snippet-start: link-accounts
    async function linkAccounts(user, email, password) {
      const emailPasswordUserCredentials = Realm.Credentials.emailPassword(
        email,
        password
      );
      await user.linkCredentials(emailPasswordUserCredentials);
      return user;
    }
    // :snippet-end:
    const anonymousCredentials = Realm.Credentials.anonymous();
    await app.logIn(anonymousCredentials);
    await linkAccounts(app.currentUser, "hom3r@simpsonfamily.com", "doh123!");
    const userProfiles = app.currentUser._profile.identities;
    expect(app.currentUser.isLoggedIn).toBe(true);
    const hasAnonProfile = userProfiles.find(
      ({ providerType }) => providerType === "anon-user"
    );
    expect(hasAnonProfile).not.toBe(undefined);
    const hasUserPass = userProfiles.find(
      ({ providerType }) => providerType === "local-userpass"
    );
    expect(hasUserPass).not.toBe(undefined);
  });
});
