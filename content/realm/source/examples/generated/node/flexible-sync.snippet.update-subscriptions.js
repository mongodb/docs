realm.subscriptions.update((mutableSubs) => {
  mutableSubs.add(
    tasks.filtered('status == "completed" && progressMinutes > 180'),
    {
      name: "longRunningTasksSubscription",
    }
  );
});
