#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>

namespace realm {

struct Dog {
  std::string name;
  int64_t age;
};
REALM_SCHEMA(Dog, name, age)

}  // namespace realm

TEST_CASE("Compact a realm example", "[write]") {
  auto relative_realm_path_directory = "compact-realm/";
  std::filesystem::create_directories(relative_realm_path_directory);
  std::filesystem::path path =
      std::filesystem::current_path().append(relative_realm_path_directory);
  path = path.append("compact");
  path = path.replace_extension("realm");
  // :snippet-start: compact-database
  // Create a database configuration.
  auto config = realm::db_config();
  config.set_path(path);  // :remove:

  config.should_compact_on_launch([&](uint64_t totalBytes, uint64_t usedBytes) {
    // totalBytes refers to the size of the file on disk in bytes (data + free
    // space). usedBytes refers to the number of bytes used by data in the file
    // Compact if the file is over 100MB in size and less than 50% 'used'
    auto oneHundredMB = 100 * 1024 * 1024;
    return (totalBytes > oneHundredMB) && (usedBytes / totalBytes) < 0.5;
  });

  // The database is compacted on the first open if the configuration block
  // conditions were met.
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
