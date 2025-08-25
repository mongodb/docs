// (1) Create a Dog object from a dictionary
Dog *myDog = [[Dog alloc] initWithValue:@{@"name" : @"Pluto", @"age" : @3}];

// (2) Create a Dog object from an array
Dog *myOtherDog = [[Dog alloc] initWithValue:@[@"Pluto", @3]];

RLMRealm *realm = [RLMRealm defaultRealm];

// Add to the realm with transaction
[realm transactionWithBlock:^() {
    [realm addObject:myDog];
    [realm addObject:myOtherDog];
}];
