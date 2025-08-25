RLMRealm *realm = [RLMRealm defaultRealm];

[realm transactionWithBlock:^() {
    // Delete all objects from the realm.
    [realm deleteAllObjects];
}];
