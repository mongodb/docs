import * as Realm from "realm-web";
import { getIdToken } from "firebase/auth";
import { APP_ID } from "../realm.config.json";

const app = new Realm.App({ id: APP_ID });
jest.setTimeout(15000);
describe("Log in user", () => {
  const userPass = {
    email: "joe.jasper@example.com",
    password: "passw0rd",
  };
  beforeAll(async () => {
    await app.emailPasswordAuth.registerUser(userPass);
  });
  afterAll(async () => {
    if (app.currentUser) {
      await app.deleteUser(app.currentUser);
      await app.currentUser.logOut(app.currentUser);
    }
  });
  test("Anonymous log in", async () => {
    // :snippet-start: anon-auth
    async function loginAnonymous() {
      // Create an anonymous credential
      const credentials = Realm.Credentials.anonymous();

      // Authenticate the user
      const user = await app.logIn(credentials);
      // `App.currentUser` updates to match the logged in user
      console.assert(user.id === app.currentUser.id);

      return user;
    }
    const user = await loginAnonymous();
    // :snippet-end:
    expect(app.currentUser.isLoggedIn).toBe(true);
    expect(app.currentUser?.id).toBe(user.id);
  });
  test("Email/password user", async () => {
    // :snippet-start: email-password-auth
    async function loginEmailPassword(email, password) {
      // Create an email/password credential
      const credentials = Realm.Credentials.emailPassword(email, password);

      // Authenticate the user
      const user = await app.logIn(credentials);
      // `App.currentUser` updates to match the logged in user
      console.assert(user.id === app.currentUser.id);

      return user;
    }

    const user = await loginEmailPassword("joe.jasper@example.com", "passw0rd");
    // :snippet-end:
    expect(app.currentUser.isLoggedIn).toBe(true);
    expect(app.currentUser?.id).toBe(user.id);
  });
  test("API key", async () => {
    const baseUser = await app.logIn(
      Realm.Credentials.emailPassword("joe.jasper@example.com", "passw0rd")
    );
    const now = new Date();
    const nonce = now.getTime();
    const REALM_API_KEY = await baseUser.apiKeys.create("myKey" + nonce);
    // :snippet-start: api-key-auth
    async function loginApiKey(apiKey) {
      // Create an API Key credential
      const credentials = Realm.Credentials.apiKey(apiKey);

      // Authenticate the user
      const user = await app.logIn(credentials);

      // `App.currentUser` updates to match the logged in user
      console.assert(user.id === app.currentUser.id);

      return user;
    }

    const user = await loginApiKey(REALM_API_KEY.key); // add previously generated API key
    // :snippet-end:
    expect(app.currentUser.isLoggedIn).toBe(true);
    expect(app.currentUser?.id).toBe(user.id);
  });
  test.skip("Custom function", async () => {
    // :snippet-start: custom-function-auth
    async function loginCustomFunction(payload) {
      // Create a Custom Function credential
      const credentials = Realm.Credentials.function(payload);

      // Authenticate the user
      const user = await app.logIn(credentials);
      // `App.currentUser` updates to match the logged in user
      console.assert(user.id === app.currentUser.id);

      return user;
    }
    const user = await loginCustomFunction({ username: "ilovemongodb" });
    // :snippet-end:
  });
  // TODO
  test.skip("Custom JWT", async () => {
    // :snippet-start: custom-jwt
    async function loginCustomJwt(jwt) {
      // Create a Custom JWT credential
      const credentials = Realm.Credentials.jwt(jwt);

      // Authenticate the user
      const user = await app.logIn(credentials);
      // `App.currentUser` updates to match the logged in user
      console.assert(user.id === app.currentUser.id);

      return user;
    }
    const user = await loginCustomJwt("eyJ0eXAi...Q3NJmnU8oP3YkZ8");
    // :snippet-end:
  });
  test.skip("Firebase with Custom JWT", async () => {
    const realmApp = app;
    const firebaseUser = {};
    // :NOT-snippet-start: custom-jwt-firebase
    // ... log user into Firebase & initialize Realm app

    // Using modular Firebase Web v9 SDK method auth.getIdToken()
    // See Firebase docs - https://firebase.google.com/docs/reference/js/auth#getidtoken
    const token = await getIdToken(firebaseUser);
    const credentials = Realm.Credentials.jwt(token);
    const realmUser = await realmApp.logIn(credentials);
    // :NOT-snippet-end:
  });
  describe.skip("Facebook OAuth", () => {
    test("Built-in Facebook OAuth", async () => {
      // :snippet-start: builtin-facebook-oauth
      // The redirect URI should be on the same domain as this app and
      // specified in the auth provider configuration.
      const redirectUri = "https://app.example.com/handleOAuthLogin";
      const credentials = Realm.Credentials.facebook(redirectUri);

      // Calling logIn() opens a Facebook authentication screen in a new window.
      const user = await app.logIn(credentials);

      // The app.logIn() promise will not resolve until you call `Realm.handleAuthRedirect()`
      // from the new window after the user has successfully authenticated.
      console.log(`Logged in with id: ${user.id}`);
      // :snippet-end:

      // :snippet-start: builtin-facebook-oauth-redirect
      // When the user is redirected back to your app, handle the redirect to
      // save the user's access token and close the redirect window. This
      // returns focus to the original application window and automatically
      // logs the user in.
      Realm.handleAuthRedirect();
      // :snippet-end:
    });
    test("Facebook SDK OAuth", async () => {
      // :snippet-start: facebook-sdk-oauth
      // Get the access token from the Facebook SDK
      const { accessToken } = FB.getAuthResponse();
      // Define credentials with the access token from the Facebook SDK
      const credentials = Realm.Credentials.facebook(accessToken);
      // Log the user in to your app
      await app.logIn(credentials);
      // :snippet-end:
    });
  });
  // NOTE: no snippets for this b/c have full HTML examples on the page
  describe.skip("Google OAuth", () => {
    test("Built-in Google OAuth", () => {
      // :NOT-snippet-start: builtin-google-oauth
      // TODO: add abstracted example
      // :NOT-snippet-end:
    });
    test("Google Onetap OAuth", () => {
      // :NOT-snippet-start: google-onetap-oauth
      // TODO: Add abstracted example
      // :NOT-snippet-end:
    });
  });
  describe.skip("Apple OAuth", () => {
    test("Built-in Apple OAuth", () => {
      // :snippet-start: builtin-apple-oauth
      // The redirect URI should be on the same domain as this app and
      // specified in the auth provider configuration.
      const redirectUri = "https://app.example.com/handleOAuthLogin";
      const credentials = Realm.Credentials.apple(redirectUri);

      // Calling logIn() opens an Apple authentication screen in a new window.
      const user = app.logIn(credentials);

      // The logIn() promise will not resolve until you call `Realm.handleAuthRedirect()`
      // from the new window after the user has successfully authenticated.
      console.log(`Logged in with id: ${user.id}`);
      // :snippet-end:

      // :snippet-start: builtin-apple-oath-handle-redirect
      // When the user is redirected back to your app, handle the redirect to
      // save the user's access token and close the redirect window. This
      // returns focus to the original application window and automatically
      // logs the user in.
      Realm.handleAuthRedirect();
      // :snippet-end:
    });
    test("Apple SDK OAuth", async () => {
      // :snippet-start: apple-sdk-oauth
      // Get the ID token from the Apple SDK
      const { id_token } = await AppleID.auth.signIn();

      // Define credentials with the ID token from the Apple SDK
      const credentials = Realm.Credentials.apple(id_token);

      // Log the user in to your app
      const user = await app.logIn(credentials);
      // :snippet-end:
    });
  });
});
describe("Log out user", () => {
  beforeEach(async () => {
    await app.emailPasswordAuth.registerUser({
      email: "hank.williams@example.com",
      password: "passw0rd",
    });
  });
  afterEach(async () => {
    const currentUser = await app.logIn(
      Realm.Credentials.emailPassword("hank.williams@example.com", "passw0rd")
    );
    await app.deleteUser(app.currentUser);
    await currentUser?.logOut();
  });
  test("Log out current user", async () => {
    const credentials = Realm.Credentials.emailPassword(
      "hank.williams@example.com",
      "passw0rd"
    );
    const user = await app.logIn(credentials);
    expect(user.isLoggedIn).toBe(true);
    // :snippet-start: log-out-current-user
    await app.currentUser.logOut();
    // :snippet-end:
    expect(user.isLoggedIn).toBe(false);
    expect(app.currentUser).toBe(null);
  });
  test("Log out specific user", async () => {
    await app.logIn(
      Realm.Credentials.emailPassword("hank.williams@example.com", "passw0rd")
    );
    // :snippet-start: log-out-specific-user
    const userId = app.currentUser.id;
    await app.allUsers[userId].logOut();
    // :snippet-end:
  });
});
