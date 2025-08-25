auto realm = realm::db(std::move(config));

// Get an immutable copy of the database that can be passed across threads.
auto frozenRealm = realm.freeze();

if (frozenRealm.is_frozen()) {
  // Do something with the frozen database.
  // You may pass a frozen realm, collection, or objects
  // across threads. Or you may need to `.thaw()`
  // to make it mutable again.
}

// You can freeze collections.
auto managedItems = realm.objects<realm::Item>();
auto frozenItems = managedItems.freeze();

CHECK(frozenItems.is_frozen());

// You can read from frozen databases.
auto itemsFromFrozenRealm =
    frozenRealm.objects<realm::Item>();

CHECK(itemsFromFrozenRealm.is_frozen());

// You can freeze objects.
auto managedItem = managedItems[0];
auto frozenItem = managedItem.freeze();

CHECK(frozenItem.is_frozen());

// Frozen objects have a reference to a frozen realm.
CHECK(frozenItem.get_realm().is_frozen());
