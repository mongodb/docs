var query = realm.All<Team>().Where(t => t.Name == "MyTeam");
await query.SubscribeAsync();

// you can also pass a SubscriptionOptions object:
var query2 = realm.All<Team>().Where(t => t.Name == "DevelopmentTeam");
await query2.SubscribeAsync(
    new SubscriptionOptions() { Name = "devTeamSubscription" });
