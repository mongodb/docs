auto config = realm::db_config();
auto realm = realm::db(std::move(config));

auto dog = realm::Dog{.name = "Wishbone"};

auto [joe] = realm.write([&realm]() {
  auto person =
      realm::Person{.name = "Joe", .age = 27, .dog = nullptr};
  return realm.insert(std::move(person));
});


// Assign an object with an inverse relationship
// to automatically set the value of the inverse relationship
realm.write([&dog, joe = &joe]() { joe->dog = &dog; });
CHECK(joe.dog->owners.size() == 1);

// ... Later ...

// Removing the relationship from the parent object
// automatically updates the inverse relationship
realm.write([joe = &joe]() { joe->dog = nullptr; });
CHECK(realm.objects<realm::Dog>()[0].owners.size() == 0);
