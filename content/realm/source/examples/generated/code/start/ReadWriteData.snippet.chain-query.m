RLMRealm *realm = [RLMRealm defaultRealm];
RLMResults<Dog *> *tanDogs = [Dog objectsInRealm:realm where:@"color = 'tan'"];
RLMResults<Dog *> *tanDogsWithBNames = [tanDogs objectsWhere:@"name BEGINSWITH 'B'"];
