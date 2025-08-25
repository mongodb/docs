RealmResults<Frog> frogs = realm.where(Frog.class)
        .equalTo("species", "bullfrog")
        .findAll();

// Use an iterator to rename the species of all bullfrogs
realm.executeTransaction(r -> {
    for (Frog frog : frogs) {
        frog.setSpecies("Lithobates catesbeiana");
    }
});

// Use a snapshot to rename the species of all bullfrogs
realm.executeTransaction(r -> {
    OrderedRealmCollectionSnapshot<Frog> frogsSnapshot = frogs.createSnapshot();
    for (int i = 0; i < frogsSnapshot.size(); i++) {
        frogsSnapshot.get(i).setSpecies("Lithobates catesbeiana");
    }
});

