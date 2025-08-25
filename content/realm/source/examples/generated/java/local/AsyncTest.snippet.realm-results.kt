val items = realm.where<Item>().findAllAsync()
// length of items is zero when initially returned
items.addChangeListener(RealmChangeListener {
    Log.v("EXAMPLE", "Completed the query.")
    // items results now contains all matched objects (more than zero)
})
