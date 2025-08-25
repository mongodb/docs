realm.executeTransaction { r: Realm ->
    // Find a turtle enthusiast named "Ali"
    val ali = r.where(TurtleEnthusiast::class.java)
        .equalTo("name", "Ali").findFirst()
    // Delete all of ali's turtles
    ali!!.turtles!!.deleteAllFromRealm()
    ali.deleteFromRealm()
}
