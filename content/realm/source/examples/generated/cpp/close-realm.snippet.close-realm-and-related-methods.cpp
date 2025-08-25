// Create a database configuration.
auto config = realm::db_config();
auto realm = realm::db(config);

// Use the database...

// ... later, close it.
realm.close();

// You can confirm that the database is closed if needed.
CHECK(realm.is_closed());

// Objects from the database become invalidated when you close the database.
CHECK(specificDog.is_invalidated());
