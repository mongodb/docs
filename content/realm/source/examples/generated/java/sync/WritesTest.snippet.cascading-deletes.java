realm.executeTransaction(r -> {
    // Find a turtle enthusiast named "Ali"
    TurtleEnthusiast ali = r.where(TurtleEnthusiast.class).equalTo("name", "Ali").findFirst();
    // Delete all of ali's turtles
    ali.getTurtles().deleteAllFromRealm();
    ali.deleteFromRealm();
});
