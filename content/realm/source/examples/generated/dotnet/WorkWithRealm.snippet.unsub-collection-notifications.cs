// Watch for collection notifications.
// Call Dispose() when you are done observing the
// collection.
var token = realm.All<Dog>()
    .SubscribeForNotifications((sender, changes) =>
    {
        // etc.
    });
// When you no longer want to receive notifications:
token.Dispose();
