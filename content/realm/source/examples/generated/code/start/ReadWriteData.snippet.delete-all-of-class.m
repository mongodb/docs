RLMRealm *realm = [RLMRealm defaultRealm];

[realm transactionWithBlock:^() {
    // Delete all instances of Dog from the realm.
    RLMResults<Dog *> *allDogs = [Dog allObjectsInRealm:realm];
    [realm deleteObjects:allDogs];
}];
