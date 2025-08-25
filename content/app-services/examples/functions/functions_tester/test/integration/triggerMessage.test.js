const { app_id } = require("../../root_config.json");
const Realm = require("realm");
const { BSON } = require("realm");

const app = new Realm.App(app_id);

beforeAll(async () => {
  await app.logIn(Realm.Credentials.anonymous());
});

afterAll(async () => {
  await app.currentUser.logOut();
});

describe("trigger messenger", () => {
  it("writes success to document", async () => {
    // create doc should initiate trigger
    const db = app.currentUser
      .mongoClient("mongodb-atlas")
      .db("triggerExample");
    const collection = db.collection("messages");
    const _id = BSON.ObjectId();
    await collection.insertOne({
      _id,
      needsTriggerResponse: true,
      result: null,
    });

    // Trigger should fire within the next 5 seconds
    for (let attempt = 0; attempt < 10; ++attempt) {
      await sleep(500);
      const document = await collection.findOne({
        _id,
      });
      if (document.result === "approved") {
        break;
      }
    }
    const document = await collection.findOne({
      _id,
    });
    expect(document.result).toBe("approved");
  });
});

jest.setTimeout(20000);

async function sleep(milliseconds) {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}
