realm.executeTransaction { r: Realm ->
    // Create a turtle enthusiast named Ali.
    val ali = r.createObject(TurtleEnthusiast::class.java, ObjectId())
    ali.name = "Ali"
    // Find turtles younger than 2 years old
    val hatchlings =
        r.where(Turtle::class.java).lessThan("age", 2).findAll()
    // Give all hatchlings to Ali.
    hatchlings.setObject("owner", ali)
}
