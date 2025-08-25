final bigPlaneQuery = realm.query<Plane>("numSeats > 100");

final planeSubscription = await bigPlaneQuery.subscribe(
  name: "firstTimeSync",
  waitForSyncMode: WaitForSyncMode.firstTime,
);
