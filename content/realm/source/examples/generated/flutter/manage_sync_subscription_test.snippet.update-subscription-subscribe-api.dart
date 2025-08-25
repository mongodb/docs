final updatedPlaneQuery = realm.query<Plane>("numSeats > 200");

final planeSubscription =
    await updatedPlaneQuery.subscribe(name: "big-planes", update: true);
