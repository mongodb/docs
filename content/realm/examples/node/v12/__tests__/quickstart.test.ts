// :replace-start: {
//   "terms": {
//     "js-flexible-oseso": "<yourAppId>"
//   }
// }
// :snippet-start: import-realm
import Realm, { BSON } from "realm";
// :snippet-end:

import { QuickstartTask } from "./models/models.ts";

describe("QuickStart Local", () => {
  test("should define an object model, open a realm, perform crud operations, and watch a collection", async () => {
    // :snippet-start: open-a-realm

    const realm = await Realm.open({
      schema: [QuickstartTask],
    });
    // :snippet-end:

    expect(realm.isClosed).toBe(false);

    const testId = new BSON.ObjectID();
    const firstId = new BSON.ObjectID();
    const secondId = new BSON.ObjectID();

    // Add default test object to realm.
    realm.write(() => {
      realm.create(QuickstartTask, {
        _id: testId,
        name: "wake up",
        status: "Open",
      });
    });

    // :snippet-start: find-sort-and-filter-objects
    // Query for specific obect using primary key.
    const specificTask = realm.objectForPrimaryKey(QuickstartTask, testId);

    // Query realm for all instances of the "Task" type.
    const tasks = realm.objects(QuickstartTask);

    // Filter for all tasks with a status of "Open".
    const openTasks = tasks.filtered("status = 'Open'");

    // Sort tasks by name in ascending order.
    const tasksByName = tasks.sorted("name");
    // :snippet-end:

    expect(specificTask).toBeTruthy();
    expect(tasks.length).toBe(1);
    expect(openTasks.length).toBe(1);
    expect(tasksByName[0].name).toBe("wake up");

    // :snippet-start: watch-a-collection
    // Define the collection notification listener.
    //@ts-expect-error TYPEBUG: OrderedCollection is incorrectly implemented
    const listener: Realm.CollectionChangeCallback = (
      tasks: Realm.OrderedCollection<QuickstartTask>,
      changes: Realm.CollectionChangeSet
    ) => {
      // :remove-start:
      if (changes.newModifications.length > 0) {
        taskHasBeenModified = true;
      }
      if (changes.deletions.length > 0) {
        taskHasBeenDeleted = true;
      }
      // :remove-end:
      // Update UI in response to deleted objects.
      changes.deletions.forEach((index) => {
        // Deleted objects cannot be accessed directly,
        // but we can update a UI list, etc. knowing the index.
        console.log(`A task was deleted at the ${index} index.`);
        // ...
      });

      // Update UI in response to inserted objects.
      changes.insertions.forEach((index) => {
        const insertedTasks = tasks[index];
        console.log(`insertedTasks: ${JSON.stringify(insertedTasks, null, 2)}`);
        // ...
      });

      // Update UI in response to modified objects.
      // `newModifications` contains an index to the modified object's position
      // in the collection after all deletions and insertions have been applied.
      changes.newModifications.forEach((index) => {
        const modifiedTask = tasks[index];
        console.log(`modifiedTask: ${JSON.stringify(modifiedTask, null, 2)}`);
        // ...
      });
    };

    // Observe collection notifications.
    //@ts-expect-error TYPEBUG: OrderedCollection is incorrectly implemented
    tasks.addListener(listener);
    // :snippet-end:

    // :snippet-start: create-modify-delete
    const allTasks = realm.objects(QuickstartTask);

    // Add a couple of Tasks in a single, atomic transaction.
    realm.write(() => {
      realm.create(QuickstartTask, {
        _id: firstId,
        name: "go grocery shopping",
        status: "Open",
      });

      realm.create(QuickstartTask, {
        _id: secondId,
        name: "go exercise",
        status: "Open",
      });
    });
    // :remove-start:
    expect(tasks.length).toBe(3);
    expect(openTasks.length).toBe(3);
    expect(tasksByName[0].name).toBe("go exercise");
    expect(tasksByName[1].name).toBe("go grocery shopping");
    expect(tasksByName[2].name).toBe("wake up");

    let taskHasBeenModified = false;
    let taskHasBeenDeleted = false;
    // :remove-end:

    const task1 = allTasks.find(
      (task) => task._id.toString() == firstId.toString()
    );
    expect(task1).toBeTruthy(); // :remove:
    const task2 = allTasks.find(
      (task) => task._id.toString() == secondId.toString()
    );
    expect(task2).toBeTruthy(); // :remove:

    realm.write(() => {
      // Modify an object.
      task1!.status = "InProgress";

      // Delete an object.
      realm.delete(task2!);
    });
    // :snippet-end:

    expect(task1!.status).toBe("InProgress");

    // Wait 1 second until the collection listener has registered the
    // modification and deletion events.
    setTimeout(() => {
      expect(taskHasBeenModified).toBe(true);
      expect(taskHasBeenDeleted).toBe(true);
    }, 1000);

    // Clear all objects from realm.
    realm.write(() => {
      realm.deleteAll();
    });

    // :snippet-start: close-a-realm
    // Close the realm.
    realm.close();
    // :snippet-end:

    expect.hasAssertions();
  });
});

describe("Quickstart Sync", () => {
  test("should open a Flexible Sync realm with initial subscriptions", async () => {
    // :snippet-start: open-realm-with-subscriptions
    // :snippet-start: anonymous-login
    // :snippet-start: initialize
    // Initialize your App.
    const app = new Realm.App({
      id: "js-flexible-oseso",
    });
    // :snippet-end:
    expect(app).toBeTruthy(); // :remove:
    expect(app.id).toBe("js-flexible-oseso"); // :remove:

    // Authenticate an anonymous user.
    const anonymousUser = await app.logIn(Realm.Credentials.anonymous());
    // :snippet-end:
    expect(app.currentUser).toBeTruthy(); // :remove:

    // Add a test object throught the MongoDB client so that we have something
    // to look for with initial subscriptions.
    const testTask = {
      _id: new BSON.ObjectID(),
      name: "go grocery shopping",
      status: "Open",
      owner_id: anonymousUser.id,
    };
    const mongodb = app.currentUser?.mongoClient("mongodb-atlas");
    const tasks = mongodb?.db("JSFlexibleSyncDB").collection("Task");

    if (tasks) {
      await tasks.insertOne(testTask);
    }

    // Create a `SyncConfiguration` object.
    const config: Realm.Configuration = {
      schema: [QuickstartTask],
      sync: {
        // Use the previously-authenticated anonymous user.
        user: anonymousUser,
        // Set flexible sync to true to enable sync.
        flexible: true,
        // Define initial subscriptions to start syncing data as soon as the
        // realm is opened.
        initialSubscriptions: {
          update: (subs, realm) => {
            subs.add(
              // Get objects that match your object model, then filter them by
              // the `owner_id` queryable field
              realm
                .objects(QuickstartTask)
                .filtered(`owner_id == "${anonymousUser.id}"`)
            );
          },
        },
      },
    };

    const realm = await Realm.open(config);
    // :snippet-end:

    expect(realm.isClosed).toBe(false);

    const assignedTasks = realm
      .objects(QuickstartTask)
      .filtered(`owner_id == "${anonymousUser.id}"`);

    expect(assignedTasks.length).toBe(1);
  }, 30000);

  expect.hasAssertions();
});

// :replace-end:
