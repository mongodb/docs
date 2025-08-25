void handleCompensatingWrite(
    CompensatingWriteError compensatingWriteError) {
  final writeReason = compensatingWriteError.compensatingWrites!.first;

  print("Error message: ${writeReason.reason}");
  // ... handle compensating write error as needed.
}

final config = Configuration.flexibleSync(currentUser, [Car.schema],
    syncErrorHandler: (syncError) {
  if (syncError is CompensatingWriteError) {
    handleCompensatingWrite(syncError);
  }
});

final realm = Realm(config);
