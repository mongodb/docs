#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>

// :replace-start: {
//   "terms": {
//     "Map_": "",
//     "Set_": "",
//     "Namespace_": ""
//   }
// }

// :snippet-start: define-model
namespace realm {
// :snippet-start: single-object-model
struct Dog {
  std::string name;
  int64_t age;
};
REALM_SCHEMA(Dog, name, age)
// :snippet-end:

// :snippet-start: person-model
struct Person {
  realm::primary_key<int64_t> _id;
  std::string name;
  int64_t age;

  // Create relationships by pointing an Object field to another struct or class
  Dog *dog;
};
REALM_SCHEMA(Person, _id, name, age, dog)
// :snippet-end:
}  // namespace realm
// :snippet-end:

// This is the same model as `Dog` above - I'm just using it here to show
// the `namespace realm` in the model example for clarity in the docs.
// :snippet-start: dog-model-shows-namespace
namespace realm {
struct Namespace_Dog {
  std::string name;
  int64_t age;
};
REALM_SCHEMA(Namespace_Dog, name, age)
}  // namespace realm
// :snippet-end:

// :snippet-start: employee-model
namespace realm {
struct Employee {
  realm::primary_key<int64_t> _id;
  std::string firstName;
  std::string lastName;

  // You can use this property as you would any other member
  // Omitting it from the schema means the SDK ignores it
  std::string jobTitle_notPersisted;
};
// The REALM_SCHEMA omits the `jobTitle_notPersisted` property
// The SDK does not store and cannot retrieve a value for this property
REALM_SCHEMA(Employee, _id, firstName, lastName)
}  // namespace realm
// :snippet-end:

// :snippet-start: model-with-embedded-object
namespace realm {
struct ContactDetails {
  // Because ContactDetails is an embedded object, it cannot have its own _id
  // It does not have a lifecycle outside of the top-level object
  std::string emailAddress;
  std::string phoneNumber;
};
REALM_EMBEDDED_SCHEMA(ContactDetails, emailAddress, phoneNumber)

struct Business {
  realm::object_id _id;
  std::string name;
  ContactDetails *contactDetails;
};
REALM_SCHEMA(Business, _id, name, contactDetails)
}  // namespace realm
// :snippet-end:

// :snippet-start: model-with-map-property
namespace realm {
struct Map_Employee {
  enum class WorkLocation { HOME, OFFICE };

  int64_t _id;
  std::string firstName;
  std::string lastName;
  std::map<std::string, WorkLocation> locationByDay;
};
REALM_SCHEMA(Map_Employee, _id, firstName, lastName, locationByDay)
}  // namespace realm
// :snippet-end:

// :snippet-start: model-with-set-property
namespace realm {
struct Set_Repository {
  std::string ownerAndName;
  std::set<int64_t> openPullRequestNumbers;
};
REALM_SCHEMA(Set_Repository, ownerAndName, openPullRequestNumbers)
}  // namespace realm
// :snippet-end:

// :snippet-start: dog-map-model
namespace realm {
struct Map_Dog {
  std::string name;
  std::map<std::string, std::string> favoriteParkByCity;
};
REALM_SCHEMA(Map_Dog, name, favoriteParkByCity)
}  // namespace realm
// :snippet-end:

TEST_CASE("Define model example", "[write]") {
  auto relative_realm_path_directory = "dog/";
  std::filesystem::create_directories(relative_realm_path_directory);
  std::filesystem::path path =
      std::filesystem::current_path().append(relative_realm_path_directory);
  path = path.append("dog_objects");
  path = path.replace_extension("realm");
  // :snippet-start: open-realm
  auto config = realm::db_config();
  config.set_path(path);  // :remove:
  auto realm = realm::db(std::move(config));
  // :snippet-end:

  auto dog = realm::Dog{.name = "Maui", .age = 2};

  auto person =
      realm::Person{._id = 123, .name = "Dachary", .age = 42, .dog = &dog};

  realm.write([&] { realm.add(std::move(person)); });

  auto managedPeople = realm.objects<realm::Person>();
  auto specificPerson = managedPeople[0];
  REQUIRE(specificPerson._id == static_cast<long long>(123));
  REQUIRE(specificPerson.name == "Dachary");
  REQUIRE(specificPerson.age == static_cast<long long>(42));
  REQUIRE(specificPerson.dog->name == "Maui");
  REQUIRE(specificPerson.dog->age == static_cast<long long>(2));
  REQUIRE(managedPeople.size() == 1);
  auto managedDogs = realm.objects<realm::Dog>();
  REQUIRE(managedDogs.size() == 1);
  auto specificDog = managedDogs[0];

  realm.write([&] {
    realm.remove(specificPerson);
    realm.remove(specificDog);
  });
  auto managedPeopleAfterDelete = realm.objects<realm::Person>();
  REQUIRE(managedPeopleAfterDelete.size() == 0);
  auto managedDogsAfterDelete = realm.objects<realm::Dog>();
  REQUIRE(managedDogsAfterDelete.size() == 0);
}

TEST_CASE("Ignored property example", "[write]") {
  // :snippet-start: open-db-at-path
  auto relative_realm_path_directory = "custom_path_directory/";
  std::filesystem::create_directories(relative_realm_path_directory);
  // Construct a path
  std::filesystem::path path =
      std::filesystem::current_path().append(relative_realm_path_directory);
  // Add a name for the database file
  path = path.append("employee_objects");
  // Add the .realm extension
  path = path.replace_extension("realm");
  // Set the path on the config, and open the database at the path
  auto config = realm::db_config();
  config.set_path(path);
  auto realmInstance = realm::db(std::move(config));
  // :snippet-end:

  auto employee = realm::Employee{._id = 12345,
                                  .firstName = "Leslie",
                                  .lastName = "Knope",
                                  .jobTitle_notPersisted = "Deputy Director"};

  realmInstance.write([&] { realmInstance.add(std::move(employee)); });

  auto managedEmployees = realmInstance.objects<realm::Employee>();
  auto specificEmployee = managedEmployees[0];
  REQUIRE(specificEmployee._id == static_cast<long long>(12345));
  REQUIRE(specificEmployee.firstName == "Leslie");
  REQUIRE(specificEmployee.lastName == "Knope");
  REQUIRE(managedEmployees.size() == 1);

  realmInstance.write([&] { realmInstance.remove(specificEmployee); });
  auto managedEmployeesAfterDelete = realmInstance.objects<realm::Employee>();
  REQUIRE(managedEmployeesAfterDelete.size() == 0);
}

TEST_CASE("Embedded object example", "[write]") {
  auto relative_realm_path_directory = "business/";
  std::filesystem::create_directories(relative_realm_path_directory);
  std::filesystem::path path =
      std::filesystem::current_path().append(relative_realm_path_directory);
  path = path.append("business_objects");
  path = path.replace_extension("realm");

  // :snippet-start: create-embedded-object
  auto config = realm::db_config();
  config.set_path(path);  // :remove:
  auto realm = realm::db(std::move(config));

  // :remove-start:
  // Generating an objectId here and will set it after
  // the "public" example below for covenient testing later
  auto objectId = realm::object_id::generate();
  // :remove-end:
  auto contactDetails = realm::ContactDetails{
      .emailAddress = "email@example.com", .phoneNumber = "123-456-7890"};
  auto business = realm::Business();
  business._id = realm::object_id::generate();
  business._id = objectId;  // :remove:
  business.name = "MongoDB";
  business.contactDetails = &contactDetails;

  realm.write([&] { realm.add(std::move(business)); });
  // :snippet-end:

  // :snippet-start: update-embedded-object
  // :snippet-start: check-size-and-access-results
  // :snippet-start: read-objects-from-realm
  auto managedBusinesses = realm.objects<realm::Business>();
  // :snippet-end:
  REQUIRE(managedBusinesses.size() == 1);  // :remove:
  // :snippet-start: filter-using-type-safe-query
  auto businessesNamedMongoDB = managedBusinesses.where(
      [](auto &business) { return business.name == "MongoDB"; });
  // :snippet-end:
  CHECK(businessesNamedMongoDB.size() >= 1);
  auto mongoDB = businessesNamedMongoDB[0];
  // :snippet-end:
  // :remove-start:
  REQUIRE(mongoDB._id == objectId);
  REQUIRE(mongoDB.name == "MongoDB");
  REQUIRE(mongoDB.contactDetails->emailAddress == "email@example.com");
  REQUIRE(mongoDB.contactDetails->phoneNumber == "123-456-7890");
  // :remove-end:

  realm.write(
      [&] { mongoDB.contactDetails->emailAddress = "info@example.com"; });

  std::cout << "New email address: "
            << mongoDB.contactDetails->emailAddress.detach() << "\n";
  // :snippet-end:
  REQUIRE(mongoDB.contactDetails->emailAddress == "info@example.com");
  // :snippet-start: overwrite-embedded-object
  auto businesses = realm.objects<realm::Business>();
  auto mongoDBBusinesses = businesses.where(
      [](auto &business) { return business.name == "MongoDB"; });
  auto theMongoDB = mongoDBBusinesses[0];

  realm.write([&] {
    auto newContactDetails = realm::ContactDetails{
        .emailAddress = "info@example.com", .phoneNumber = "234-567-8901"};
    // Overwrite the embedded object
    theMongoDB.contactDetails = &newContactDetails;
  });
  // :snippet-end:

  REQUIRE(mongoDB.contactDetails->phoneNumber == "234-567-8901");
  realm.write([&] { realm.remove(mongoDB); });

  auto managedBusinessesAfterDelete = realm.objects<realm::Business>();
  REQUIRE(managedBusinessesAfterDelete.size() == 0);
}

TEST_CASE("create a dog", "[write]") {
  // :snippet-start: create-an-object
  // Create an object using the `realm` namespace.
  auto dog = realm::Dog{.name = "Rex", .age = 1};

  std::cout << "dog: " << dog.name << "\n";

  // Open the database with compile-time schema checking.
  auto config = realm::db_config();
  auto realm = realm::db(std::move(config));

  // Persist your data in a write transaction
  // Optionally return the managed object to work with it immediately
  auto managedDog = realm.write([&] { return realm.add(std::move(dog)); });
  // :snippet-end:
  REQUIRE(managedDog.name == "Rex");
  auto dogs = realm.objects<realm::Dog>();
  auto dogsCount = dogs.size();
  REQUIRE(dogsCount >= 1);
  // :snippet-start: delete-an-object
  realm.write([&] { realm.remove(managedDog); });
  // :snippet-end:
  auto updatedDogsCount = realm.objects<realm::Dog>().size();
  REQUIRE(updatedDogsCount < dogsCount);
}

TEST_CASE("Pass a subset of classes to a realm", "[write]") {
  auto relative_realm_path_directory = "dog/";
  std::filesystem::create_directories(relative_realm_path_directory);
  std::filesystem::path path =
      std::filesystem::current_path().append(relative_realm_path_directory);
  path = path.append("business_objects");
  path = path.replace_extension("realm");

  auto dog = realm::Dog{.name = "Rex", .age = 1};

  std::cout << "dog: " << dog.name << "\n";

  // :snippet-start: realm-specify-classes
  auto config = realm::db_config();
  auto realm = realm::open<realm::Dog>(std::move(config));
  // :snippet-end:

  auto managedDog = realm.write([&] { return realm.add(std::move(dog)); });

  REQUIRE(managedDog.name == "Rex");
  auto dogs = realm.objects<realm::Dog>();
  auto dogsCount = dogs.size();
  REQUIRE(dogsCount >= 1);

  realm.write([&] { realm.remove(managedDog); });

  auto updatedDogsCount = realm.objects<realm::Dog>().size();
  REQUIRE(updatedDogsCount < dogsCount);
}

TEST_CASE("update a dog", "[write][update]") {
  auto mauiDog = realm::Dog{.name = "Maui", .age = 1};

  auto relative_realm_path_directory = "dog/";
  std::filesystem::create_directories(relative_realm_path_directory);
  std::filesystem::path path =
      std::filesystem::current_path().append(relative_realm_path_directory);
  path = path.append("dog_objects");
  path = path.replace_extension("realm");
  auto config = realm::db_config();
  config.set_path(path);
  auto realm = realm::db(std::move(config));

  realm.write([&] { realm.add(std::move(mauiDog)); });
  SECTION("Test code example functions as intended") {
    // :snippet-start: update-an-object
    // Query for the object you want to update
    auto dogs = realm.objects<realm::Dog>();
    auto dogsNamedMaui =
        dogs.where([](auto &dog) { return dog.name == "Maui"; });
    CHECK(dogsNamedMaui.size() >= 1);
    // Access an object in the results set.
    auto maui = dogsNamedMaui[0];
    // :remove-start:
    REQUIRE(maui.age == static_cast<long long>(1));
    // :remove-end:

    std::cout << "Dog " << maui.name.detach() << " is " << maui.age.detach()
              << " years old\n";

    // Assign a new value to a member of the object in a write transaction
    int64_t newAge = 2;
    realm.write([&] { maui.age = newAge; });
    // :snippet-end:
    auto updatedMaui = dogsNamedMaui[0];
    REQUIRE(updatedMaui.age == newAge);
    // Clean up after test
    realm.write([&] { realm.remove(updatedMaui); });
  }
}

TEST_CASE("test map object", "[write]") {
  auto relative_realm_path_directory = "crud/";
  std::filesystem::create_directories(relative_realm_path_directory);
  std::filesystem::path path =
      std::filesystem::current_path().append(relative_realm_path_directory);
  path = path.append("employee_map_objects");
  path = path.replace_extension("realm");
  // :snippet-start: create-map-object
  auto config = realm::db_config();
  config.set_path(path);  // :remove:
  auto realm = realm::db(std::move(config));

  auto employee = realm::Map_Employee{
      ._id = 8675309, .firstName = "Tommy", .lastName = "Tutone"};

  employee.locationByDay = {
      {"Monday", realm::Map_Employee::WorkLocation::HOME},
      {"Tuesday", realm::Map_Employee::WorkLocation::OFFICE},
      {"Wednesday", realm::Map_Employee::WorkLocation::HOME},
      {"Thursday", realm::Map_Employee::WorkLocation::OFFICE}};

  realm.write([&] {
    realm.add(std::move(employee));
    employee.locationByDay["Friday"] = realm::Map_Employee::WorkLocation::HOME;
  });
  // :snippet-end:

  CHECK(employee.locationByDay["Friday"] ==
        realm::Map_Employee::WorkLocation::HOME);
  SECTION("Test code example functions as intended") {
    // :snippet-start: read-map-value
    auto employees = realm.objects<realm::Map_Employee>();
    auto employeesNamedTommy = employees.where(
        [](auto &employee) { return employee.firstName == "Tommy"; });
    REQUIRE(employeesNamedTommy.size() >= 1);  // :remove:
    auto tommy = employeesNamedTommy[0];
    // :remove-start:
    // You can iterate through keys and values and do something with them
    //            for (auto [k, v] : tommy.locationByDay) {
    //                if (k == "Monday") CHECK(v ==
    //                Map_Employee::WorkLocation::HOME); else if (k ==
    //                "Tuesday") CHECK(v ==
    //                Map_Employee::WorkLocation::OFFICE);
    //            }
    // :remove-end:
    // You can get an iterator for an element matching a key using `find()`
    auto tuesdayIterator = tommy.locationByDay.find("Tuesday");
    CHECK(tuesdayIterator != tommy.locationByDay.end());  // :remove:

    // You can access values for keys like any other map type
    auto mondayLocation = tommy.locationByDay["Monday"];
    // :snippet-end:

    CHECK(tommy.locationByDay["Tuesday"] ==
          realm::Map_Employee::WorkLocation::OFFICE);  // :remove:
    // :snippet-start: update-map-value
    // You can check that a key exists using `find`
    auto findTuesday = tommy.locationByDay.find("Tuesday");
    if (findTuesday != tommy.locationByDay.end())
      realm.write([&] {
        tommy.locationByDay["Tuesday"] =
            realm::Map_Employee::WorkLocation::HOME;
      });
    ;
    // :snippet-end:
    CHECK(tommy.locationByDay["Tuesday"] ==
          realm::Map_Employee::WorkLocation::HOME);
    // :snippet-start: delete-map-value
    realm.write([&] { tommy.locationByDay.erase("Tuesday"); });
    // :snippet-end:
    CHECK(tommy.locationByDay.find("Tuesday") == tommy.locationByDay.end());
    // Clean up after test
    realm.write([&] { realm.remove(tommy); });
  }
}

TEST_CASE("test map object with percent-encoded map key", "[write]") {
  auto relative_realm_path_directory = "crud/";
  std::filesystem::create_directories(relative_realm_path_directory);
  std::filesystem::path path =
      std::filesystem::current_path().append(relative_realm_path_directory);
  path = path.append("employee_map_objects");
  path = path.replace_extension("realm");

  auto config = realm::db_config();
  config.set_path(path);  // :remove:
  auto realm = realm::db(std::move(config));

  auto employee = realm::Map_Employee{
      ._id = 8675309, .firstName = "Tommy", .lastName = "Tutone"};

  // :snippet-start: percent-encode-disallowed-characters
  // Percent encode . or $ characters to use them in map keys
  auto mapKey = "Monday.Morning";
  auto encodedMapKey = "Monday%2EMorning";
  // :snippet-end:

  employee.locationByDay = {
      {encodedMapKey, realm::Map_Employee::WorkLocation::HOME},
      {"Monday%2EAfternoon", realm::Map_Employee::WorkLocation::OFFICE}};

  realm.write([&] { realm.add(std::move(employee)); });

  SECTION("Test code example functions as intended") {
    auto employees = realm.objects<realm::Map_Employee>();
    auto employeesNamedTommy = employees.where(
        [](auto &employee) { return employee.firstName == "Tommy"; });
    REQUIRE(employeesNamedTommy.size() >= 1);
    auto tommy = employeesNamedTommy[0];

    auto mondayMorningIterator = tommy.locationByDay.find("Monday%2EMorning");
    CHECK(mondayMorningIterator != tommy.locationByDay.end());

    // Clean up after test
    realm.write([&] { realm.remove(tommy); });
  }
}

TEST_CASE("Test Set Object", "[write]") {
  auto relative_realm_path_directory = "set_repository/";
  std::filesystem::create_directories(relative_realm_path_directory);
  std::filesystem::path path =
      std::filesystem::current_path().append(relative_realm_path_directory);
  path = path.append("repository_objects");
  path = path.replace_extension("realm");
  auto config = realm::db_config();
  config.set_path(path);

  // :snippet-start: write-set-object
  auto realm = realm::db(std::move(config));

  // Create an object that has a set property
  auto docsRealmRepo =
      realm::Set_Repository{.ownerAndName = "mongodb/docs-realm"};

  // Add the object to the database and get the managed object
  auto managedDocsRealm =
      realm.write([&]() { return realm.add(std::move(docsRealmRepo)); });

  // Insert items into the set
  auto openPullRequestNumbers = {3059, 3062, 3064};

  realm.write([&] {
    for (auto number : openPullRequestNumbers) {
      // You can only mutate the set in a write transaction.
      // This means you can't set values at initialization,
      // but must do it during a write.
      managedDocsRealm.openPullRequestNumbers.insert(number);
    }
  });
  // :snippet-end:

  auto it3059 = managedDocsRealm.openPullRequestNumbers.find(3059);
  REQUIRE(*it3059 == static_cast<long long>(3059));

  //    auto it3062 = managedDocsRealm.openPullRequestNumbers.find(3062);
  //    REQUIRE(*it3062 == static_cast<long long>(3062));

  //    auto it3064 = managedDocsRealm.openPullRequestNumbers.find(3064);
  //    REQUIRE(it3064 != managedDocsRealm.openPullRequestNumbers.end());
  //    REQUIRE(*it3064 == static_cast<long long>(3064));

  // :snippet-start: read-set
  auto repositories = realm.objects<realm::Set_Repository>();

  auto repositoriesNamedDocsRealm = repositories.where([](auto &repository) {
    return repository.ownerAndName == "mongodb/docs-realm";
  });

  auto docsRealm = repositoriesNamedDocsRealm[0];

  // You can check the size of the set
  auto numberOfPullRequests = docsRealm.openPullRequestNumbers.size();
  CHECK(numberOfPullRequests == 3);  // :remove:

  // Find an element in the set whose value is 3064
  auto it = managedDocsRealm.openPullRequestNumbers.find(3064);
  // :remove-start:
  CHECK(it != managedDocsRealm.openPullRequestNumbers.end());
  CHECK(*it == static_cast<long long>(3064));
  // :remove-end:

  // Get a copy of the set that exists independent of the managed set
  auto openRealmPullRequests = docsRealm.openPullRequestNumbers.detach();
  // :snippet-end:

  CHECK(openRealmPullRequests == std::set<int64_t>({3059, 3062, 3064}));
  CHECK(openRealmPullRequests.size() == 3);
  CHECK(docsRealm.openPullRequestNumbers.size() == 3);

  // After clearing the copy of the set, the managed set is unchanged
  openRealmPullRequests.clear();
  CHECK(openRealmPullRequests.size() == 0);
  CHECK(docsRealm.openPullRequestNumbers.size() == 3);

  // :snippet-start: update-set
  // Add elements to the set in a write transaction
  realm.write([&] { managedDocsRealm.openPullRequestNumbers.insert(3066); });
  CHECK(managedDocsRealm.openPullRequestNumbers.size() == 4);

  // Use std::set algorithms to update a set
  // In this example, use std::set_union to add elements to the set
  // 3064 already exists, so it won't be added, but 3065 and 3067 are
  // unique values and will be added to the set.
  auto newOpenPullRequests = std::set<int64_t>({3064, 3065, 3067});
  realm.write([&] {
    std::set_union(
        docsRealm.openPullRequestNumbers.begin(),
        docsRealm.openPullRequestNumbers.end(), newOpenPullRequests.begin(),
        newOpenPullRequests.end(),
        std::inserter(managedDocsRealm.openPullRequestNumbers,
                      managedDocsRealm.openPullRequestNumbers.end()));
  });
  CHECK(managedDocsRealm.openPullRequestNumbers.size() == 6);

  // Erase elements from a set
  auto it3065 = managedDocsRealm.openPullRequestNumbers.find(3065);
  CHECK(it3065 != managedDocsRealm.openPullRequestNumbers.end());
  realm.write([&] { managedDocsRealm.openPullRequestNumbers.erase(it3065); });
  // :snippet-end:
  CHECK(managedDocsRealm.openPullRequestNumbers.size() == 5);
  // :snippet-start: delete-set
  // Remove an element from the set with erase()
  auto it3064 = managedDocsRealm.openPullRequestNumbers.find(3064);
  CHECK(it3064 != managedDocsRealm.openPullRequestNumbers.end());
  realm.write([&] { managedDocsRealm.openPullRequestNumbers.erase(it3065); });
  CHECK(managedDocsRealm.openPullRequestNumbers.size() == 4);

  // Clear the entire contents of the set
  realm.write([&] { managedDocsRealm.openPullRequestNumbers.clear(); });
  CHECK(managedDocsRealm.openPullRequestNumbers.size() == 0);
  // :snippet-end:

  realm.write([&] { realm.remove(docsRealm); });
}

TEST_CASE("test string map object", "[model][write]") {
  auto relative_realm_path_directory = "map_dog/";
  std::filesystem::create_directories(relative_realm_path_directory);
  std::filesystem::path path =
      std::filesystem::current_path().append(relative_realm_path_directory);
  path = path.append("dog_map_objects");
  path = path.replace_extension("realm");
  auto config = realm::db_config();
  config.set_path(path);
  auto realm = realm::db(std::move(config));

  auto dog = realm::Map_Dog{.name = "Maui"};

  dog.favoriteParkByCity = {{"Boston", "Fort Point"},
                            {"New York", "Central Park"}};

  SECTION("Test code example functions as intended") {
    realm.write([&] { realm.add(std::move(dog)); });

    auto dogs = realm.objects<realm::Map_Dog>();
    auto dogsNamedMaui =
        dogs.where([](auto &dog) { return dog.name == "Maui"; });
    REQUIRE(dogsNamedMaui.size() >= 1);
    auto maui = dogsNamedMaui[0];
    for (auto [k, v] : maui.favoriteParkByCity) {
      if (k == "Boston")
        CHECK(v == "Fort Point");
      else if (k == "New York")
        CHECK(v == "Central Park");
    }
    // Use `find()` for read-only access as `operator[]` could create an entry
    auto favoriteBostonPark = maui.favoriteParkByCity.find("Boston");
    CHECK(favoriteBostonPark != maui.favoriteParkByCity.end());
    auto favoriteNewYorkPark = maui.favoriteParkByCity["New York"];
    CHECK(favoriteNewYorkPark == "Central Park");
    realm.write(
        [&] { maui.favoriteParkByCity["New York"] = "Some other park"; });
    CHECK(favoriteNewYorkPark == "Some other park");
    realm.write([&] { maui.favoriteParkByCity.erase("New York"); });
    CHECK(maui.favoriteParkByCity.find("New York") ==
          maui.favoriteParkByCity.end());
    // Clean up after test
    realm.write([&] { realm.remove(maui); });
  }
}
// :replace-end:
