let realm = try! Realm()

try! realm.write {
    // Delete all objects from the realm.
    realm.deleteAll()
}
