RLMRealm *realm = [RLMRealm defaultRealm];

// Establish a relationship
Dog *dog = [[Dog alloc] init];
dog.name = @"Rex";
dog.age = 10;

Person *person = [[Person alloc] init];
person._id = 12345;
[person.dogs addObject:dog];

[realm transactionWithBlock:^() {
    [realm addObject:person];
}];

// Later, query the specific person
Person *specificPerson = [Person objectForPrimaryKey:@12345];

// Access directly through a relationship
NSLog(@"# dogs: %lu", [specificPerson.dogs count]);
NSLog(@"First dog's name: %@", specificPerson.dogs[0].name);
