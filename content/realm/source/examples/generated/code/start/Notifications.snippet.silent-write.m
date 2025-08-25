RLMRealm *realm = [RLMRealm defaultRealm];

// Observe realm notifications
RLMNotificationToken *token = [realm addNotificationBlock:^(RLMNotification  _Nonnull notification, RLMRealm * _Nonnull realm) {
    // ... handle update
}];

// Later, pass the token in an array to the realm's `-transactionWithoutNotifying:block:` method.
// Realm will _not_ notify the handler after this write.
[realm transactionWithoutNotifying:@[token] block:^{
   // ... write to realm
}];

// Finally
[token invalidate];
