final token = CancellationToken();

// Cancel the open operation after 30 seconds.
// Alternatively, you could display a loading dialog and bind the cancellation
// to a button the user can click to stop the wait.
Future<void>.delayed(
    const Duration(seconds: 30),
    () => token.cancel(CancelledException(
        cancellationReason: "Realm took too long to open")));

// If realm does not open after 30 seconds with asynchronous Realm.open(),
// open realm immediately with Realm() and try to sync data in the background.
late Realm realm;
try {
  realm = await Realm.open(config, cancellationToken: token);
} on CancelledException catch (err) {
  print(err.cancellationReason); // prints "Realm took too long to open"
  realm = Realm(config);
}
