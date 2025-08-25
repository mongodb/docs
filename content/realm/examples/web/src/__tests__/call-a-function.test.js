import * as Realm from "realm-web";
import { APP_ID } from "../realm.config.json";

describe("Realm Functions", () => {
  // NOTE: to have the tests pass, your realm app must have the sum function
  // having it here is just for extracting the code example, this doesn't do anything.
  // :snippet-start: function
  // sum: adds two numbers
  exports = function (a, b) {
    return a + b;
  };
  // :snippet-end:
  let user, app;
  beforeAll(async () => {
    app = new Realm.App(APP_ID);
    const credentials = Realm.Credentials.anonymous();
    user = await app.logIn(credentials);
  });
  afterAll(async () => {
    await app.currentUser.logOut();
  });

  test("Call a Realm Function", async () => {
    // :snippet-start: call-function
    const result = await user.functions.sum(2, 3);
    // :snippet-end:
    expect(result).toBe(5);
  });

  test("Call a Realm Function Programmatically", async () => {
    // :snippet-start: call-function-programmatically
    const functionName = "sum";
    const args = [2, 3];
    const result = await user.callFunction(functionName, ...args);
    // :snippet-end:
    expect(result).toBe(5);
  });
});
