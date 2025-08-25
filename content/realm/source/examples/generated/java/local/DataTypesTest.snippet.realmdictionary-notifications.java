AtomicReference<Frog> frog = new AtomicReference<Frog>();
realm.executeTransaction(r -> {
    frog.set(realm.createObject(Frog.class));
    frog.get().setName("Jonathan Livingston Applesauce");
});

MapChangeListener<String, Frog> mapChangeListener =
    new MapChangeListener<String, Frog>() {
        @Override
        public void onChange(RealmMap<String, Frog> map,
                             MapChangeSet<String> changes) {
            for (String insertion : changes.getInsertions()) {
                Log.v("EXAMPLE",
                        "Inserted key:  " + insertion +
                                ", Inserted value: " + map.get(insertion).getName());
            }
        }
    };

frog.get().getNicknamesToFriends().addChangeListener(mapChangeListener);

realm.executeTransaction(r -> {
    // get the RealmDictionary field from the object we just created
    RealmDictionary<Frog> dictionary = frog.get().getNicknamesToFriends();

    // add key/value to the dictionary
    Frog wirt = realm.createObject(Frog.class);
    wirt.setName("Wirt");
    dictionary.put("tall frog", wirt);

    // add multiple keys/values to the dictionary
    Frog greg = realm.createObject(Frog.class);
    greg.setName("Greg");
    Frog beatrice = realm.createObject(Frog.class);
    beatrice.setName("Beatrice");
    dictionary.putAll(Map.of("small frog", greg, "feathered frog", beatrice));

});
