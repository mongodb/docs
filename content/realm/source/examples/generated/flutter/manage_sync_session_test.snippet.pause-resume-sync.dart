// Pause the sync session
realm.syncSession.pause();

// Data that you add while the sync session is paused does not sync to Atlas.
// However, the data is still added to the realm locally.
realm.write(() {
  realm.addAll<Car>([
    Car(ObjectId(), "Volvo"),
    Car(ObjectId(), "Genesis"),
    Car(ObjectId(), "VW")
  ]);
});

// Resume sync session. Now, the data you wrote to the realm
// syncs to Atlas.
realm.syncSession.resume();
