realm.executeTransaction(r -> {
    // Find turtles older than 2 years old.
    RealmResults<Turtle> oldTurtles = r.where(Turtle.class).greaterThan("age", 2).findAll();
    oldTurtles.deleteAllFromRealm();
});
