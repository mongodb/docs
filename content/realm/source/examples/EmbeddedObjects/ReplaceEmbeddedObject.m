RLMRealm *realm = [RLMRealm defaultRealm];
[realm transactionWithBlock: ^{
    Contact *contact = [Contact objectInRealm:realm
                                forPrimaryKey:[[RLMObjectId alloc] initWithString:@"5f481c21f634a1f4eeaa7268" error:nil]];
    Address *newAddress = [[Address alloc] init];
    newAddress.street = @"Hollywood Upstairs Medical College";
    newAddress.city = @"Los Angeles";
    newAddress.country = @"USA";
    newAddress.postalCode = @"90210";
    contact.address = newAddress;
    NSLog(@"Updated contact: %@", contact);
}];
