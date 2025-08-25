var frog: Frog? = null

realm.executeTransaction { r: Realm? ->
    frog = realm.createObject(Frog::class.java)
    frog?.name = "Jonathan Livingston Applesauce"
}

val objectChangeListener
        = RealmObjectChangeListener<Frog> { frog, changeSet ->
    if (changeSet != null) {
        Log.v("EXAMPLE", "Changes to fields: " +
                changeSet.changedFields)
        if (changeSet.isFieldChanged("best_friend")) {
            Log.v("EXAMPLE", "RealmAny best friend field changed to : " +
                    frog.bestFriendToString())
        }
    }
}

frog?.addChangeListener(objectChangeListener)

realm.executeTransaction { r: Realm? ->
    // set RealmAny field to a null value
    frog?.bestFriend = RealmAny.nullValue()
    Log.v("EXAMPLE", "Best friend: " + frog?.bestFriendToString())

    // set RealmAny field to a string with RealmAny.valueOf a string value
    frog?.bestFriend = RealmAny.valueOf("Greg")
}
