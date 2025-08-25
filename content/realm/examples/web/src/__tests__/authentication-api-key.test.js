import * as Realm from "realm-web";
import { APP_ID } from "../realm.config.json";

const app = new Realm.App({ id: APP_ID });

describe("API key auth", () => {
  beforeAll(async () => {
    await app.emailPasswordAuth.registerUser({
      email: "hom3r@simpsonfamily.com",
      password: "doh123!",
    });
    await app.logIn(
      Realm.Credentials.emailPassword("hom3r@simpsonfamily.com", "doh123!")
    );
  });
  afterAll(async () => {
    await app.deleteUser(app.currentUser);
  });
  test("Create API key", async () => {
    // :snippet-start: create-api-key
    const user = app.currentUser;
    const key = await user.apiKeys.create("myApiKey");
    // :snippet-end:
    expect(key.name).toBe("myApiKey");
    expect(key.disabled).toBe(false);
  });
  test("Look up API key", async () => {
    await app.currentUser.apiKeys.create("anotherApiKey");
    // :snippet-start: look-up-api-key
    const user = app.currentUser;
    // List all of a user's keys
    const keys = await user.apiKeys.fetchAll();
    const API_KEY_ID = keys[0]._id; // :remove:
    // Get a specific key by its ID
    const key = await user.apiKeys.fetch(API_KEY_ID);
    // :snippet-end:
    expect(Array.isArray(keys)).toBe(true);
    expect(keys.length >= 1).toBeTruthy();
    expect(key._id).toBe(API_KEY_ID);
  });
  test("Enable/Disable API key", async () => {
    await app.currentUser.apiKeys.create("yetAnotherApiKey");
    // :snippet-start: enable-disable-api-key
    // Get the ID of a User API Key
    const user = app.currentUser;
    const apiKeys = await user.apiKeys.fetchAll();
    const keyId = apiKeys[0]["_id"];

    // Enable the User API Key
    await user.apiKeys.enable(keyId);
    // :remove-start:
    const enabledKey = await user.apiKeys.fetch(keyId);
    expect(enabledKey.disabled).toBe(false);
    // :remove-end:
    // Disable the User API Key
    await user.apiKeys.disable(keyId);
    // :snippet-end:
    const disabledKey = await user.apiKeys.fetch(keyId);
    expect(disabledKey.disabled).toBe(true);
    await user.apiKeys.enable(keyId);
    const reenabledKey = await user.apiKeys.fetch(keyId);
    expect(reenabledKey.disabled).toBe(false);
  });

  test("Delete an API key", async () => {
    const keyToDelete = await app.currentUser.apiKeys.create("apiKeyToDelete");
    // :snippet-start: delete-api-key
    // Get the ID of a User API Key
    const user = app.currentUser;
    const apiKeys = await user.apiKeys.fetchAll();
    const keyId = apiKeys.find((key) => key.name === "apiKeyToDelete")._id;
    expect(keyToDelete._id).toBe(keyId); // :remove:

    // Delete the User API Key
    await user.apiKeys.delete(keyId);
    // :snippet-end:
    const keysPostDelete = await user.apiKeys.fetchAll();
    expect(keysPostDelete.find((key) => keyId === key._id)).toBe(undefined);
  });
});
