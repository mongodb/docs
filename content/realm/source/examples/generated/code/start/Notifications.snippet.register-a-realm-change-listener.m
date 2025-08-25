RLMRealm *realm = [RLMRealm defaultRealm];

// Observe realm notifications. Keep a strong reference to the notification token
// or the observation will stop.
RLMNotificationToken *token = [realm addNotificationBlock:^(RLMNotification  _Nonnull notification, RLMRealm * _Nonnull realm) {
    // `notification` is an enum specifying what kind of notification was emitted.
    // ... update UI ...
}];

// ...

// Later, explicitly stop observing.
[token invalidate];
