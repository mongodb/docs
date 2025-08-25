// Open the default realm.
RLMRealm *realm = [RLMRealm defaultRealm];

// Open a thread-safe transaction.
[realm transactionWithBlock:^() {
    // ... Make changes ...
    // Realm automatically cancels the transaction in case of exception.
    // Otherwise, Realm automatically commits the transaction at the
    // end of the code block.
}];
