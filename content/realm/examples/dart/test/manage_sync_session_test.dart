import 'dart:async';

import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import './utils.dart';

part 'manage_sync_session_test.realm.dart';

const APP_ID = "flutter-flexible-luccm";
late App app;
late Realm realm;
late User user;

@RealmModel()
class _Car {
  @MapTo('_id')
  @PrimaryKey()
  late ObjectId id;

  late String make;
  late String? model;
  late int? miles;
}

main() {
  app = App(AppConfiguration(APP_ID));
  setUp(() async {
    user = await app.logIn(Credentials.anonymous());
    final config = Configuration.flexibleSync(user, [Car.schema]);
    realm = await Realm.open(config);
    realm.subscriptions.update((mutableSubscriptions) {
      mutableSubscriptions.add(realm.all<Car>());
    });
    await realm.subscriptions.waitForSynchronization();
  });
  tearDown(() async {
    await cleanUpRealm(realm, app);
  });
  group("Manage sync session - ", () {
    test("Wait for changes to upload and download", () async {
      // Ensure there aren't any car objects in the on-device database.
      realm.write(() {
        realm.deleteAll<Car>();
      });
      await realm.syncSession.waitForUpload();

      // :snippet-start: wait-upload-download
      // Wait to download all pending changes from Atlas
      await realm.syncSession.waitForDownload();

      // :remove-start:
      final syncProgress = realm.syncSession.getProgressStream(
          ProgressDirection.upload, ProgressMode.forCurrentlyOutstandingWork);
      bool called = false;
      dynamic streamListener;
      streamListener = syncProgress.listen((syncProgressEvent) {
        if (called == false) {
          print(syncProgressEvent.progressEstimate);
          expect(syncProgressEvent.progressEstimate > 0.0, isTrue);
          expect(syncProgressEvent.progressEstimate > 0.0, isTrue);
          called = true;
          streamListener.cancel();
        }
      });

      // :remove-end:
      // Add data locally
      realm.write(() {
        realm.addAll<Car>([
          Car(ObjectId(), "Hyundai"),
          Car(ObjectId(), "Kia"),
          Car(ObjectId(), "Lincoln")
        ]);
      });
      // Wait for changes to upload to Atlas before continuing execution.
      await realm.syncSession.waitForUpload();
      // :snippet-end:
      expect(called, isTrue);
    });

    test("Pause and resume sync session", () async {
      // :snippet-start: pause-resume-sync
      // Pause the sync session
      realm.syncSession.pause();
      expect(realm.syncSession.state, SessionState.inactive); // :remove:

      // Data that you add while the sync session is paused does not sync to Atlas.
      // However, the data is still added to the realm locally.
      realm.write(() {
        realm.addAll<Car>([
          Car(ObjectId(), "Volvo"),
          Car(ObjectId(), "Genesis"),
          Car(ObjectId(), "VW")
        ]);
      });

      // Resume sync session. Now, the data you wrote to the realm
      // syncs to Atlas.
      realm.syncSession.resume();
      // :snippet-end:
      expect(realm.syncSession.state, SessionState.active);
    });

    test("Monitor sync progress", () async {
      var isCalled = false;
      realm.write(() {
        realm.addAll<Car>([
          Car(ObjectId(), "Volvo"),
          Car(ObjectId(), "Genesis"),
          Car(ObjectId(), "VW")
        ]);
      });
      // :snippet-start: monitor-progress
      final stream = realm.syncSession.getProgressStream(
          ProgressDirection.upload, ProgressMode.forCurrentlyOutstandingWork);
      double progressEstimate = -1;
      late StreamSubscription streamListener;
      streamListener = stream.listen((syncProgressEvent) {
        progressEstimate = syncProgressEvent.progressEstimate;

        if (progressEstimate < 1.0) {
          print('Upload progress: ${progressEstimate * 100}%');
        }
      }, onDone: () {
        print('Upload progress: ${progressEstimate * 100}%');
        print("Upload complete");
        isCalled = true; // :remove:
      }, onError: (error) {
        print("An error occurred: $error");
        streamListener.cancel();
      });
      // :snippet-end:
      await Future.delayed(Duration(seconds: 1));
      expect(isCalled, isTrue);
    });

    test("Monitor network connection", () async {
      var isConnected = false;
      // :snippet-start: get-network-connection
      if (realm.syncSession.connectionState == ConnectionState.connected) {
        // ... do stuff
        isConnected = true; // :remove:
      }
      // :snippet-end:
      // :snippet-start: monitor-network-connection
      final connectionStream = realm.syncSession.connectionStateChanges;
      late StreamSubscription streamListener;
      streamListener = connectionStream.listen((connectionStateChange) {
        if (connectionStateChange.current == ConnectionState.connected) {
          print("Connected to Atlas Device Sync server");
          streamListener.cancel();
        }
      });
      // :snippet-end:
      streamListener.cancel();
      expect(isConnected, isTrue);
    });

    test("Manually reconnect all sync sessions", () async {
      final session = realm.syncSession;

      session.pause();
      expect(session.connectionState, ConnectionState.disconnected);

      expectLater(
        session.connectionStateChanges.map((c) => c.current).distinct(),
        emitsInOrder(<ConnectionState>[
          ConnectionState.connecting,
          ConnectionState.connected,
        ]),
      );

      session.resume();

      // :snippet-start: session-reconnect
      app.reconnect();
      // :snippet-end:
      expect(session.connectionState, ConnectionState.connected);
    });
  });

  // This test should be at the end of the file. It cancels the sync
  // session, which tests above rely on.
  test("Cancel waiting for upload or download", () async {
    // :snippet-start: cancel-waitfor
    final cancellationToken = CancellationToken();

    final waitForDownloadFuture =
        realm.syncSession.waitForDownload(cancellationToken);
    cancellationToken.cancel();

    final waitForUploadFuture =
        realm.syncSession.waitForUpload(cancellationToken);
    cancellationToken.cancel();
    // :snippet-end:

    expect(() async => await waitForDownloadFuture,
        throwsA(isA<CancelledException>()));
    expect(() async => await waitForUploadFuture,
        throwsA(isA<CancelledException>()));
  });
}
