// Create a dog in the realm.
var dog = Dog()
realm.executeTransaction { transactionRealm ->
    dog = transactionRealm.createObject(Dog::class.java, ObjectId())
    dog.name = "Max"
}

// Set up the listener.
val listener = RealmObjectChangeListener { changedDog: Dog?, changeSet: ObjectChangeSet? ->
    if (changeSet!!.isDeleted) {
        Log.i("EXAMPLE", "The dog was deleted")
    } else {
        for (fieldName in changeSet.changedFields) {
            Log.i(
                "EXAMPLE",
                "Field '$fieldName' changed."
            )
        }
    }
}

// Observe object notifications.
dog.addChangeListener(listener)

// Update the dog to see the effect.
realm.executeTransaction { r: Realm? ->
    dog.name = "Wolfie" // -> "Field 'name' was changed."
}
