RLMRealm *realm = [RLMRealm defaultRealm];

RLMResults *dogs = [Dog allObjectsInRealm:realm];

// Sort dogs by name
RLMResults *dogsSorted = [dogs sortedResultsUsingKeyPath:@"name" ascending:NO];

// You can also sort on the members of linked objects. In this example,
// we sort the dogs by their favorite toys' names.
RLMResults *dogsSortedByFavoriteToyName = [dogs sortedResultsUsingKeyPath:@"favoriteToy.name" ascending:YES];
