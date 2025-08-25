realm.executeTransaction { r: Realm ->
    // Get a turtle to update.
    val turtle = r.where(Turtle::class.java).findFirst()
    // Update properties on the instance.
    // This change is saved to the realm.
    turtle!!.name = "Archibald"
    turtle.age = 101
}
