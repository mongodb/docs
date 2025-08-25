do {
    let itemWithWrongOwner = Item()
    // The `ownerId` of this item does not match the `user.id` of the logged-in
    // user. The user does not have permissions to make this write, so
    // it triggers a compensating write.
    itemWithWrongOwner.ownerId = "This string does not match the user.id"
    itemWithWrongOwner.itemName = "Write code that generates a permission error"
    itemWithWrongOwner.complexity = 1
    try realm.write {
        realm.add(itemWithWrongOwner)
    }
} catch {
    print("Failed to write to realm: \(error.localizedDescription)")
}
