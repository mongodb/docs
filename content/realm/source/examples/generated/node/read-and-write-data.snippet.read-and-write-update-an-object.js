// Open a transaction.
realm.write(() => {
  // Get a dog to update.
  const dog = realm.objects("Dog")[0];
  // Update some properties on the instance.
  // These changes are saved to the realm.
  dog.name = "Maximilian";
  dog.age += 1;
});
