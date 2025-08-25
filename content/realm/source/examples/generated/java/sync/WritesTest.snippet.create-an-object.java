realm.executeTransaction(r -> {
    // Instantiate the class using the factory function.
    Turtle turtle = r.createObject(Turtle.class, new ObjectId());
    // Configure the instance.
    turtle.setName("Max");
    // Create a TurtleEnthusiast with a primary key.
    ObjectId primaryKeyValue = new ObjectId();
    TurtleEnthusiast turtleEnthusiast = r.createObject(TurtleEnthusiast.class, primaryKeyValue);
});
