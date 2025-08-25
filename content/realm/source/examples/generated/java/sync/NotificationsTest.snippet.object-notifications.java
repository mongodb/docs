// Create a dog in the realm.
AtomicReference<Dog> dog = new AtomicReference<Dog>();
realm.executeTransaction(transactionRealm -> {
    dog.set(transactionRealm.createObject(Dog.class, new ObjectId()));
    dog.get().setName("Max");
});

// Set up the listener.
RealmObjectChangeListener<Dog> listener = (changedDog, changeSet) -> {
    if (changeSet.isDeleted()) {
        Log.i("EXAMPLE", "The dog was deleted");
        return;
    }
    for (String fieldName : changeSet.getChangedFields()) {
        Log.i("EXAMPLE", "Field '" + fieldName + "' changed.");
    }
};

// Observe object notifications.
dog.get().addChangeListener(listener);

// Update the dog to see the effect.
realm.executeTransaction(r -> {
    dog.get().setName("Wolfie"); // -> "Field 'name' was changed."
});
