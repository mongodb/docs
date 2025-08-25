import 'dart:async';
import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import './utils.dart';
part 'data_ingest.test.realm.dart';

// :snippet-start: asymmetric-sync-object
@RealmModel(ObjectType.asymmetricObject)
class _WeatherSensor {
  @PrimaryKey()
  @MapTo("_id")
  late ObjectId id;

  late String deviceId;
  late double modtemperatureInFahrenheitel;
  late double barometricPressureInHg;
  late double windSpeedInMph;
}
// :snippet-end:

void main() {
  // Because the Flutter/Dart SDK doesn't have a mongoClient yet,
  // we can't test that asymmetric objects exist in the backend.
  group('Create asymmetric abject and use Data Ingest', () {
    const appId = "flutter-flexible-luccm";
    final appConfig = AppConfiguration(appId);
    final app = App(appConfig);

    test("Create asymmetric object locally", () async {
      final credentials = Credentials.anonymous();
      final currentUser = await app.logIn(credentials);
      final config = Configuration.flexibleSync(
          currentUser, [WeatherSensor.schema],
          path: 'flex.realm');
      final realm = Realm(config);

      expect(realm.isClosed, false);
      expect(app.currentUser?.id != null, true);

      realm.syncSession.pause();

      final weatherSensorId = ObjectId();

      // :snippet-start: write-asymmetric-object
      realm.write(() {
        realm.ingest(
            WeatherSensor(weatherSensorId, "WX1278UIT", 66.7, 29.65, 2));
      });
      // :snippet-end:

      print(realm.dynamic.find('WeatherSensor', weatherSensorId));

      // Resume sync session and wait for WeatherSensor to be uploaded
      // and then deleted locally.
      realm.syncSession.resume();
      await realm.syncSession.waitForUpload();

      // Check that the Asymmetric object no longer exists locally
      expect(realm.dynamic.find('WeatherSensor', weatherSensorId), null);

      await cleanUpRealm(realm, app);
      expect(realm.isClosed, true);
      expect(app.currentUser, null);
    });
  });
}
