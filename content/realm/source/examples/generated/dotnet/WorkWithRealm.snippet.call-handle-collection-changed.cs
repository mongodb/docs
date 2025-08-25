{
    // Subscribe to a query
    realm.All<Dog>().AsRealmCollection().CollectionChanged +=
        HandleCollectionChanged;

    // Subscribe to a property collection
    gracie.Owners.AsRealmCollection().CollectionChanged +=
        HandleCollectionChanged;
   ...
}

private void HandleCollectionChanged(object? sender,
    NotifyCollectionChangedEventArgs e)
{
    // Use e.Action to get the
    // NotifyCollectionChangedAction type.
    if (e.Action == NotifyCollectionChangedAction.Add)
    {
        // etc.
    }
}
