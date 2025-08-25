// The `ownerId` of this item does not match the user ID of the logged-in
// user. The user does not have permissions to make this write, which
// triggers a compensating write.
auto itemWithWrongOwner = realm::Item{
    .ownerId = "not the current user",
    .itemName = "Trigger an incorrect permissions compensating write",
    .complexity = 1};

syncRealm.write([&] { syncRealm.add(std::move(itemWithWrongOwner)); });
