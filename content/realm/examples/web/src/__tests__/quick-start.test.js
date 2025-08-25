// :snippet-start: import-realm
import * as Realm from "realm-web";
// :snippet-end:
import { APP_ID } from "../realm.config.json";

test("Initialize Realm app", () => {
  // :snippet-start: initialize-realm-app
  // Add your App ID
  const app = new Realm.App({ id: APP_ID });
  // :snippet-end:
  expect(app.id).toBe(APP_ID);
});

describe("test Realm Web SDK quickstart page", () => {
  let app;
  let user;
  beforeAll(() => {
    app = new Realm.App({ id: APP_ID });
  });
  afterEach(async () => {
    await user?.logOut();
  });
  test("Authenticate user", async () => {
    // :snippet-start: authenticate-user
    // Create an anonymous credential
    const credentials = Realm.Credentials.anonymous();

    // Authenticate the user
    // :uncomment-start:
    // const user = await app.logIn(credentials);
    // :uncomment-end:
    user = await app.logIn(credentials); // :remove:
    // `App.currentUser` updates to match the logged in user
    console.assert(user.id === app.currentUser.id);

    // :snippet-end:

    expect(user.id).toBe(app.currentUser.id);
  });
  // skipping test b/c it's a fairly trivial example and won't work if there isn't
  // the sum function on the Realm BaaS server
  test.skip("call a function", async () => {
    const credentials = Realm.Credentials.anonymous();
    user = await app.logIn(credentials);
    // :snippet-start: call-a-function
    const summed = await user.functions.sum(2, 3);
    console.assert(summed === 5);
    // :snippet-end:
    expect(summed).toBe(5);
  });
});
