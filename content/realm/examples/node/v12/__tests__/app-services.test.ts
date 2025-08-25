import { App, AppConfiguration } from "realm";
// :snippet-start: import-experimental-baseurl
import "realm/experimental/base-url";
// :snippet-end:

import { Credentials } from "realm";
import { APP_ID, EDGE_APP_ID } from "../config.ts";

interface fetchError {
  code: number;
}

describe("Test changing the baseUrl", () => {
  test("should set a custom baseURL", async () => {
    // :snippet-start: custom-base-url
    const appConfig: AppConfiguration = {
      id: APP_ID,
      baseUrl: "https://example.com",
    };
    const app = new App(appConfig);
    // :snippet-end:

    expect(app.baseUrl).toBe("https://example.com");
  });

  test("should change the baseURL and then revert to the default baseURL", async () => {
    // Note for internal review: I tested this manually running an Edge Server
    // on my machine and it succeeds. Until we get Edge Server running in a CI
    // I can't login to an Edge Server in an automated test, so I can't write
    // automated tests for the full flow.

    try {
      // :snippet-start: change-base-url
      const app = new App(EDGE_APP_ID);
      const originalBaseUrl = app.baseUrl; // :remove:

      await app.updateBaseUrl("http://localhost:80");
      expect(app.baseUrl).toBe("http://localhost:80"); // :remove:

      // ... log in a user and use the app...
      // ... some time later...

      // Reset baseURL to the default: https://services.cloud.mongodb.com
      await app.updateBaseUrl(null);
      // :snippet-end:

      expect(app.baseUrl).toBe(originalBaseUrl);

      const credentials = Credentials.anonymous();
      const user = await app.logIn(credentials);

      expect(user.isLoggedIn).toBe(true);
    } catch (error) {
      const fetchError = error as fetchError;
      expect(fetchError.code).toBe(4000);
    }
  });
});
