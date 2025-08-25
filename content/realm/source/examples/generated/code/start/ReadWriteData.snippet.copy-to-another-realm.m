RLMRealmConfiguration *configuration = [RLMRealmConfiguration defaultConfiguration];
configuration.inMemoryIdentifier = @"first realm";
RLMRealm *realm = [RLMRealm realmWithConfiguration:configuration error:nil];

[realm transactionWithBlock:^{
    Dog *dog = [[Dog alloc] init];
    dog.name = @"Wolfie";
    dog.age = 1;
    [realm addObject:dog];
}];

// Later, fetch the instance we want to copy
Dog *wolfie = [[Dog objectsInRealm:realm where:@"name == 'Wolfie'"] firstObject];

// Open the other realm
RLMRealmConfiguration *otherConfiguration = [RLMRealmConfiguration defaultConfiguration];
otherConfiguration.inMemoryIdentifier = @"second realm";
RLMRealm *otherRealm = [RLMRealm realmWithConfiguration:otherConfiguration error:nil];
[otherRealm transactionWithBlock:^{
    // Copy to the other realm
    Dog *wolfieCopy = [[wolfie class] createInRealm:otherRealm withValue:wolfie];
    wolfieCopy.age = 2;
    
    // Verify that the copy is separate from the original
    XCTAssertNotEqual(wolfie.age, wolfieCopy.age);
}];
