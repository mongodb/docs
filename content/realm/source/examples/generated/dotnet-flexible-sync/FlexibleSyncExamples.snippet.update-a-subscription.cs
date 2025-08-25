realm.Subscriptions.Update(() =>
{
    var updatedLongRunningTasksQuery = realm.All<Task>().Where(t => t.Status == "completed" && t.ProgressMinutes > 130);
    realm.Subscriptions.Add(updatedLongRunningTasksQuery, new SubscriptionOptions() { Name = "longRunningTasks" });
});
