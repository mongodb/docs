// Instead of using pre-existing dogs...
Person *aPerson = [[Person alloc]
    initWithValue:@[@123, @"Jane", @[aDog, anotherDog]]];

// ...we can create them inline
Person *anotherPerson = [[Person alloc]
    initWithValue:@[@123, @"Jane", @[@[@"Buster", @5], @[@"Buddy", @6]]]];
