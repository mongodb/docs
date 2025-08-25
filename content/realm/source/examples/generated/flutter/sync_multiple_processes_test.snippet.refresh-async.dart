// Asynchronously refresh the realm in the background.
await realm.refreshAsync();
final john = realm.find<Person>('John');
