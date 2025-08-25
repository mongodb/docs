auto config = realm::db_config();
auto realm = realm::db(std::move(config));

auto dog = realm::Dog{.name = "Bowser"};

auto [jack, jill] = realm.write([&realm]() {
  auto person =
      realm::Person{.name = "Jack", .age = 27, .dog = nullptr};

  realm::Person person2;
  person2.name = "Jill";
  person2.age = 28;
  person2.dog = nullptr;

  return realm.insert(std::move(person), std::move(person2));
});

realm.write([&dog, jack = &jack]() { jack->dog = &dog; });

// After assigning `&dog` to jack's `dog` property,
// the backlink automatically updates to reflect
// the inverse relationship through the dog's `owners`
// property
CHECK(jack.dog->owners.size() == 1);

realm.write([&dog, jill = &jill]() { jill->dog = &dog; });

// After assigning the same `&dog` to jill's `dog`
// property, the backlink automatically updates
CHECK(jill.dog->owners.size() == 2);
CHECK(jack.dog->owners.size() == 2);

// Removing the relationship from the parent object
// automatically updates the inverse relationship
realm.write([jack = &jack]() { jack->dog = nullptr; });
CHECK(jack.dog == nullptr);
CHECK(jill.dog->owners.size() == 1);
