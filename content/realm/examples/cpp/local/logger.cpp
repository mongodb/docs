// :replace-start: {
//   "terms": {
//     "Logger_": ""
//   }
// }

#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>

namespace realm {
struct Logger_Dog {
  std::string name;
  int64_t age;
};
REALM_SCHEMA(Logger_Dog, name, age)
}  // namespace realm

// :snippet-start: create-custom-logger
struct MyCustomLogger : realm::logger {
  // This could be called from any thread, so may not output visibly to the
  // console. Handle output in a queue or other cross-thread context if needed.
  void do_log(realm::logger::level level, const std::string &msg) override {
    std::cout << "Realm log entry: " << msg << std::endl;
  }
};
// :snippet-end:

TEST_CASE("open a realm with a logger", "[realm][logger]") {
  auto relative_realm_path_directory = "logger/";
  std::filesystem::create_directories(relative_realm_path_directory);
  std::filesystem::path path =
      std::filesystem::current_path().append(relative_realm_path_directory);
  path = path.append("dog");
  path = path.replace_extension("realm");
  // :snippet-start: initialize-logger
  auto config = realm::db_config();
  config.set_path(path);  // :remove:
  auto thisRealm = realm::db(config);
  auto myLogger = std::make_shared<MyCustomLogger>();
  realm::set_default_logger(myLogger);
  // :snippet-end:
  // :snippet-start: set-default-log-level
  auto logLevel = realm::logger::level::info;
  realm::set_default_level_threshold(logLevel);
  // :snippet-end:
  SECTION("Test code example functions as intended + teardown") {
    // Write something to the realm to confirm this worked as expected.
    auto dog = realm::Logger_Dog{.name = "Ben", .age = 2};
    thisRealm.write([&] { thisRealm.add(std::move(dog)); });
    auto dogs = thisRealm.objects<realm::Logger_Dog>();
    auto dogCount = dogs.size();
    std::cout << "Dog count: " << dogCount << "\n";
    REQUIRE(dogCount >= 1);
    // Clean up after test
    auto specificDog = dogs[0];
    thisRealm.write([&] { thisRealm.remove(specificDog); });
  }
}
// :replace-end: