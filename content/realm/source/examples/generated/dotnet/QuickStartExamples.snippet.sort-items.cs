var sortedItems = realm.All<Item>()
    .OrderBy(i => i.Status);
