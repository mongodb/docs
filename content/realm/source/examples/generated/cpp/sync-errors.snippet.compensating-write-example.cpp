// The complexity of this item is `7`. This is outside the bounds
// of the subscription query, which triggers a compensating write.
auto complexItem =
    realm::Item{._id = primaryKey,
                          .ownerId = user.identifier(),
                          .itemName = "Test compensating writes",
                          .complexity = 7};

// This should trigger a compensating write error when it tries to sync
// due to server-side permissions, which gets logged with the error handler.
syncRealm.write([&] { syncRealm.add(std::move(complexItem)); });
