// Check the subscription count
CHECK(syncedRealm.subscriptions().size() == 1);

// Find a specific subscription by name
auto puppySubscription = *syncedRealm.subscriptions().find("puppies");
CHECK(puppySubscription.name == "puppies");

// Get information about the subscription
CHECK(puppySubscription.object_class_name == "Dog");
CHECK(puppySubscription.query_string == "age < 3");
