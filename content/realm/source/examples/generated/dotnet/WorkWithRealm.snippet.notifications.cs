// Observe realm notifications.
realm.RealmChanged += (sender, eventArgs) =>
{
    // The "sender" object is the realm that has changed.
    // "eventArgs" is reserved for future use.
    // ... update UI ...
};
