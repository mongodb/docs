// Create an App instance once on main isolate,
// ideally as soon as the app starts
final appConfig = AppConfiguration(appId);
final app = App(appConfig);
final receivePort = ReceivePort();

// Later, access the App instance on background isolate
await Isolate.spawn((List<Object> args) async {
  final sendPort = args[0] as SendPort;
  final appId = args[1] as String;

  try {
    final backgroundApp = App.getById(appId); 

    // ... Access App users
    final user = backgroundApp?.currentUser!;

    // Use the App and user as needed.

    sendPort.send('Background task completed');
  } catch (e) {
    sendPort.send('Error: $e');
  }
}, [receivePort.sendPort, appId]);
