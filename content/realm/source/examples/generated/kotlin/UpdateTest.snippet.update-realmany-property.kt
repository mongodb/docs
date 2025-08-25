// Find favoriteThing that is an Int
// Convert the value to Double and update the favoriteThing property
realm.write {
val kermit = query<Frog>().find().first()
val realmAny: RealmList<RealmAny?> = kermit.favoriteThings

    for (i in realmAny.indices) {
        val thing = realmAny[i]
        if (thing?.type == RealmAny.Type.INT) {
            val intValue = thing.asInt()
            val doubleValue = intValue.toDouble()
               realmAny[i] = RealmAny.create(doubleValue)
        }
    }
}

// Overwrite all existing favoriteThing properties
// ** Null clears the property value **
realm.write {
    val frog = query<Frog>().find().first()
    val realmAny: RealmList<RealmAny?> = frog.favoriteThings

    realmAny[0] = RealmAny.create("sunshine")
    realmAny[1] = RealmAny.create(Frog().apply { name = "Kermit Sr." })
    realmAny[2] = null
}
