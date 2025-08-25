var frog: Frog? = null
realm.executeTransaction { r: Realm? ->
    frog = realm.createObject(Frog::class.java)
    frog?.name = "Jonathan Livingston Applesauce"
}

val mapChangeListener: MapChangeListener<String, Frog>
        = MapChangeListener<String, Frog> { map, changes ->
    for (insertion in changes.insertions) {
        Log.v("EXAMPLE",
                "Inserted key:  $insertion, Inserted value: ${map[insertion]!!.name}")
    }
}

frog?.nicknamesToFriends?.addChangeListener(mapChangeListener)

realm.executeTransaction { r: Realm? ->
    // get the RealmDictionary field from the object we just created
    val dictionary = frog!!.nicknamesToFriends

    // add key/value to the dictionary
    val wirt = realm.createObject(Frog::class.java)
    wirt.name = "Wirt"
    dictionary["tall frog"] = wirt

    // add multiple keys/values to the dictionary
    val greg = realm.createObject(Frog::class.java)
    greg.name = "Greg"
    val beatrice = realm.createObject(Frog::class.java)
    beatrice.name = "Beatrice"
    dictionary.putAll(mapOf<String, Frog>(
            Pair("small frog", greg),
            Pair("feathered frog", beatrice)))
}
