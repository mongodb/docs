// Watch for collection notifications.
var subscriptionToken = realm.All<Dog>()
    .SubscribeForNotifications((sender, changes) =>
{
    if (changes == null)
    {
        // This is the case when the notification is called
        // for the first time.
        // Populate tableview/listview with all the items
        // from `collection`
        return;
    }

    // Handle individual changes
    foreach (var i in changes.DeletedIndices)
    {
        // ... handle deletions ...
    }

    foreach (var i in changes.InsertedIndices)
    {
        // ... handle insertions ...
    }

    foreach (var i in changes.NewModifiedIndices)
    {
        // ... handle modifications ...
    }

    if (changes.IsCleared)
    {
        // A special case if the collection has been cleared:
        // i.e., all items have been deleted by calling
        // the Clear() method.
    }
});
