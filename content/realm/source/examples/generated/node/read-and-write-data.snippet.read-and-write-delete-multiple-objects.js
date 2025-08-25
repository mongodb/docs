realm.write(() => {
  // Find dogs younger than 2 years old.
  const puppies = realm.objects("Dog").filtered("age < 2");
  // Delete the collection from the realm.
  realm.delete(puppies);
});
