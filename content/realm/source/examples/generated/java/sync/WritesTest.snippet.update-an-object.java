realm.executeTransaction(r -> {
    // Get a turtle to update.
    Turtle turtle = r.where(Turtle.class).findFirst();
    // Update properties on the instance.
    // This change is saved to the realm.
    turtle.setName("Archibald");
    turtle.setAge(101);
});
