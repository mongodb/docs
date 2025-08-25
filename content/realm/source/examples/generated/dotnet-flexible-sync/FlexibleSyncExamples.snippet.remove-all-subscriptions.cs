realm.Subscriptions.Update(() =>
{
    // remove all subscriptions, including named subscriptions
    realm.Subscriptions.RemoveAll(true);
});
