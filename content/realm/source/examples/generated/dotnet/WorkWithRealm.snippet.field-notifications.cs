var query = realm.All<Person>();
KeyPathsCollection kpc;

// Use one of these equivalent declarations to 
// specify the fields you want to monitor for changes:

kpc = KeyPathsCollection.Of("Email", "Name");
kpc = new List<KeyPath> {"Email", "Name"};

// To get all notifications for top-level properties
// and 4 nested levels of properties, use the `Full` 
// static value:

kpc = KeyPathsCollection.Full;

// To receive notifications for changes to the
// collection only and none of the properties,
// use the `Shallow` static value:

kpc = KeyPathsCollection.Shallow;

query.SubscribeForNotifications(notificationCallback, kpc);
