import Realm, { BSON } from "realm";

const app = new Realm.App({ id: "js-flexible-oseso" });

// :snippet-start: asymmetric-sync-object
class WeatherSensor extends Realm.Object {
  static schema = {
    name: "WeatherSensor",
    // Sync WeatherSensor objects one way from your device
    // to your Atlas database.
    asymmetric: true,
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      deviceId: "string",
      temperatureInFahrenheit: "int",
      barometricPressureInHg: "float",
      windSpeedInMph: "float",
    },
  };
}
// :snippet-end:

describe("Asymmetric Sync", () => {
  beforeAll(async () => {
    // Close and remove all realms in the default directory.
    Realm.clearTestState();

    const credentials = Realm.Credentials.anonymous();
    await app.logIn(credentials);
  });

  afterAll(async () => {
    app.currentUser?.logOut;
  });

  test("create asymmetric object", async () => {
    if (!app.currentUser) {
      return;
    }

    const weatherSensorPrimaryKey = new BSON.ObjectID();

    const realm = await Realm.open({
      schema: [WeatherSensor],
      sync: {
        user: app.currentUser,
        flexible: true,
      },
    });

    realm.write(() => {
      realm.create(WeatherSensor, {
        _id: weatherSensorPrimaryKey,
        deviceId: "WX1278UIT",
        temperatureInFahrenheit: 66.7,
        barometricPressureInHg: 29.65,
        windSpeedInMph: 2,
      });
    });

    const weatherSensorCollection = await getWeatherSensors();
    const weatherSensor = await weatherSensorCollection.findOne({
      _id: weatherSensorPrimaryKey,
    });

    expect(weatherSensor?._id).toEqual(weatherSensorPrimaryKey);

    // Delete weather sensor documents.
    await weatherSensorCollection.deleteMany({
      deviceId: "WX1278UIT",
    });

    const numberOfWeatherSensorDocuments =
      await weatherSensorCollection.count();

    expect(numberOfWeatherSensorDocuments).toBe(0);

    realm.close();

    function getWeatherSensors() {
      return new Promise((resolve) => {
        // Wait for weather sensor document to sync, then
        // use mongo client to verify it was created.
        setTimeout(() => {
          const mongodb = app.currentUser.mongoClient("mongodb-atlas");
          const asyncWeatherSensors = mongodb
            .db("JSFlexibleSyncDB")
            .collection("WeatherSensor");

          resolve(asyncWeatherSensors);
        }, 400);
      });
    }
  });
});
