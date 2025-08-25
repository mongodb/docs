// Tasks have an inverse relationship to Users
final inCompleteTasks = realm.query<Task>("isComplete == false");

// Find all Users who have an incomplete Task
for (final task in inCompleteTasks) {
  final ownersWithIncompleteTasks = task.getBacklinks<User>('tasks');
  for (final user in ownersWithIncompleteTasks) {
    print("User ${user.username} has incomplete tasks.");
  }
}
