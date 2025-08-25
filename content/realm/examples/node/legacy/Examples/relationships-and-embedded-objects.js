import Realm from "realm";
import BSON from "bson";

const app = new Realm.App({ id: "playground-kmcdm" });

describe("Relationships and Embedded Objects Tests", () => {
  test.skip("should obtain an inverse relationship dynamically", async () => {
    // :snippet-start: obtain-inverse-relationship-dynamically
    const User = {
      name: "User",
      primaryKey: "_id",
      properties: {
        _id: "objectId",
        _partition: "string?",
        name: "string",
        tasks: "Task[]",
      },
    };
    const Task = {
      name: "Task",
      primaryKey: "_id",
      properties: {
        _id: "objectId",
        _partition: "string?",
        text: "string",
      },
    };
    // :remove-start:
    await app.logIn(Realm.Credentials.anonymous());
    const realm = await Realm.open({
      schema: [User, Task],
      sync: {
        user: app.currentUser,
        partitionValue: "MyInverseRelationshipApp",
      },
    });

    let user, task;
    realm.write(() => {
      user = realm.create("User", {
        _id: new BSON.ObjectID(),
        name: "Joe Smith",
      });
      task = realm.create("Task", {
        _id: new BSON.ObjectID(),
        text: "go grocery shopping",
        status: "Open",
      });

      user.tasks.push(task);
    });
    // :remove-end:

    // get the User who owns the task
    const linkedUser = task.linkingObjects("User", "tasks")[0];
    // :snippet-end:

    expect(linkedUser.name).toBe("Joe Smith");
    expect(linkedUser.tasks[0].text).toBe("go grocery shopping");

    // Delete the objects & cleanup
    realm.write(() => {
      realm.delete(user);
      realm.delete(task);
      user = null;
      task = null;
    });
    realm.close();
    app.currentUser.logOut();
  });
});
