#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>

namespace realm {
struct Dog {
  std::string name;
  int64_t age;
};
REALM_SCHEMA(Dog, name, age)
}  // namespace realm

TEST_CASE("Encrypt a database example", "[write]") {
  auto relative_realm_path_directory = "encrypt-realm/";
  std::filesystem::create_directories(relative_realm_path_directory);
  std::filesystem::path path =
      std::filesystem::current_path().append(relative_realm_path_directory);
  path = path.append("encrypted");
  path = path.replace_extension("realm");
  // :snippet-start: open-encrypted-realm
  // Check if we already have a key stored in the platform's secure storage.
  // If we don't, generate a new one.
  // Use your preferred method to generate a key. This example key is
  // NOT representative of a secure encryption key. It only exists to
  // illustrate the form your key might take.
  std::array<char, 64> exampleKey = {
      0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0,
      0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 5, 5, 0, 0,
      0, 0, 0, 0, 6, 6, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0};

  // Store the key securely to be used next time we want to open the database.
  // We don't illustrate this here because it varies depending on the platform.

  // Create a database configuration.
  auto config = realm::db_config();
  config.set_path(path);  // :remove:
  // Set the encryption key in your config.
  config.set_encryption_key(exampleKey);

  // Open or create a database with the config containing the encryption key.
  auto realm = realm::db(config);
  // :snippet-end:

  auto dog = realm::Dog{.name = "Maui", .age = 3};

  realm.write([&] { realm.add(std::move(dog)); });

  auto managedDogs = realm.objects<realm::Dog>();
  auto specificDog = managedDogs[0];
  REQUIRE(specificDog.name == "Maui");
  REQUIRE(specificDog.age == static_cast<long long>(3));
  REQUIRE(managedDogs.size() == 1);

  realm.write([&] { realm.remove(specificDog); });

  auto managedDogsAfterDelete = realm.objects<realm::Dog>();
  REQUIRE(managedDogsAfterDelete.size() == 0);
}
