//  Set up the listener & observe a collection.
auto token = person.dogs.observe([&](auto&& changes) {
  if (changes.collection_root_was_deleted) {
    std::cout << "The collection was deleted.\n";
  } else {
    // Handle deletions, then insertions, then modifications.
    for (auto& collectionChange : changes.deletions) {
      std::cout << "The object at index " << std::to_string(collectionChange)
                << " was removed\n";
    }
    for (auto& collectionChange : changes.insertions) {
      std::cout << "The object at index " << std::to_string(collectionChange)
                << " was inserted\n";
    }
    for (auto& collectionChange : changes.modifications) {
      std::cout << "The object at index " << std::to_string(collectionChange)
                << " was modified\n";
    }
  }
});

// Remove an object from the collection, and then add an object to see
// deletions and insertions.
realm.write([&] {
  person.dogs.clear();
  person.dogs.push_back(&dog2);
});

// Modify an object to see a modification.
realm.write([&] { dog2.age = 2; });

// Refresh the realm after the change to trigger the notification.
realm.refresh();

// Unregister the token when done observing.
token.unregister();
