[realm transactionWithBlock:^() {
    // Delete Ali's dogs.
    [realm deleteObjects:[ali dogs]];
    // Delete Ali.
    [realm deleteObject:ali];
}];
