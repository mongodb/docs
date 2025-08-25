import Realm, { BSON } from "realm";

describe("Test core Realm logger", () => {
  class Turtle extends Realm.Object {
    static schema = {
      name: "Turtle",
      properties: {
        _id: "objectId",
        name: "string",
        birthday: "string?",
      },
      primaryKey: "_id",
    };
  }

  const newTestObject = () => {
    return { _id: new BSON.ObjectId(), name: "Myrtle" };
  };

  beforeAll(async () => {
    // Close and remove all realms in the default directory.
    Realm.clearTestState();
  });

  test("Set a custom logger", async () => {
    // :snippet-start: set-custom-logger
    let logs = [];

    Realm.setLogger((level, message) => {
      logs.push({ level, message });
    });
    // :snippet-end:

    Realm.setLogLevel("all");

    const realm = await Realm.open({
      schema: [Turtle],
    });

    realm.write(() => realm.create(Turtle, newTestObject()));

    expect(logs).not.toHaveLength(0);
    expect(logs.map((l) => l.level)).toContain("trace" && "debug");

    //This will also disable the logger again after the test
    Realm.setLogLevel("off");
  });
});
