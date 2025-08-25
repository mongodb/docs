import Realm, { ObjectSchema, SubscriptionSetState, WaitForSync } from "realm";
import { APP_ID } from "../config";

class Task extends Realm.Object<Task> {
  _id!: Realm.BSON.ObjectId;
  name!: String;
  status?: String;
  progressMinutes?: Number;
  owner?: String;
  dueDate?: Date;

  static schema: ObjectSchema = {
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

    const config: Realm.Configuration = {
      schema: [Task],
      sync: {
        user: app.currentUser!,
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
    const config: Realm.Configuration = {
      schema: [Task],
      sync: {
        user: app.currentUser!,
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

    // :snippet-start: sub-remove-unnamed
    // Remove unnamed subscriptions.
    let numberRemovedSubscriptions = 0;
    await realm.subscriptions.update((mutableSubs) => {
      numberRemovedSubscriptions = mutableSubs.removeUnnamed();
    });
    // :snippet-end:

    expect(numberRemovedSubscriptions).toEqual(1);
    expect(realm.subscriptions.length).toEqual(0);
  });

  test("name a subscription", async () => {
    const config: Realm.Configuration = {
      schema: [Task],
      sync: {
        user: app.currentUser!,
        flexible: true,
      },
    };
    const realm = await Realm.open(config);

    expect(realm.isClosed).toBeFalsy();

    // There shouldn't be any active subscriptions.
    expect(realm.subscriptions.length).toEqual(0);

    // :snippet-start: sub-name
    const completedTasks = await realm
      .objects(Task)
      .filtered('status == "completed"')
      .subscribe({ name: "All completed tasks" });
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

  test("add first time only wait for sync query subscription", async () => {
    const config: Realm.Configuration = {
      schema: [Task],
      sync: {
        user: app.currentUser!,
        flexible: true,
      },
    };
    const realm = await Realm.open(config);

    expect(realm.isClosed).toBeFalsy();

    // There shouldn't be any active subscriptions.
    expect(realm.subscriptions.length).toEqual(0);

    // :snippet-start: sub-unsubscribe
    // :snippet-start: sub-wait-first
    // :uncomment-start:
    // import { WaitForSync } from "realm";
    // :uncomment-end:

    // Get tasks that have a status of "in progress".
    const completedTasks = realm
      .objects(Task)
      .filtered("status == 'completed'");

    // Only waits for sync to finish on the initial sync.
    await completedTasks.subscribe({
      behavior: WaitForSync.FirstTime,
      name: "First time sync only",
    });
    // :snippet-end:
    // :remove-start:
    expect(realm.subscriptions.state).toEqual(SubscriptionSetState.Complete);

    // Add subscription a second time. Does note wait for
    // sync to finish.
    await completedTasks.subscribe({
      behavior: WaitForSync.FirstTime,
      name: "First time sync only",
    });

    expect(realm.subscriptions.state).toEqual(SubscriptionSetState.Pending);

    expect(realm.subscriptions.length).toEqual(1);
    // :remove-end:

    // Unsubscribe
    completedTasks.unsubscribe();
    // :snippet-end:

    expect(realm.subscriptions.length).toEqual(0);
  });

  test("add timeout query subscription", async () => {
    const config: Realm.Configuration = {
      schema: [Task],
      sync: {
        user: app.currentUser!,
        flexible: true,
      },
    };
    const realm = await Realm.open(config);

    expect(realm.isClosed).toBeFalsy();

    // There shouldn't be any active subscriptions.
    expect(realm.subscriptions.length).toEqual(0);

    // :snippet-start: sub-with-timeout
    // :uncomment-start:
    // import { WaitForSync } from "realm";
    // :uncomment-end:

    // Get tasks that have a status of "in progress".
    const completedTasks = realm
      .objects(Task)
      .filtered("status == 'completed'");

    // Add subscription with timeout
    // If timeout expires before sync is completed, currently-downloaded
    // objects are returned and sync download continues in the background.
    const taskSubscription = await completedTasks.subscribe({
      behavior: WaitForSync.Always,
      timeout: 500,
    });
    // :snippet-end:

    expect(realm.subscriptions.state).toEqual(SubscriptionSetState.Complete);
    expect(realm.subscriptions.length).toEqual(1);

    // Unsubscribe
    taskSubscription.unsubscribe();

    expect(realm.subscriptions.length).toEqual(0);
  });

  test("open an FS realm with initial subscriptions", async () => {
    // :snippet-start: set-initial-subscriptions
    const config: Realm.Configuration = {
      schema: [Task],
      sync: {
        user: app.currentUser!,
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
