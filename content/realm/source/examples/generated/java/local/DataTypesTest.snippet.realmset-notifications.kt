var frog :Frog? = null
realm.executeTransaction { r: Realm? ->
    frog = realm.createObject(Frog::class.java)
    frog?.name = "Jonathan Livingston Applesauce"
}

val setChangeListener: SetChangeListener<Snack>
        = SetChangeListener<Snack> { set, changes ->
    Log.v("EXAMPLE", "Set changed: " +
            changes.numberOfInsertions + " new items, " +
            changes.numberOfDeletions + " items removed.")
}
frog?.favoriteSnacks?.addChangeListener(setChangeListener)

realm.executeTransaction { r: Realm? ->
    // get the RealmSet field from the object we just created
    val set = frog!!.favoriteSnacks

    // add value to the RealmSet
    val flies = realm.createObject(Snack::class.java)
    flies.name = "flies"
    set.add(flies)

    // add multiple values to the RealmSet
    val water = realm.createObject(Snack::class.java)
    water.name = "water"
    val verySmallRocks = realm.createObject(Snack::class.java)
    verySmallRocks.name = "verySmallRocks"
    set.addAll(Arrays.asList(water, verySmallRocks))
}
