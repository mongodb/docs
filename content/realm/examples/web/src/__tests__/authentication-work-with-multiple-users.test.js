import * as Realm from "realm-web";
import { APP_ID } from "../realm.config.json";

const app = new Realm.App({ id: APP_ID });

jest.setTimeout(15000);
describe("Work with multiple users", () => {
  afterAll(async () => {
    try {
      const userIds = [...Object.keys(app.allUsers)];

      for await (const userId of userIds) {
        console.log("deleting ID", userId);
        console.log(app.allUsers[userId]._profile.identities);
        await app.deleteUser(app.allUsers[userId]);
      }
    } catch (err) {
      console.error(err);
    }
  });

  test("Add new user to device", async () => {
    // delete the users if they already exist
    try {
      const joe = await app.logIn(
        Realm.Credentials.emailPassword("joe@example.com", "passw0rd")
      );
      await app.deleteUser(joe);
    } catch (err) {
      console.log("deleted Joe");
    }
    try {
      const emma = await app.logIn(
        Realm.Credentials.emailPassword("emma@example.com", "passw0rd")
      );
      await app.deleteUser(emma);
    } catch (err) {
      console.log("deleted Joe");
    }

    // :snippet-start: add-new-user
    // Register Joe
    const joeEmail = "joe@example.com";
    const joePassword = "passw0rd";
    await app.emailPasswordAuth.registerUser({
      email: joeEmail,
      password: joePassword,
    });
    // Log in as Joe
    const joeCredentials = Realm.Credentials.emailPassword(
      joeEmail,
      joePassword
    );
    const joe = await app.logIn(joeCredentials);
    // The active user is now Joe
    console.assert(joe.id === app.currentUser.id);
    expect(joe.id).toBe(app.currentUser.id); // :remove:

    // Register Emma
    const emmaEmail = "emma@example.com";
    const emmaPassword = "passw0rd";
    await app.emailPasswordAuth.registerUser({
      email: emmaEmail,
      password: emmaPassword,
    });
    // Log in as Emma
    const emmaCredentials = Realm.Credentials.emailPassword(
      emmaEmail,
      emmaPassword
    );
    const emma = await app.logIn(emmaCredentials);
    // The active user is now Emma, but Joe is still logged in
    console.assert(emma.id === app.currentUser.id);
    // :snippet-end:
    expect(emma.id).toBe(app.currentUser.id);
  });
  test("List all on device users", async () => {
    const emmaCredentials = Realm.Credentials.anonymous();
    const emma = await app.logIn(emmaCredentials);
    // :snippet-start: list-all-on-device-users
    // Get an object with all Users, where the keys are the User IDs
    for (const userId in app.allUsers) {
      const user = app.allUsers[userId];
      console.log(
        `User with id ${user.id} is ${
          user.isLoggedIn ? "logged in" : "logged out"
        }`
      );
    }
    // :snippet-end:
    expect(app.allUsers && app.allUsers.constructor === Object).toBe(true);
    expect(app.currentUser.id).toBe(emma.id);
  });
  test("Switch the active user", async () => {
    const newUser1 = await app.logIn(Realm.Credentials.anonymous());
    const newUser2 = await app.logIn(Realm.Credentials.anonymous());
    // :snippet-start:switch-active-user
    // Get some logged-in users
    const authenticatedUsers = Object.values(app.allUsers).filter(
      (user) => user.isLoggedIn
    );
    const user1 = authenticatedUsers[0];
    const user2 = authenticatedUsers[1];

    // Switch to user1
    app.switchUser(user1);
    // The active user is now user1
    console.assert(app.currentUser.id === user1.id);
    expect(app.currentUser.id).toBe(user1.id); // :remove:
    // Switch to user2
    app.switchUser(user2);
    // The active user is now user2
    console.assert(app.currentUser.id === user2.id);
    // :snippet-end:
    expect(app.currentUser.id).toBe(user2.id);
  });
  test("Remove a user from the device", async () => {
    await app.logIn(Realm.Credentials.anonymous());
    // :snippet-start: remove-user-from-device
    // Remove the current user from the device
    const user = app.currentUser;
    const userId = app.currentUser.id; // :remove:
    await app.removeUser(user);

    // The user is no longer the active user
    if (app.currentUser) {
      // The active user is now the logged in user (if there still is one) that was
      // most recently active
      console.assert(user.id !== app.currentUser.id);
    }

    // The user is no longer on the device
    console.assert(
      Object.values(app.allUsers).find(({ id }) => id === user.id) === undefined
    );
    // :snippet-end:
    expect(app.currentUser?.id).not.toBe(userId);
    expect(Object.values(app.allUsers).find(({ id }) => id === user.id)).toBe(
      undefined
    );
  });
});
