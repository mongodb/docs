final bigPlaneQuery = realm.query<Plane>("numSeats > 200");

final planeSubscription = await bigPlaneQuery.subscribe(
  name: "alwaysWaitSync",
  waitForSyncMode: WaitForSyncMode.always,
  cancellationToken: TimeoutCancellationToken(Duration(seconds: 5)),
);
