// Wait to download all pending changes from Atlas
await realm.syncSession.waitForDownload();

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
