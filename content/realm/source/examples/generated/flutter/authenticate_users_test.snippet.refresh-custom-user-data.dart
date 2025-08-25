// refreshCustomData() returns the updated custom data object
final updatedCustomData = await user.refreshCustomData();

// Now when you access User.customData it's the value
// returned from User.refreshCustomData()
