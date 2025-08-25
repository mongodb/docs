// Read from a frozen database.
auto frozenItems = frozenRealm.objects<realm::Item>();

// The collection that we pull from the frozen database is also frozen.
CHECK(frozenItems.is_frozen());

// Get an individual item from the collection.
auto frozenItem = frozenItems[0];

// To modify the item, you must first thaw it.
// You can also thaw collections and realms.
auto thawedItem = frozenItem.thaw();

// Check to make sure the item is valid. An object is
// invalidated when it is deleted from its managing database,
// or when its managing realm has invalidate() called on it.
REQUIRE(thawedItem.is_invalidated() == false);

// Thawing the item also thaws the frozen database it references.
auto thawedRealm = thawedItem.get_realm();
REQUIRE(thawedRealm.is_frozen() == false);

// With both the object and its managing database thawed, you
// can safely modify the object.
thawedRealm.write([&] { thawedItem.name = "Save the world"; });
