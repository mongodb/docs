realm.executeTransaction { r: Realm ->
    // Find turtles older than 2 years old.
    val oldTurtles = r.where(Turtle::class.java)
        .greaterThan("age", 2)
        .findAll()
    oldTurtles.deleteAllFromRealm()
}
