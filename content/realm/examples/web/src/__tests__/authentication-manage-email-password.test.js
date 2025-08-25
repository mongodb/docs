import * as Realm from "realm-web";
import { APP_ID } from "../realm.config.json";

const app = new Realm.App({ id: APP_ID });

describe("Manage email/password users", () => {
  beforeEach(async () => {
    if (app.currentUser) {
      await app.deleteUser(app.currentUser);
      await app.currentUser?.logOut();
    }
  });
  afterEach(async () => {
    if (app.currentUser) {
      await app.deleteUser(app.currentUser);
      await app.currentUser?.logOut();
    }
  });
  test("Register new user", async () => {
    // :snippet-start: register-new-user
    const email = "someone@example.com";
    const password = "Pa55w0rd!";
    await app.emailPasswordAuth.registerUser({ email, password });
    // :snippet-end:
    const user = await app.logIn(
      Realm.Credentials.emailPassword(email, password)
    );
  });
  test.skip("Confirm new user email address", async () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const tokenId = params.get("tokenId");
    // :snippet-start: confirm-new-email
    await app.emailPasswordAuth.confirmUser({ token, tokenId });
    // :snippet-end:
  });
  describe.skip("Retry user confirmation methods", () => {
    test("Resend a confirmation email", async () => {
      // :snippet-start: resend-confirmation-email
      const email = "someone@example.com"; // The user's email address
      await app.emailPasswordAuth.resendConfirmationEmail({ email });
      // :snippet-end:
    });
    test("Retry a user confirmation function", async () => {
      // :snippet-start: retry-user-confirmation-function
      const email = "someone@example.com"; // The user's email address
      await app.emailPasswordAuth.retryCustomConfirmation({ email });
      // :snippet-end:
    });
  });
  describe.skip("Reset user password", () => {
    test("Send a password reset email", async () => {
      // :snippet-start: send-password-reset-email
      // The user's email address
      const email = "joe.jasper@example.com";
      await app.emailPasswordAuth.sendResetPasswordEmail({ email });
      // :snippet-end:
    });
    test("Call a password reset function", async () => {
      // :snippet-start: call-password-reset-function
      // The user's email address
      const email = "joe.jasper@example.com";
      // The new password to use
      const password = "newPassw0rd";
      // Additional arguments for the reset function
      const args = [];

      await app.emailPasswordAuth.callResetPasswordFunction(
        { email, password },
        ...args
      );
      // :snippet-end:
    });
    test("Complete a password reset", async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      const tokenId = params.get("tokenId");
      // :snippet-start: complete-password-reset
      await app.emailPasswordAuth.resetPassword({
        password: "newPassw0rd",
        token,
        tokenId,
      });
      // :snippet-end:
    });
    test("Get the Token and TokenID", () => {
      // :snippet-start: get-token-tokenid
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      const tokenId = params.get("tokenId");
      if (!token || !tokenId) {
        throw new Error(
          "You can only call resetPassword() if the user followed a confirmation email link"
        );
      }
      // :snippet-end:
    });
  });
});
