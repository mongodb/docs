// The complexity of this item is `7`. This is outside the bounds
// of the subscription query, which triggers a compensating write.
val itemTooComplex = Item().apply {
    ownerId = user.id
    itemName = "This item is too complex"
    complexity = 7
}
syncRealm.write {
    copyToRealm(itemTooComplex)
}
