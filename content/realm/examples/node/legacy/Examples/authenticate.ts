import Realm from "realm";

// :snippet-start: get-app-instance
// :replace-start: {
//   "terms": {
//     "example-testers-kvjdy": "<yourAppId>"
//   }
// }
const app = Realm.App.getApp("example-testers-kvjdy");
// :replace-end:
// :snippet-end:

const randomInt = Math.floor(Math.random() * Math.floor(200000));
const testUsername = "someone" + randomInt.toString() + "@example.com";
const testPassword = "Pa55w0rd!";

describe("USER AUTHENTICATION", () => {
  afterEach(async () => {
    await app.currentUser?.logOut();
    jest.runAllTimers();
  });

  test("anonymous login", async () => {
    // :snippet-start: anonymous-login
    // Create an anonymous credential
    const credentials = Realm.Credentials.anonymous();
    const user = await app.logIn(credentials);
    // :snippet-end:

    expect(user?.id).not.toBe(undefined);
    expect(app.currentUser?.id).not.toBe(undefined);
    expect(user?.id).toBe(app.currentUser?.id);
  });

  test("email/password login", async () => {
    await app.emailPasswordAuth.registerUser({
      email: testUsername,
      password: testPassword,
    });

    // :snippet-start: email-password-login
    // :replace-start: {
    //    "terms": {
    //       "testUsername": "\"someone@example.com\"",
    //       "testPassword": "\"Pa55w0rd!\""
    //    }
    // }
    // Create an email/password credential
    const credentials = Realm.Credentials.emailPassword(
      testUsername,
      testPassword
    );
    const user = await app.logIn(credentials);
    // :replace-end:
    // :snippet-end:

    expect(user?.id).not.toBe(undefined);
    expect(app.currentUser?.id).not.toBe(undefined);
    expect(user?.id).toBe(app.currentUser?.id);
  });

  test("server api key login", async () => {
    // Need to log in to call App Services function.
    const testCredentials = Realm.Credentials.anonymous();
    const testUser = await app.logIn(testCredentials);
    // Get a dynamically-generated server API key.
    const serverApiKey = (await testUser.callFunction(
      "createServerKey"
    )) as string;

    await testUser.logOut();

    process.env.appServicesApiKey = serverApiKey;

    // :snippet-start: server-api-key-login
    // Get the API key from the local environment.
    const apiKey = process.env?.appServicesApiKey;

    if (!apiKey) {
      throw new Error("Could not find a Server API Key.");
    }

    // Create an api key credential.
    const credentials = Realm.Credentials.apiKey(apiKey);
    const user = await app.logIn(credentials);
    // :snippet-end:

    expect(user?.id).not.toBe(undefined);
    expect(app.currentUser?.id).not.toBe(undefined);
    expect(user?.id).toBe(app.currentUser?.id);
  });

  test("custom function login", async () => {
    // :snippet-start: custom-function-login
    // Create a custom function credential.
    const credentials = Realm.Credentials.function({
      username: "ilovemongodb",
    });
    const user = await app.logIn(credentials);
    // :snippet-end:

    expect(user?.id).not.toBe(undefined);
    expect(app.currentUser?.id).not.toBe(undefined);
    expect(user?.id).toBe(app.currentUser?.id);
  });

  test("custom jwt login", async () => {
    const authenticateWithExternalSystem = async () => {
      // Simulates returning the following JWT information from an external auth service
      // JWT: {
      //   header: {
      //     "alg": "HS256",
      //     "typ": "JWT",
      //   },
      //   payload: {
      //     "aud": "example-testers-kvjdy",
      //     "sub": "example-user",
      //     "exp": 1918062398,
      //     "name": "Joe Jasper",
      //   },
      //   secret: "E7DE0D13D66BF64EC9A9A74A3D600E840D39B4C12832D380E48ECE02070865AB"
      // }
      //
      return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJleGFtcGxlLXRlc3RlcnMta3ZqZHkiLCJzdWIiOiJleGFtcGxlLXVzZXIiLCJuYW1lIjoiSm9lIEphc3BlciIsImV4cCI6MTkxODA2MjM5OH0.3wR1cJN4zlbbDh7IaYyDX0fasNEW3grJCdv_7lQFnPI";
    };
    // :snippet-start: custom-jwt-login
    // Create a custom jwt credential.
    const jwt = await authenticateWithExternalSystem();
    const credentials = Realm.Credentials.jwt(jwt);
    const user = await app.logIn(credentials);
    // :snippet-end:

    expect(user?.id).not.toBe(undefined);
    expect(app.currentUser?.id).not.toBe(undefined);
    expect(user?.id).toBe(app.currentUser?.id);
  });
});

describe("USER SESSIONS", () => {
  afterEach(async () => {
    await app.currentUser?.logOut();
    jest.runAllTimers();
  });

  test("Get a User Access Token", async () => {
    const email = "someone@example.com";
    const password = "pa55w0rd!";

    try {
      await app.logIn(Realm.Credentials.emailPassword(email, password));
    } catch (error) {
      await app.emailPasswordAuth.registerUser({ email, password });
      await app.logIn(Realm.Credentials.emailPassword(email, password));
    }

    // :snippet-start: get-user-access-token
    // Gets a valid user access token to authenticate requests
    async function getValidAccessToken(user: Realm.User) {
      // An already logged in user's access token might be stale. To
      // guarantee that the token is valid, refresh it if necessary.
      await user.refreshCustomData();

      return user.accessToken;
    }
    // :snippet-end:

    const token = await getValidAccessToken(app.currentUser!);

    expect(token).not.toBe(undefined);
  });
});
