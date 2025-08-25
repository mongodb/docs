import Realm from "realm";
import { APP_ID } from "../config.ts";

class Task extends Realm.Object {
  static schema = {
    name: "Task",
    properties: {
      _id: "objectId",
      name: "string",
      status: "string?",
      progressMinutes: "int?",
      owner: "string?",
      dueDate: "date?",
    },
    primaryKey: "_id",
  };
}

const app = new Realm.App({ id: APP_ID });
const inProgressId = new Realm.BSON.ObjectId();

describe("Managing Sync Subscriptions", () => {
  beforeEach(async () => {
    await app.logIn(Realm.Credentials.anonymous());

    const config = {
      schema: [Task],
      sync: {
        user: app.currentUser,
        flexible: true,
      },
    };
    const realm = await Realm.open(config);

    // Remove any active subs before each test.
    if (realm.subscriptions.length) {
      await realm.subscriptions.update((mutableSubs) => {
        mutableSubs.removeAll();
      });
    }

    realm.close();
  });

  test("add basic query subscription", async () => {
    // :snippet-start: sub-basic
    const config = {
      schema: [Task],
      sync: {
        user: app.currentUser,
        flexible: true,
      },
    };
    const realm = await Realm.open(config);
    // :remove-start:
    expect(realm.isClosed).toBeFalsy();

    // There shouldn't be any active subscriptions.
    expect(realm.subscriptions.length).toBe(0);
    // :remove-end:
    const completedTasks = await realm
      .objects(Task)
      .filtered('status == "completed"')
      .subscribe();

    // ...work with the subscribed results list
    // :snippet-end:

    expect(realm.subscriptions.length).toBe(1);

    // Remove unnamed subscriptions.
    let numberRemovedSubscriptions = 0;
    await realm.subscriptions.update((mutableSubs) => {
      numberRemovedSubscriptions = mutableSubs.removeUnnamed();
    });

    expect(numberRemovedSubscriptions).toEqual(1);
    expect(realm.subscriptions.length).toEqual(0);
  });

  test("name a subscription", async () => {
    const config = {
      schema: [Task],
      sync: {
        user: app.currentUser,
        flexible: true,
      },
    };
    const realm = await Realm.open(config);

    expect(realm.isClosed).toBeFalsy();

    // There shouldn't be any active subscriptions.
    expect(realm.subscriptions.length).toEqual(0);

    // :snippet-start: sub-name
    const subOptions = {
      name: "All completed tasks",
    };
    const completedTasks = await realm
      .objects(Task)
      .filtered('status == "completed"')
      .subscribe(subOptions);
    const completedTasksSubscription = realm.subscriptions.findByName(
      "All completed tasks"
    );

    // ...work with the subscribed results list or modify the subscription
    // :snippet-end:

    expect(realm.subscriptions.length).toEqual(1);
    expect(completedTasksSubscription).not.toBe(null);

    // Remove unnamed subscriptions.
    completedTasks.unsubscribe();

    expect(realm.subscriptions.length).toEqual(0);
  });

  test("open an FS realm with initial subscriptions", async () => {
    // :snippet-start: set-initial-subscriptions
    const config = {
      schema: [Task],
      sync: {
        user: app.currentUser,
        flexible: true,
        initialSubscriptions: {
          update: (subs, realm) => {
            subs.add(realm.objects(Task).filtered("status == 'in progress'"), {
              name: "In progress tasks",
            });
          },
          rerunOnOpen: true,
        },
      },
    };

    const realm = await Realm.open(config);
    // :snippet-end:

    expect(realm.isClosed).toBeFalsy();

    const sub = realm.subscriptions.findByName("In progress tasks");

    // There should be 1 active subscription from initialSubscriptions.
    expect(realm.subscriptions.length).toEqual(1);
    expect(sub).not.toBeFalsy();

    realm.write(() => {
      realm.create(Task, {
        _id: new Realm.BSON.ObjectId(),
        name: "Do the dishes",
        status: "Complete",
      });
      realm.create(Task, {
        _id: new Realm.BSON.ObjectId(),
        name: "Vacuum the rug",
        status: "Complete",
      });
      realm.create(Task, {
        _id: inProgressId,
        name: "Clean the bathroom",
        status: "In progress",
      });
    });

    const subscribedTasks = realm
      .objects("Task")
      .filtered("status == 'In progress'");

    expect(subscribedTasks.length).toEqual(1);
    expect(subscribedTasks[0]._id).toEqual(inProgressId);

    // Unsubscribe
    const unsubFromInitialSub = realm
      .objects(Task)
      .filtered("status == 'in progress'")
      .unsubscribe();
    subscribedTasks.unsubscribe();

    expect(realm.subscriptions.length).toEqual(0);
  });
});
