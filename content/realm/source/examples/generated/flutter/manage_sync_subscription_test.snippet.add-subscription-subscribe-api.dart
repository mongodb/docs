final boatQuery = realm.all<Boat>();
final bigPlaneQuery = realm.query<Plane>("numSeats > 100");

final boatSubscription = await boatQuery.subscribe(name: "boats");
final planeSubscription =
    await bigPlaneQuery.subscribe(name: "big-planes");
