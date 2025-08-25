RLMRealm *realm = [RLMRealm defaultRealm];

[realm transactionWithBlock:^() {
    // Create a person to take care of some dogs.
    Person *ali = [[Person alloc] initWithValue:@{@"_id": @1, @"name": @"Ali"}];
    [realm addObject:ali];

    // Find dogs younger than 2.
    RLMResults<Dog *> *puppies = [Dog objectsInRealm:realm where:@"age < 2"];

    // Batch update: give all puppies to Ali.
    [ali setValue:puppies forKey:@"dogs"];
}];
