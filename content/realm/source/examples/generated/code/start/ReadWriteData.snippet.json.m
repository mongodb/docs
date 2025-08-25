// Specify a dog toy in JSON
NSData *data = [@"{\"name\": \"Tennis ball\"}" dataUsingEncoding: NSUTF8StringEncoding];
RLMRealm *realm = [RLMRealm defaultRealm];

// Insert from NSData containing JSON
[realm transactionWithBlock:^{
    id json = [NSJSONSerialization JSONObjectWithData:data options:0 error:NULL];
    [DogToy createInRealm:realm withValue:json];
}];
