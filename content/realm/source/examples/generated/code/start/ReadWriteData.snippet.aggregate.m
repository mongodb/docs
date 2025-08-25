RLMRealm *realm = [RLMRealm defaultRealm];

RLMResults *people = [Person allObjectsInRealm:realm];

// People whose dogs' average age is 5
[people objectsWhere:@"dogs.@avg.age == 5"];

// People with older dogs
[people objectsWhere:@"dogs.@min.age > 5"];

// People with younger dogs
[people objectsWhere:@"dogs.@max.age < 2"];

// People with many dogs
[people objectsWhere:@"dogs.@count > 2"];

// People whose dogs' ages combined > 10 years
[people objectsWhere:@"dogs.@sum.age > 10"];
