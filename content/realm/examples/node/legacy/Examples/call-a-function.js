import Realm from "realm";

const appId = "example-testers-kvjdy"; // Set your Realm app ID here.
const appConfig = {
  id: appId,
  timeout: 10000,
};

describe("Call a Function", () => {
  test("should call a function by it's name", async () => {
    const app = new Realm.App(appConfig);
    const credentials = Realm.Credentials.anonymous();
    const user = await app.logIn(credentials);

    // :snippet-start: call-a-function-by-name
    // wrap the code below in an async function to 'await' for the promises to resolve
    const numA = 2;
    const numB = 3;
    const result = await user.functions.sum(numA, numB);
    const resultOfCallFunction = await user.callFunction("sum", numA, numB); // alternate syntax to call a MongoDB Realm Function
    console.log(
      `Using the "functions.sum()" method: the sum of ${numA} + ${numB} = ${result}`
    );
    console.log(
      `Using the "callFunction()" method: the sum of ${numA} + ${numB} = ${resultOfCallFunction}`
    );
    // :snippet-end:

    expect(result).toBe(5);
    expect(resultOfCallFunction).toBe(5);
  });
});
