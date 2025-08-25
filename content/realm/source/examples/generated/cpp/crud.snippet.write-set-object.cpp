auto realm = realm::db(std::move(config));

// Create an object that has a set property
auto docsRealmRepo =
    realm::Repository{.ownerAndName = "mongodb/docs-realm"};

// Add the object to the database and get the managed object
auto managedDocsRealm =
    realm.write([&]() { return realm.add(std::move(docsRealmRepo)); });

// Insert items into the set
auto openPullRequestNumbers = {3059, 3062, 3064};

realm.write([&] {
  for (auto number : openPullRequestNumbers) {
    // You can only mutate the set in a write transaction.
    // This means you can't set values at initialization,
    // but must do it during a write.
    managedDocsRealm.openPullRequestNumbers.insert(number);
  }
});
