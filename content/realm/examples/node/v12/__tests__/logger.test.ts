import Realm, { BSON, ObjectSchema } from "realm";

describe("Test core Realm logger", () => {
  class Turtle extends Realm.Object<Turtle> {
    _id!: BSON.ObjectId;
    name!: string;
    birthday?: string;

    static schema: ObjectSchema = {
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

  test("Set defualt logger log level", async () => {
    /*
    // [No Assertion]
    // Because Jest swallows console logs, these events don't show up
    // in the terminal. Realm doesn't store logs anywhere, so we don't
    // have a way to programmatically test the default logger other than
    // ensure this code runs.
    */

    // :snippet-start: set-log-level
    Realm.setLogLevel("all");
    // :snippet-end:

    const realm = await Realm.open({
      schema: [Turtle],
    });

    realm.write(() => realm.create(Turtle, newTestObject()));

    //This will also disable the logger again after the test
    Realm.setLogLevel("off");
  });

  test("Set a custom logger", async () => {
    // :snippet-start: set-custom-logger
    type Log = {
      message: string;
      level: string;
    };
    let logs: Log[] = [];

    // :remove-start:
    // @ts-ignore this is an outdated API. Test will be updated with new
    // logger API later
    // :remove-end:
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
    logs = [];

    //This will also disable the logger again after the test
    // :snippet-start: disable-logger
    Realm.setLogLevel("off");
    // :snippet-end:

    realm.write(() => realm.create(Turtle, newTestObject()));

    expect(logs).toHaveLength(0);
  });

  test("Change the log level", async () => {
    type Log = {
      message: string;
      level: string;
    };
    let logs: Log[] = [];

    // :remove-start:
    // @ts-ignore this is an outdated API. Test will be updated with new
    // logger API later
    // :remove-end:
    Realm.setLogger((level, message) => {
      logs.push({ level, message });
    });

    // :snippet-start: change-log-level
    // Set a default log level that's not too verbose
    Realm.setLogLevel("detail");
    const realm = await Realm.open({
      schema: [Turtle],
    });
    // :remove-start:
    const detailLogs = logs.filter((log) => log.level == "detail");
    expect(detailLogs).not.toHaveLength(0);
    expect(detailLogs[0].level).toBe("detail");
    logs = [];
    // :remove-end:

    // Later, change the log level to debug an issue when running specific code
    Realm.setLogLevel("trace");
    realm.write(() => realm.create(Turtle, newTestObject()));
    // :snippet-end:

    const traceLogs = logs.filter((log) => log.level == "trace");
    expect(traceLogs).not.toHaveLength(0);
    expect(traceLogs[0].level).toBe("trace");

    //This will also disable the logger again after the test
    Realm.setLogLevel("off");
  });
});
