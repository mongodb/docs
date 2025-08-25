import * as Realm from "realm-web";
import { EJSON } from "bson";
import { APP_ID } from "../realm.config.json";

const app = new Realm.App({ id: APP_ID });

// TODO: add custom user data tests
describe("Custom User Data", () => {
  const CLUSTER_NAME = "mongodb-atlas";
  const DATABASE_NAME = "custom-user-data-database";
  const COLLECTION_NAME = "custom-user-data";
  beforeAll(async () => {
    try {
      await app.emailPasswordAuth.registerUser({
        email: "hom3r@simpsonfamily.com",
        password: "doh123!",
      });
    } catch (err) {
      console.log("user already exists");
      console.error(err);
    }
    await app.logIn(
      Realm.Credentials.emailPassword("hom3r@simpsonfamily.com", "doh123!")
    );
  });
  afterAll(async () => {
    await getCustomUserDataCollection().deleteOne({
      userId: app.currentUser.id,
    });
    await app.deleteUser(app.currentUser);
  });
  function getCustomUserDataCollection() {
    const mongo = app.currentUser.mongoClient(CLUSTER_NAME);
    const collection = mongo.db(DATABASE_NAME).collection(COLLECTION_NAME);
    return collection;
  }

  test("Read custom user data", () => {
    // :snippet-start: read-custom-user-data
    // Access a logged in user's read-only custom data
    const customData = app.currentUser.customData;
    // :snippet-end:
    expect(customData instanceof Object).toBe(true);
  });
  test("Refresh custom user data", async () => {
    const now = Date.now();
    const cudCollection = getCustomUserDataCollection();
    await cudCollection.updateOne(
      { userId: app.currentUser.id },
      { $set: { userId: app.currentUser.id, nonce: now } },
      { upsert: true }
    );
    await app.currentUser.refreshCustomData();
    const before = EJSON.deserialize(app.currentUser.customData.nonce);
    const later = new Date();
    const nonceLater = later.getTime();
    await cudCollection.updateOne(
      { userId: app.currentUser.id },
      { $set: { userId: app.currentUser.id, nonce: nonceLater } },
      { upsert: true }
    );
    // :snippet-start: refresh-custom-user-data
    // Refresh a user's custom data to make sure we have the latest version
    await app.currentUser.refreshCustomData();
    // :snippet-end:
    const after = EJSON.deserialize(app.currentUser.customData.nonce);
    expect(before < after).toBe(true);
  });
  test("Modify custom user data", async () => {
    const cudCollection = getCustomUserDataCollection();
    cudCollection.updateOne({}, {}, { upsert: true });
    // :snippet-start: modify-custom-user-data
    // Get a client object for your app's custom user data collection
    const mongo = app.currentUser.mongoClient(CLUSTER_NAME);
    const collection = mongo.db(DATABASE_NAME).collection(COLLECTION_NAME);

    // Log the user's favorite color before we change it
    console.log(
      "old favoriteColor: ",
      app.currentUser.customData.favoriteColor
    );
    expect(app.currentUser.customData.favoriteColor).not.toBe("purple"); // :remove:

    // Update the user's custom data document
    await collection.updateOne(
      { userId: app.currentUser.id }, // Query for the user object of the logged in user
      { $set: { favoriteColor: "purple" } } // Set the logged in user's favorite color to purple
    );
    // Refresh the user's local customData property
    await app.currentUser.refreshCustomData();

    // Log the user's new favorite color
    console.log(
      "new favoriteColor: ",
      app.currentUser.customData.favoriteColor
    );
    // :snippet-end:
    expect(app.currentUser.customData.favoriteColor).toBe("purple");
  });
});
