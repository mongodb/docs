AtomicReference<Frog> frog = new AtomicReference<Frog>();
realm.executeTransaction(r -> {
        frog.set(realm.createObject(Frog.class));
        frog.get().setName("Jonathan Livingston Applesauce");
});

RealmObjectChangeListener<Frog> objectChangeListener =
        new RealmObjectChangeListener<Frog>() {
    @Override
    public void onChange(@NotNull Frog frog, @Nullable ObjectChangeSet changeSet) {
        if (changeSet != null) {
            Log.v("EXAMPLE", "Changes to fields: " +
                    Arrays.toString(changeSet.getChangedFields()));
            if (changeSet.isFieldChanged("best_friend")) {
                Log.v("EXAMPLE", "RealmAny best friend field changed to : " +
                        frog.bestFriendToString());
            }
        }
    }
};

frog.get().addChangeListener(objectChangeListener);

realm.executeTransaction(r -> {
    // set RealmAny field to a null value
    frog.get().setBestFriend(RealmAny.nullValue());
    Log.v("EXAMPLE", "Best friend: " + frog.get().bestFriendToString());

    // set RealmAny field to a string with RealmAny.valueOf a string value
    frog.get().setBestFriend(RealmAny.valueOf("Greg"));

});
