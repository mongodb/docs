realm.executeTransaction(r -> {
    r.delete(Turtle.class);
});
