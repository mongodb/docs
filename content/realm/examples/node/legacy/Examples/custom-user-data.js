import Realm, { BSON } from "realm";

const app = new Realm.App({ id: "example-testers-kvjdy" });

describe("user custom data", () => {
  test("email/password login", async () => {
    const randomInt = Math.floor(Math.random() * Math.floor(200000));
    const username = "test" + randomInt.toString() + "@example.com";

    await app.emailPasswordAuth.registerUser({
      email: username,
      password: "passw0rd",
    });

    const credentials = Realm.Credentials.emailPassword(
      username,
      "passw0rd"
    );

    try {
      const user = await app.logIn(credentials);
      expect(user.id).toBe(app.currentUser.id);
      console.log("Successfully logged in!", user.id);
      return user;
    } catch (err) {
      console.log("Failed to log in", err.message);
    }
  });

  test("associate existing custom user data with new user", async () => {
    const user = app.currentUser;
    const mongo = user.mongoClient("mongodb-atlas");
    const collection = mongo.db("custom-user-data-database").collection("custom-user-data");

    // This specific custom user data document is persistent and not cleaned
    // up by other tests.
    const filter = { _id: BSON.ObjectId("63c1b6ed977bcf8bccc74f66") };
    const update = { $set: { userId: user.id }};
    const result = await collection.updateOne(filter, update);

    const updatedDocument = await collection.findOne(filter);

    expect(updatedDocument.userId).toBe(user.id);

    await user.refreshCustomData();
  });

  test("read custom user data", async () => {
    // :snippet-start: read-custom-user-data
    const customUserData = app.currentUser.customData;
    console.log(customUserData);
    // :snippet-end:
    expect(customUserData.favoriteColor).toBe("blue");
  });
  
  test("write custom user data", async () => {
    // :snippet-start: write-custom-user-data
    // A user must be logged in to use a mongoClient
    const user = app.currentUser;
    const mongo = user.mongoClient("mongodb-atlas");
    const collection = mongo.db("custom-user-data-database").collection("custom-user-data");
    
    // Query for the user object of the logged in user
    const filter = { userId: user.id};
    // Set the logged in user's favorite color to pink
    const update = { $set: { favoriteColor: "pink" }};
    // Insert document if it doesn't already exist
    const options = { upsert: true };

    const result = await collection.updateOne(filter, update, options);
    // :snippet-end:

    // :snippet-start: refresh-custom-user-data
    const updatedCustomUserData = await user.refreshCustomData();
    console.log(updatedCustomUserData);
    // :snippet-end:
    expect(updatedCustomUserData.favoriteColor).toBe("pink");
    
    // Reset `favoriteColor` to "blue" so that the test works properly when
    // run again.
    const resetUpdate = { $set: { favoriteColor: "blue" }};
    await collection.updateOne(filter, resetUpdate);
    await user.refreshCustomData();
  });

  test("Delete user", async () => {
    const uid = app.currentUser.id;
    const preDeleteMatchesLen = Object.keys(app.allUsers).filter(
      (id) => id === uid
    ).length;
    expect(preDeleteMatchesLen).toBe(1);
    await app.deleteUser(app.currentUser);
    const postDeleteMatchesLen = Object.keys(app.allUsers).filter(
      (id) => id === uid
    ).length;
    expect(postDeleteMatchesLen).toBe(0);
  });
});
