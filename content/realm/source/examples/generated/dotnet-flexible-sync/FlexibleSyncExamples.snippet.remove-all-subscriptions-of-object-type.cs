realm.Subscriptions.Update(() =>
{
    // remove all subscriptions of the "Team" Class Name 
    realm.Subscriptions.RemoveAll("Team");

    // Alernatively, remove all subscriptions of the "Team" object type
    realm.Subscriptions.RemoveAll<Team>();
});
