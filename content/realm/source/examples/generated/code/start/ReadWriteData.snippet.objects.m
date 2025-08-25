RLMRealm *realm = [RLMRealm defaultRealm];

RLMResults *dogs = [Dog allObjectsInRealm:realm];
RLMResults *people = [Person allObjectsInRealm:realm];
