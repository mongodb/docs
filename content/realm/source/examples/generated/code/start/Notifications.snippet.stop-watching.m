RLMRealm *realm = [RLMRealm defaultRealm];

// Observe and obtain token
RLMNotificationToken *token = [realm addNotificationBlock:^(RLMNotification  _Nonnull notification, RLMRealm * _Nonnull realm) {
    /* ... */
}];

// Stop observing
[token invalidate];
