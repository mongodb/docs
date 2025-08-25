import * as Realm from "realm-web";
import { APP_ID } from "../realm.config.json";

test("Initialize Realm Client", () => {
  // :snippet-start: define-app-id
  const id = APP_ID; // replace this with your App ID
  // :snippet-end:
  // :snippet-start: config-init-app
  const config = {
    id,
  };
  const app = new Realm.App(config);
  // :snippet-end:
  function accessApp(APP_ID) {
    // :snippet-start: access-app
    const app = Realm.App.getApp(APP_ID); // replace this with your App ID
    // :snippet-end:
    return app;
  }
  const accessedApp = accessApp(APP_ID);
  expect(app.id).toBe(APP_ID);
  expect(app.id).toBe(accessedApp.id);
});
