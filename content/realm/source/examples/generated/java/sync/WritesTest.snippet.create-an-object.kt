realm.executeTransaction { r: Realm ->
    // Instantiate the class using the factory function.
    val turtle = r.createObject(Turtle::class.java, ObjectId())
    // Configure the instance.
    turtle.name = "Max"
    // Create a TurtleEnthusiast with a primary key.
    val primaryKeyValue = ObjectId()
    val turtleEnthusiast = r.createObject(
        TurtleEnthusiast::class.java,
        primaryKeyValue
    )
}
