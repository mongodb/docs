realm.executeTransaction(r -> {
    // Get a turtle named "Tony".
    Turtle tony = r.where(Turtle.class).equalTo("name", "Tony").findFirst();
    tony.deleteFromRealm();
    // discard the reference
    tony = null;
});
