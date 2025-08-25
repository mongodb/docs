// After moving the bundled realm to the appropriate location for your app's platform,
// open and use the bundled realm as usual.
val copiedRealm = Realm.open(copyConfig)

// This should contain the same Items as in the asset realm
val copiedItems: RealmResults<Item> = copiedRealm.query<Item>().find()
for(item in copiedItems) {
    Log.v("Item in the copiedRealm: ${item.summary}")
}

copiedRealm.close()
