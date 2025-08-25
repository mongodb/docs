RealmResults<Item> items = realm.where(Item.class).findAllAsync();
// length of items is zero when initially returned
items.addChangeListener(new RealmChangeListener<RealmResults<Item>>() {
    @Override
    public void onChange(RealmResults<Item> items) {
        Log.v("EXAMPLE", "Completed the query.");
        // items results now contains all matched objects (more than zero)
    }
});
