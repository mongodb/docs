#include <catch2/catch_test_macros.hpp>
#include <chrono>
#include <cpprealm/sdk.hpp>
#include <string>
#include <vector>

// :replace-start: {
//   "terms": {
//     "Map_": ""
//   }
// }

namespace realm {
struct AllTypesObject {
  using SomeType = std::string;

  enum class Enum { one, two };

  // :snippet-start: required-bool
  bool boolName;
  // :snippet-end:
  // :snippet-start: optional-bool
  std::optional<bool> optBoolName;
  // :snippet-end:
  // :snippet-start: required-int
  int64_t intName;
  // :snippet-end:
  // :snippet-start: optional-int
  std::optional<int64_t> optIntName;
  // :snippet-end:
  // :snippet-start: required-double
  double doubleName;
  // :snippet-end:
  // :snippet-start: optional-double
  std::optional<double> optDoubleName;
  // :snippet-end:
  // :snippet-start: required-string
  std::string stringName;
  // :snippet-end:
  // :snippet-start: optional-string
  std::optional<std::string> optStringName;
  // :snippet-end:
  // :snippet-start: required-enum
  Enum enumName;
  // :snippet-end:
  // :snippet-start: optional-enum
  std::optional<Enum> optEnumName;
  // :snippet-end:
  // :snippet-start: required-binary-data
  std::vector<std::uint8_t> binaryDataName;
  // :snippet-end:
  // :snippet-start: optional-binary-data
  std::optional<std::vector<std::uint8_t>> optBinaryDataName;
  // :snippet-end:
  // :snippet-start: required-date
  std::chrono::time_point<std::chrono::system_clock> dateName;
  // :snippet-end:
  // :snippet-start: optional-date
  std::optional<std::chrono::time_point<std::chrono::system_clock>> optDateName;
  // :snippet-end:
  // :snippet-start: required-decimal128
  realm::decimal128 decimal128Name;
  // :snippet-end:
  // :snippet-start: optional-decimal128
  std::optional<realm::decimal128> optDecimal128Name;
  // :snippet-end:
  // :snippet-start: required-uuid
  realm::uuid uuidName;
  // :snippet-end:
  // :snippet-start: optional-uuid
  std::optional<realm::uuid> optUuidName;
  // :snippet-end:
  // :snippet-start: required-object-id
  realm::object_id objectIdName;
  // :snippet-end:
  // :snippet-start: optional-object-id
  std::optional<realm::object_id> optObjectIdName;
  // :snippet-end:
  // :snippet-start: required-mixed-type
  realm::mixed mixedName;
  // :snippet-end:
  // :snippet-start: required-map-type
  std::map<std::string, SomeType> mapName;
  // :snippet-end:
  // :snippet-start: required-list
  std::vector<SomeType> listTypeName;
  // :snippet-end:
  // :snippet-start: required-set
  std::set<SomeType> setTypeName;
  // :snippet-end:
};
REALM_SCHEMA(AllTypesObject, boolName, optBoolName, intName, optIntName,
             doubleName, optDoubleName, stringName, optStringName, enumName,
             optEnumName, binaryDataName, optBinaryDataName, dateName,
             optDateName, decimal128Name, optDecimal128Name, uuidName,
             optUuidName, objectIdName, optObjectIdName, mixedName, mapName,
             listTypeName, setTypeName)
}  // namespace realm

TEST_CASE("Test supported types", "[model][write]") {
  auto relative_realm_path_directory = "supported_types/";
  std::filesystem::create_directories(relative_realm_path_directory);
  std::filesystem::path path =
      std::filesystem::current_path().append(relative_realm_path_directory);
  path = path.append("all_types_objects");
  path = path.replace_extension("realm");
  auto config = realm::db_config();
  config.set_path(path);

  SECTION("Required supported types") {
    auto realm = realm::db(std::move(config));
    auto date = std::chrono::time_point<std::chrono::system_clock>();
    auto uuid = realm::uuid();
    auto objectId = realm::object_id::generate();
    auto decimal = realm::decimal128(123.456);

    auto allRequiredTypesObject = realm::AllTypesObject{
        .boolName = true,
        .intName = 1,
        .doubleName = 1.1,
        .stringName = "Fluffy",
        .enumName = realm::AllTypesObject::Enum::one,
        .binaryDataName = std::vector<uint8_t>{0, 1, 2},
        .dateName = date,
        .decimal128Name = decimal,
        .uuidName = uuid,
        .objectIdName = objectId,
        .mixedName = realm::mixed("mixed data"),
        .mapName = std::map<std::string, std::string>({{"foo", "bar"}}),
        .listTypeName = std::vector<std::string>({"bar", "baz"}),
        .setTypeName = {"Lita", "Maui", "Ash"}};

    realm.write([&] { realm.add(std::move(allRequiredTypesObject)); });

    auto allTypeObjects = realm.objects<realm::AllTypesObject>();
    REQUIRE(allTypeObjects.size() == 1);
    auto specificAllTypeObjects = allTypeObjects[0];
    REQUIRE(specificAllTypeObjects.boolName == true);
    REQUIRE(specificAllTypeObjects.intName == 1);
    REQUIRE(specificAllTypeObjects.doubleName == 1.1);
    REQUIRE(specificAllTypeObjects.stringName == "Fluffy");
    REQUIRE(*specificAllTypeObjects.enumName ==
            realm::AllTypesObject::Enum::one);
    REQUIRE(specificAllTypeObjects.binaryDataName ==
            std::vector<uint8_t>{0, 1, 2});
    REQUIRE(specificAllTypeObjects.dateName == date);
    REQUIRE(specificAllTypeObjects.decimal128Name == decimal);
    REQUIRE(specificAllTypeObjects.uuidName == uuid);
    REQUIRE(specificAllTypeObjects.objectIdName == objectId);
    REQUIRE(*specificAllTypeObjects.mixedName == realm::mixed("mixed data"));
    REQUIRE(specificAllTypeObjects.mapName["foo"] == "bar");
    REQUIRE(specificAllTypeObjects.listTypeName[0] == "bar");

    auto it = specificAllTypeObjects.setTypeName.find("Lita");
    REQUIRE(it != specificAllTypeObjects.setTypeName.end());
    REQUIRE(*it == "Lita");

    realm.write([&] { realm.remove(specificAllTypeObjects); });
    auto allTypeObjectsAfterDeletingSpecificObject =
        realm.objects<realm::AllTypesObject>();
    REQUIRE(allTypeObjectsAfterDeletingSpecificObject.size() == 0);
  }

  SECTION("Optional supported types", "[model][write]") {
    auto realm = realm::db(std::move(config));
    auto date = std::chrono::time_point<std::chrono::system_clock>();
    auto uuid = realm::uuid();
    auto objectId = realm::object_id::generate();
    auto decimal = realm::decimal128(123.456);
    auto decimal2 = realm::decimal128(789.012);

    auto allRequiredAndOptionalTypesObject = realm::AllTypesObject{
        .boolName = true,
        .intName = 1,
        .doubleName = 1.1,
        .stringName = "Fluffy",
        .enumName = realm::AllTypesObject::Enum::one,
        .binaryDataName = std::vector<uint8_t>{0, 1, 2},
        .dateName = date,
        .decimal128Name = decimal,
        .uuidName = uuid,
        .objectIdName = objectId,
        .mixedName = realm::mixed("mixed data"),
        .mapName = std::map<std::string, std::string>({{"foo", "bar"}}),
        .listTypeName = std::vector<std::string>({"bar", "baz"}),
        .optBoolName = false,
        .optIntName = 42,
        .optDoubleName = 42.42,
        .optStringName = "Maui",
        .optEnumName = realm::AllTypesObject::Enum::two,
        .optDecimal128Name = decimal2,
        .optUuidName = uuid,
        .optObjectIdName = objectId,
        .optBinaryDataName = std::vector<uint8_t>{3, 4, 5},
        .optDateName = date};

    realm.write(
        [&] { realm.add(std::move(allRequiredAndOptionalTypesObject)); });

    auto allTypeObjects = realm.objects<realm::AllTypesObject>();
    auto specificAllTypeObjects = allTypeObjects[0];
    REQUIRE(specificAllTypeObjects.boolName == true);
    REQUIRE(specificAllTypeObjects.intName == 1);
    REQUIRE(specificAllTypeObjects.doubleName == 1.1);
    REQUIRE(specificAllTypeObjects.stringName == "Fluffy");
    REQUIRE(*specificAllTypeObjects.enumName ==
            realm::AllTypesObject::Enum::one);
    REQUIRE(specificAllTypeObjects.binaryDataName ==
            std::vector<uint8_t>{0, 1, 2});
    REQUIRE(specificAllTypeObjects.dateName == date);
    REQUIRE(specificAllTypeObjects.decimal128Name == decimal);
    REQUIRE(specificAllTypeObjects.uuidName == uuid);
    REQUIRE(specificAllTypeObjects.objectIdName == objectId);
    REQUIRE(*specificAllTypeObjects.mixedName == realm::mixed("mixed data"));
    REQUIRE(specificAllTypeObjects.mapName["foo"] == "bar");
    REQUIRE(specificAllTypeObjects.listTypeName[0] == "bar");
    REQUIRE(specificAllTypeObjects.optBoolName == false);
    REQUIRE(*specificAllTypeObjects.optIntName == 42);
    REQUIRE(specificAllTypeObjects.optDoubleName == 42.42);
    REQUIRE(specificAllTypeObjects.optStringName == "Maui");
    REQUIRE(*specificAllTypeObjects.optEnumName ==
            realm::AllTypesObject::Enum::two);
    REQUIRE(specificAllTypeObjects.optDecimal128Name == decimal2);
    REQUIRE(specificAllTypeObjects.optUuidName == uuid);
    REQUIRE(specificAllTypeObjects.optObjectIdName == objectId);
    REQUIRE(specificAllTypeObjects.optBinaryDataName ==
            std::vector<uint8_t>({3, 4, 5}));
    REQUIRE(specificAllTypeObjects.optDateName == date);

    realm.write([&] { realm.remove(specificAllTypeObjects); });
  }
}
// :replace-end:
