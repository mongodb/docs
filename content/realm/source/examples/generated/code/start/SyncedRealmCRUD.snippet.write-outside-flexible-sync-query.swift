do {
    let fixTheBug = Item()
    fixTheBug.ownerId = user.id
    fixTheBug.itemName = "Fix the bug with the failing method"
    // The complexity of this item is `7`. This is outside the bounds
    // of the subscription query, so this write triggers a compensating write.
    fixTheBug.complexity = 7
    try realm.write {
        realm.add(fixTheBug)
    }
} catch {
    print("Failed to write to realm: \(error.localizedDescription)")
}
