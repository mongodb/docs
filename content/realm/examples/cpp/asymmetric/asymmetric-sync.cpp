#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>
#include <nlohmann/json.hpp>

static const std::string APP_ID = "cpp-tester-uliix";

namespace realm {
// :snippet-start: asymmetric-object
struct WeatherSensorReading {
  realm::primary_key<realm::object_id> _id{realm::object_id::generate()};
  std::string deviceId;
  double temperatureInFahrenheit;
  int64_t windSpeedInMph;
};
REALM_ASYMMETRIC_SCHEMA(WeatherSensorReading, _id, deviceId,
                        temperatureInFahrenheit, windSpeedInMph)
// :snippet-end:
}  // namespace realm

TEST_CASE("Asymmetric object example", "[write][sync]") {
  // :snippet-start: connect-and-authenticate
  auto appConfig = realm::App::configuration();
  appConfig.app_id = APP_ID;
  auto app = realm::App(appConfig);
  auto user = app.login(realm::App::credentials::anonymous()).get();
  // :snippet-end:
  // :snippet-start: open-asymmetric-synced-realm
  auto syncConfig = user.flexible_sync_configuration();
  auto realm = realm::open<realm::WeatherSensorReading>(syncConfig);
  // :snippet-end:

  // Doing this for simplicity in testing, but should not be relevant to
  // dev code examples, so hiding it.
  const realm::object_id oid = realm::object_id::generate();

  // :snippet-start: create-asymmetric-object
  auto weatherSensorReading =
      realm::WeatherSensorReading{.deviceId = "WX1278UIT",
                                  ._id = oid,  // :remove:
                                  .temperatureInFahrenheit = 64.7,
                                  .windSpeedInMph = 7};

  realm.write([&] { realm.add(std::move(weatherSensorReading)); });
  // :snippet-end:
  realm.get_sync_session()->wait_for_upload_completion().get();

  SECTION("Test asymmetric object has persisted") {
    // Check that the asymmetric data got inserted
    // Because we don't have MongoClient, we have to use a function
    nlohmann::json jsonOid;
    jsonOid.push_back(oid.to_string());
    std::string jsonOidString = jsonOid.dump();
    auto getAsymmetricDataResult =
        user.call_function("getAsymmetricSyncData", jsonOidString).get();
    CHECK(getAsymmetricDataResult);
    auto asymmetricDataObject =
        nlohmann::json::parse(getAsymmetricDataResult.value());
    CHECK(asymmetricDataObject[0]["_id"]["$oid"] == oid.to_string());
    //   Delete the asymmetric data to clean up after the test
    auto deleteAsymmetricDataResult =
        user.call_function("deleteAsymmetricSyncData", jsonOidString).get();
    CHECK(deleteAsymmetricDataResult);
  }
}
