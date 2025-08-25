realm.executeTransaction { r: Realm ->
    // Create a turtle enthusiast named Josephine.
    val josephine = realm.createObject(
        TurtleEnthusiast::class.java,
        ObjectId()
    )
    josephine.name = "Josephine"

    // Get all turtles named "Pierogi".
    val turtles = r.where(Turtle::class.java)
        .equalTo("name", "Pierogi")
        .findAll()

    // Give all turtles named "Pierogi" to Josephine
    turtles.setObject("owner", josephine)
}
