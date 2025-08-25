RLMRealm *realm = [RLMRealm defaultRealm];

// Access all dogs in the realm
RLMResults *dogs = [Dog allObjectsInRealm:realm];

// Filter by age
RLMResults *puppies = [dogs objectsWhere:@"age < 2"];

// Filter by favorite toy
RLMResults *dogsWithoutFavoriteToy = [dogs objectsWhere:@"favoriteToy == nil"];

// Filter by favorite toy's name
RLMResults *dogsWhoLikeTennisBalls = [dogs objectsWhere:@"favoriteToy.name == %@", @"Tennis ball"];
