realm.executeTransaction(r -> {
    // Create a turtle enthusiast named Josephine.
    TurtleEnthusiast josephine = r.createObject(TurtleEnthusiast.class, new ObjectId());
    josephine.setName("Josephine");

    // Get all turtles named "Pierogi".
    RealmResults<Turtle> turtles = r.where(Turtle.class).equalTo("name", "Pierogi").findAll();

    // Give all turtles named "Pierogi" to Josephine
    turtles.setObject("owner", josephine);
});
