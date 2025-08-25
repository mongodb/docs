// Helper function to check if device is connected to the internet.
Future<bool> isDeviceOnline() async {
  // ...logic to check if device is online
}

final config = Configuration.flexibleSync(currentUser, [Tricycle.schema]);
// Only use asynchronous open if app is online.
late Realm realm;
if (await isDeviceOnline()) {
  // If the device is online, download changes and then open the realm.
  realm = await Realm.open(config);
} else {
  // If the device is offline, open the realm immediately
  // and automatically sync changes in the background when the device is online.
  realm = Realm(config);
}
