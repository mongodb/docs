RLMRealm *realm = [RLMRealm defaultRealm];
[realm transactionWithBlock: ^{
    Contact *contact = [Contact objectInRealm:realm
                                forPrimaryKey:[[RLMObjectId alloc] initWithString:@"5f481c21f634a1f4eeaa7268" error:nil]];
    contact.address.street = @"Hollywood Upstairs Medical College";
    contact.address.city = @"Los Angeles";
    contact.address.postalCode = @"90210";
    NSLog(@"Updated contact: %@", contact);
}];
