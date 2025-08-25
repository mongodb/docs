import Realm from "realm";

describe("Define a Realm Object Schema", () => {
  test("should persist realm objects under the schema name, not class name", async () => {
    const app = new Realm.App({
      id: "js-flexible-oseso",
    });

    const anonymousUser = await app.logIn(Realm.Credentials.anonymous());

    // :snippet-start: remap-class-name
    class Task extends Realm.Object {
      static schema = {
        // Set the schema's `name` property to the name you want to store.
        // Here, we store items as `Todo_Item` instead of the class's `Task` name.
        name: "Todo_Item",
        properties: {
          _id: "int",
          name: "string",
          owner_id: "string?",
        },
        primaryKey: "_id",
      };
    }

    const config = {
      // Use the class name in the Configuration's `schema` property when
      // opening the realm.
      schema: [Task],
      sync: {
        user: anonymousUser,
        flexible: true,
        initialSubscriptions: {
          update: (subs, realm) => {
            subs.add(
              realm
                // Use the mapped name in Flexible Sync subscriptions.
                .objects(`Todo_Item`)
                .filtered(`owner_id == "${anonymousUser.id}"`)
            );
          },
        },
      },
    };

    const realm = await Realm.open(config);
    expect(realm.isClosed).toBe(false); // :remove:

    realm.write(() => {
      realm.deleteAll();
    });

    realm.write(() => {
      // Use the mapped name when performing CRUD operations.
      realm.create(`Todo_Item`, {
        _id: 12342245,
        owner_id: anonymousUser.id,
        name: "Test the Todo_Item object name",
      });
    });

    // Use the mapped name when performing CRUD operations.
    const assignedTasks = realm.objects(`Todo_Item`);
    // :snippet-end:

    expect(assignedTasks.length).toBe(1);
    await realm.syncSession?.uploadAllLocalChanges();

    const mongodb = anonymousUser.mongoClient("mongodb-atlas");
    const collection = mongodb.db("JSFlexibleSyncDB").collection("Todo_Item");
    const retrievedTodoItem = await collection.findOne({
      name: "Test the Todo_Item object name",
    });
    expect(retrievedTodoItem?.owner_id).toBe(anonymousUser.id);
    const result = await collection.deleteOne({
      owner_id: anonymousUser.id,
    });
    expect(result.deletedCount).toBe(1);
  }, 30000);

  expect.hasAssertions();
});
