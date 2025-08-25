realm.executeTransaction(r -> {
    // Create a turtle enthusiast named Ali.
    TurtleEnthusiast ali = r.createObject(TurtleEnthusiast.class, new ObjectId());
    ali.setName("Ali");
    // Find turtles younger than 2 years old
    RealmResults<Turtle> hatchlings = r.where(Turtle.class).lessThan("age", 2).findAll();
    // Give all hatchlings to Ali.
    hatchlings.setObject("owner", ali);
});
