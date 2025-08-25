auto config = realm::db_config();
auto realm = realm::db(std::move(config));

auto dog = realm::Dog{.name = "Wishbone"};

auto [joe] = realm.write([&realm]() {
  auto person =
      realm::Person{.name = "Joe", .age = 27, .dog = nullptr};
  return realm.insert(std::move(person));
});

realm.write([&dog, joe = &joe]() { joe->dog = &dog; });

// After assigning `&dog` to jack's `dog` property,
// the backlink automatically updates to reflect
// the inverse relationship through the dog's `owners`
// property.
CHECK(joe.dog->owners.size() == 1);
