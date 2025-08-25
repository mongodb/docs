auto items = realm.objects<realm::Item>();

// Sort with `false` returns objects in descending order.
auto itemsSorted = items.sort("priority", false);
