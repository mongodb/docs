import Realm from "realm";

const TaskSchema = {
  name: "Task",
  properties: {
    _id: "int",
    name: "string",
    status: "string?",
    progressMinutes: "int?",
    owner: "string?",
    dueDate: "date?",
  },
  primaryKey: "_id",
};

const TeamSchema = {
  name: "Team",
  properties: {
    _id: "int",
    name: "string",
    description: "string?",
  },
  primaryKey: "_id",
};

const app = new Realm.App({ id: "flexsyncjstest-smixl" });

describe("Flexible Sync Tests", () => {
  test.skip("should open a FS realm, get subscriptions, subscribe to Queryable Fields, check state, update a subscription, remove a subscription(s)", async () => {
    await app.logIn(Realm.Credentials.anonymous());
    // :snippet-start: open-flexible-sync-realm
    const realm = await Realm.open({
      schema: [TaskSchema, TeamSchema],
      sync: {
        user: app.currentUser,
        flexible: true,
      },
    });
    // :snippet-end:

    // :snippet-start: get-subscriptions
    // get the SubscriptionSet for the realm
    const subscriptions = realm.subscriptions;
    // :snippet-end:

    // :snippet-start: subscribe-to-queryable-fields
    const tasks = realm.objects("Task");
    const longRunningTasks = tasks.filtered(
      'status == "completed" && progressMinutes > 120'
    );
    
    await realm.subscriptions.update((mutableSubs) => {
      mutableSubs.add(longRunningTasks, {
        name: "longRunningTasksSubscription",
      });
      mutableSubs.add(realm.objects("Team"), {
        name: "teamsSubscription",
      });
    });
    // :snippet-end:

    // :snippet-start: log-subscription-state
    console.log(realm.subscriptions.state); // log the subscription state
    // :snippet-end:

    // :snippet-start: update-subscriptions
    realm.subscriptions.update((mutableSubs) => {
      mutableSubs.add(
        tasks.filtered('status == "completed" && progressMinutes > 180'),
        {
          name: "longRunningTasksSubscription",
        }
      );
    });
    // :snippet-end:

    // :snippet-start: remove-single-subscription
    realm.subscriptions.update((mutableSubs) => {
      // remove a subscription with a specific query
      mutableSubs.remove(tasks.filtered('owner == "Ben"'));
    });
    // :snippet-end:

    // :snippet-start: remove-subscription-by-name
    realm.subscriptions.update((mutableSubs) => {
      // remove a subscription with a specific name
      mutableSubs.removeByName("longRunningTasksSubscription");
    });
    // :snippet-end:

    // :snippet-start: remove-subscription-by-reference
    let subscriptionReference;
    realm.subscriptions.update((mutableSubs) => {
      subscriptionReference = mutableSubs.add(realm.objects("Task"));
    });
    // later..
    realm.subscriptions.removeSubscription(subscriptionReference);
    // :snippet-end:

    // :snippet-start: remove-all-subscriptions-of-object-type
    realm.subscriptions.update((mutableSubs) => {
      mutableSubs.removeByObjectType("Team");
    });
    // :snippet-end:

    // :snippet-start: remove-all-subscriptions
    realm.subscriptions.update((mutableSubs) => {
      mutableSubs.removeAll();
    });
    // :snippet-end:
  });

  test.skip("should rerun the initial subscription on open", async () => {
    await app.logIn(Realm.Credentials.anonymous());

    // :snippet-start: rerun-initial-subscriptions-on-open
    // Set the date a week ago and the date a week from now, as those are the dates we'll use
    // in the Flexible Sync query. `rerunOnOpen` lets the app recalculate this query every
    // time the app opens.
    const todaysDate = new Date();
    const dateLastWeek = new Date(
      todaysDate.getFullYear(),
      todaysDate.getMonth(),
      todaysDate.getDate() - 7
    );
    const dateNextWeek = new Date(
      todaysDate.getFullYear(),
      todaysDate.getMonth(),
      todaysDate.getDate() + 7
    );

    const config = {
      sync: {
        user: app.currentUser,
        flexible: true,
        initialSubscriptions: {
          update: (subs, realm) => {
            subs.add(
              realm
                .objects("Task")
                .filtered(
                  "dueDate >= $0 && dueDate <= $1",
                  dateLastWeek,
                  dateNextWeek
                )
            );
          },
          rerunOnOpen: true,
        },
      },
    };
    const realm = await Realm.open(config);
    // :snippet-end:

    realm.write(() => {
      realm.deleteAll();
      const task1 = realm.create("Task", {
        // should not be included
        _id: Math.floor(Math.random() * 1000000),
        name: "Do English Homework 1",
      });
      const task2 = realm.create("Task", {
        // should be included
        _id: Math.floor(Math.random() * 1000000),
        name: "Do English Homework 2",
        dueDate: new Date(),
      });
      const task3 = realm.create("Task", {
        // should be included
        _id: Math.floor(Math.random() * 1000000),
        name: "Do English Homework 3",
        dueDate: new Date(
          todaysDate.getFullYear(),
          todaysDate.getMonth(),
          todaysDate.getDate() + 7
        ),
      });

      const task4 = realm.create("Task", {
        // should be included
        _id: Math.floor(Math.random() * 1000000),
        name: "Do English Homework 4",
        dueDate: new Date(
          todaysDate.getFullYear(),
          todaysDate.getMonth(),
          todaysDate.getDate() - 7
        ),
      });

      const task5 = realm.create("Task", {
        // should not be included
        _id: Math.floor(Math.random() * 1000000),
        name: "Do English Homework 5",
        dueDate: new Date(
          todaysDate.getFullYear(),
          todaysDate.getMonth(),
          todaysDate.getDate() - 9
        ),
      });
    });
    expect(realm.objects("Task").length).toBe(3); // should not include English Homework 1 (without a date) and Homework 5 (dueDate is 9 days ago)
  });
});
