RLMRealm *realm = [RLMRealm defaultRealm];
[realm transactionWithBlock:^{
    Person *jones = [[Person alloc] initWithValue:@{@"_id": @1234, @"name": @"Jones"}];
    // Add a new person to the realm. Since nobody with ID 1234
    // has been added yet, this adds the instance to the realm.
    [realm addOrUpdateObject:jones];
    
    Person *bowie = [[Person alloc] initWithValue:@{@"_id": @1234, @"name": @"Bowie"}];
    // Judging by the ID, it's the same person, just with a different name.
    // This overwrites the original entry (i.e. Jones -> Bowie).
    [realm addOrUpdateObject:bowie];
}];
