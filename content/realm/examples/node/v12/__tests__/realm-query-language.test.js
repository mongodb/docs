import Realm, { BSON } from "realm";
import { Item, Project } from "./models/rql-data-models.ts";

describe("Realm Query Language Reference", () => {
  let realm;
  beforeEach(async () => {
    realm = await Realm.open({
      schema: [Project, Item],
      deleteRealmIfMigrationNeeded: true,
    });

    // populate test objects
    realm.write(() => {
      realm.create("Project", {
        _id: new Realm.BSON.ObjectId(),
        name: "New Project",
        items: [
          {
            _id: new Realm.BSON.ObjectId(),
            name: "Write tests",
            isComplete: false,
            assignee: "Alex",
            priority: 5,
            progressMinutes: 125,
          },
          {
            _id: new Realm.BSON.ObjectId(),
            name: "Run tests",
            isComplete: false,
            assignee: "Ali",
            priority: 9,
            progressMinutes: 10,
          },
          {
            _id: new Realm.BSON.ObjectId(),
            name: "Bluehawk Tests",
            isComplete: false,
            assignee: null,
            priority: 10,
            progressMinutes: 55,
          },
        ],
      });
      const proj1 = realm.create("Project", {
        _id: new Realm.BSON.ObjectId(),
        name: "Project with High Quota",
        quota: 12,
        items: [
          {
            _id: new Realm.BSON.ObjectId(),
            name: "Create a ticket",
            isComplete: true,
            assignee: "Nick",
            priority: 2,
            progressMinutes: 8,
          },
          {
            _id: new Realm.BSON.ObjectId(),
            name: "Schedule a meeting",
            isComplete: true,
            assignee: "Chris",
            priority: 9,
            progressMinutes: 10,
          },
          {
            _id: new Realm.BSON.ObjectId(),
            name: "Get coffee",
            isComplete: false,
            assignee: "Dachary",
            priority: 11,
            progressMinutes: 3,
          },
        ],
      });

      const proj2 = realm.create("Project", {
        _id: new Realm.BSON.ObjectId(),
        name: "Another project",
        items: [proj1.items[2]],
      });

      realm.create("Item", {
        _id: new Realm.BSON.ObjectId(),
        name: "Assign me to a project",
        isComplete: false,
        assignee: "Nick",
        priority: 2,
        progressMinutes: 0,
      });
    });

    expect(realm.objects("Project")[0].name).toBe("New Project");
    expect(realm.objects("Item")[0].name).toBe("Write tests");
  });

  afterEach(() => {
    // After the test, delete the objects and close the realm
    if (realm && !realm.isClosed) {
      realm.write(() => {
        realm.deleteAll();
      });
      realm.close();
    }
  });

  test("full-text search", () => {
    const items = realm.objects(Item);

    const itemsWithWrite = items.filtered(
        // :snippet-start: rql-fts
        // Filter for items with 'write' in the name
        "name TEXT $0", "write"

        // :remove-start:
      );

    const itemsWithWriteNotTest = items.filtered(
        // :remove-end:
        // Find items with 'write' but not 'tests' using '-'
        "name TEXT $0", "write -tests"

        // :remove-start:
      );

    const itemsStartingWithWri = items.filtered(
        // :remove-end:
        // Find items starting with 'wri-' using '*'
        "name TEXT $0", "wri*"
        // :snippet-end:
      );

    expect(itemsWithWrite.length).toBe(1)
    expect(itemsWithWriteNotTest.length).toBe(0);
    expect(itemsStartingWithWri.length).toBe(1);
  });
});