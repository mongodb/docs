[realm transactionWithBlock:^() {
    // Delete the instance from the realm.
    [realm deleteObject:dog];
}];
