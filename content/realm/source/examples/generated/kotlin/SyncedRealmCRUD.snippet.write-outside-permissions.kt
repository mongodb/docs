// The `ownerId` of this item does not match the `user.id` of the logged-in
// user. The user does not have permissions to make this write, which
// triggers a compensating write.
val itemWithWrongOwner = Item().apply {
    ownerId = "not the current user"
    itemName = "A simple item"
    complexity = 1
}
syncRealm.write {
    copyToRealm(itemWithWrongOwner)
}
