realm.executeTransaction { r: Realm ->
    // Get a turtle named "Tony".
    var tony = r.where(Turtle::class.java)
        .equalTo("name", "Tony")
        .findFirst()
    tony!!.deleteFromRealm()
    // discard the reference
    tony = null
}
