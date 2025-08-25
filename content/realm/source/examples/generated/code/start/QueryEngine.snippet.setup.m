RLMRealm *realm = [RLMRealm defaultRealm];
[realm transactionWithBlock:^() {
    // Add projects and tasks here
}];

RLMResults *tasks = [Task allObjectsInRealm:realm];
RLMResults *projects = [Project allObjectsInRealm:realm];
