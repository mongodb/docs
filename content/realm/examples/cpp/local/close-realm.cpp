#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>

namespace realm {

struct Dog {
  std::string name;
  int64_t age;
};
REALM_SCHEMA(Dog, name, age)

}  // namespace realm

TEST_CASE("Close a realm example", "[write]") {
  auto relative_realm_path_directory = "open-close-realm/";
  std::filesystem::create_directories(relative_realm_path_directory);
  std::filesystem::path path =
      std::filesystem::current_path().append(relative_realm_path_directory);
  path = path.append("some");
  path = path.replace_extension("realm");
  // :snippet-start: close-realm-and-related-methods
  // Create a database configuration.
  auto config = realm::db_config();
  config.set_path(path);  // :remove:
  auto realm = realm::db(config);

  // Use the database...
  // :remove-start:
  auto dog = realm::Dog{.name = "Maui", .age = 3};

  realm.write([&] { realm.add(std::move(dog)); });

  auto managedDogs = realm.objects<realm::Dog>();
  auto specificDog = managedDogs[0];
  REQUIRE(specificDog.name == "Maui");
  REQUIRE(specificDog.age == static_cast<long long>(3));
  REQUIRE(managedDogs.size() == 1);
  // :remove-end:

  // ... later, close it.
  // :snippet-start: close-realm
  realm.close();
  // :snippet-end:

  // You can confirm that the database is closed if needed.
  CHECK(realm.is_closed());

  // Objects from the database become invalidated when you close the database.
  CHECK(specificDog.is_invalidated());
  // :snippet-end:

  auto newDBInstance = realm::db(config);
  auto sameDogsNewInstance = newDBInstance.objects<realm::Dog>();
  auto anotherSpecificDog = sameDogsNewInstance[0];
  REQUIRE(anotherSpecificDog.name == "Maui");
  REQUIRE(sameDogsNewInstance.size() == 1);

  newDBInstance.write([&] { newDBInstance.remove(anotherSpecificDog); });

  auto managedDogsAfterDelete = newDBInstance.objects<realm::Dog>();
  REQUIRE(managedDogsAfterDelete.size() == 0);
}
