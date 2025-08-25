RLMRealm *realm = [RLMRealm defaultRealm];

// Establish a relationship
Person *person = [[Person alloc] init];
person._id = 12345;

DogClub *club = [[DogClub alloc] init];
club.name = @"Pooch Pals";
[club.members addObject:person];

[realm transactionWithBlock:^() {
    [realm addObject:club];
}];

// Later, query the specific person
Person *specificPerson = [Person objectForPrimaryKey:@12345];
    
// Access directly through an inverse relationship
NSLog(@"# memberships: %lu", [specificPerson.clubs count]);
NSLog(@"First club's name: %@", [specificPerson.clubs[0] name]);
