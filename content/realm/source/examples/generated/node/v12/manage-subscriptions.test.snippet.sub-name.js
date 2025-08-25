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
