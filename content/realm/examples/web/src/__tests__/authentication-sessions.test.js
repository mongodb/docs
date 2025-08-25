import * as Realm from "realm-web";
import { APP_ID } from "../realm.config.json";

const app = new Realm.App({ id: APP_ID });

describe("Manage User Sessions", () => {
  beforeAll(async () => {
    const credentials = {
      email: "tony@example.com",
      password: "badabing!",
    };
    try {
      await app.emailPasswordAuth.registerUser(credentials);
    } catch (err) {
      console.error(err);
    }
    await app.logIn(
      Realm.Credentials.emailPassword(credentials.email, credentials.password)
    );
  });
  afterAll(async () => {
    await app.deleteUser(app.currentUser);
  });
  test("Get a User Access Token", async () => {
    // :snippet-start: get-user-access-token
    // Gets a valid user access token to authenticate requests
    async function getValidAccessToken(user) {
      // An already logged in user's access token might be stale. To
      // guarantee that the token is valid, refresh it if necessary.
      await user.refreshAccessToken();
      return user.accessToken;
    }
    // :snippet-end:
    const token = await getValidAccessToken(app.currentUser);
    expect(token).not.toBe(undefined);
  });
});
