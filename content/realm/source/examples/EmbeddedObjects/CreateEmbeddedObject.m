RLMRealm *realm = [RLMRealm defaultRealm];
[realm transactionWithBlock:^{
    Address *address = [[Address alloc] init];
    address.street = @"123 Fake St.";
    address.city = @"Springfield";
    address.country = @"USA";
    address.postalCode = @"90710";
    
    Contact *contact = [Contact contactWithName:@"Nick Riviera"];
    
    // Assign the embedded object property
    contact.address = address;

    [realm addObject:contact];
    
    NSLog(@"Added contact: %@", contact);
}];
