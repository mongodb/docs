// Per the Device Sync permissions, users can only read and write data
// where the `Item.ownerId` property matches their own user ID.
val userId = user.id
val newItem = Item().apply {
    ownerId = userId
    itemName = "This item meets sync criteria"
    complexity = 3
}

syncRealm.write {
    // `newItem` is successfully written to the realm and synced to Atlas
    // because its data matches the subscription query (complexity <= 4)
    // and its `ownerId` field matches the user ID.
    copyToRealm(newItem)
}
