AtomicReference<Frog> frog = new AtomicReference<Frog>();
realm.executeTransaction(r -> {
    frog.set(realm.createObject(Frog.class));
    frog.get().setName("Jonathan Livingston Applesauce");
});

SetChangeListener<Snack> setChangeListener = new SetChangeListener<Snack>() {
    @Override
    public void onChange(@NotNull RealmSet<Snack> set, SetChangeSet changes) {
        Log.v("EXAMPLE", "Set changed: " +
                changes.getNumberOfInsertions() + " new items, " +
                changes.getNumberOfDeletions() + " items removed.");
    }
};
frog.get().getFavoriteSnacks().addChangeListener(setChangeListener);

realm.executeTransaction(r -> {
    // get the RealmSet field from the object we just created
    RealmSet<Snack> set = frog.get().getFavoriteSnacks();

    // add value to the RealmSet
    Snack flies = realm.createObject(Snack.class);
    flies.setName("flies");
    set.add(flies);

    // add multiple values to the RealmSet
    Snack water = realm.createObject(Snack.class);
    water.setName("water");
    Snack verySmallRocks = realm.createObject(Snack.class);
    verySmallRocks.setName("verySmallRocks");
    set.addAll(Arrays.asList(water, verySmallRocks));

});
