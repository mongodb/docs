// Create an object using the `realm` namespace.
auto dog = realm::Dog{.name = "Rex", .age = 1};

std::cout << "dog: " << dog.name << "\n";

// Open the database with compile-time schema checking.
auto config = realm::db_config();
auto realm = realm::db(std::move(config));

// Persist your data in a write transaction
// Optionally return the managed object to work with it immediately
auto managedDog = realm.write([&] { return realm.add(std::move(dog)); });
