// Per the Device Sync permissions, users can only read and write data
// where the `Item.ownerId` property matches their own user ID.
auto simpleItem =
    realm::Item{.ownerId = user.identifier(),
                          .itemName = "This item meets sync criteria",
                          .complexity = 3};

// `simpleItem` successfully writes to the realm and syncs to Atlas
// because its data matches the subscription query (complexity <= 4)
// and its `ownerId` field matches the user ID.
syncRealm.write([&] { syncRealm.add(std::move(simpleItem)); });
