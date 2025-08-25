RLMRealm *realm = [RLMRealm defaultRealm];
[realm transactionWithBlock:^{
    // Only update the provided values.
    // Note that the "name" property will remain the same
    // for the person with primary key "_id" 123.
    [Person createOrUpdateModifiedInRealm:realm
        withValue:@{@"_id": @123, @"dogs": @[@[@"Buster", @5]]}];
}];
