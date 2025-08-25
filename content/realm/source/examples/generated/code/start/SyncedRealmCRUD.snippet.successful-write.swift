// This write falls within the subscription query and complies
// with the Device Sync permissions, so this write should succeed.
do {
    let learnRealm = Item()
    learnRealm.ownerId = user.id
    learnRealm.itemName = "Learn Realm CRUD stuff"
    learnRealm.complexity = 3
    try realm.write {
        realm.add(learnRealm)
    }
} catch {
    print("Failed to write to realm: \(error.localizedDescription)")
}
