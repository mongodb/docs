// If there is a logged in user, pass the user ID as the
// partitionValue to the view that opens a realm.
OpenPartitionBasedSyncRealmView().environment(\.partitionValue, user.id)
