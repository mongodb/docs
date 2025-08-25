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
