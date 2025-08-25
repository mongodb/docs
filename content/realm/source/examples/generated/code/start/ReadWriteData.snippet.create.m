// Get the default realm.
// You only need to do this once per thread.
RLMRealm *realm = [RLMRealm defaultRealm];

// Instantiate the class.
Dog *dog = [[Dog alloc] init];
dog.name = @"Max";
dog.age = 5;

// Open a thread-safe transaction.
[realm transactionWithBlock:^() {
    // Add the instance to the realm.
    [realm addObject:dog];
}];
