const config: Realm.Configuration = {
  schema: [Task],
  sync: {
    user: app.currentUser!,
    flexible: true,
  },
};
const realm = await Realm.open(config);
const completedTasks = await realm
  .objects(Task)
  .filtered('status == "completed"')
  .subscribe();

// ...work with the subscribed results list
