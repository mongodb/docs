// all items in the realm
val items: RealmResults<Item> = realm.query<Item>().find()
