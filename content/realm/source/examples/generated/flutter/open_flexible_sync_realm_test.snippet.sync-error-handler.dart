final config = Configuration.flexibleSync(currentUser, [Car.schema],
    syncErrorHandler: (SyncError error) {
  print("Error message${error.message}");
});

final realm = Realm(config);
