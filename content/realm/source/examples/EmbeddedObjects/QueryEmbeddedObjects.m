RLMRealm *realm = [RLMRealm defaultRealm];
RLMResults<Contact *> *losAngelesContacts = [Contact objectsInRealm:realm where:@"address.city = %@", @"Los Angeles"];

losAngelesContacts = [losAngelesContacts sortedResultsUsingKeyPath:@"address.street" ascending:YES]; 
NSLog(@"Los Angeles Contacts: %@", losAngelesContacts);
