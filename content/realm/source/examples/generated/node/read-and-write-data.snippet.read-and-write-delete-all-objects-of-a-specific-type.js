realm.write(() => {
  // Delete all instances of Cat from the realm.
  realm.delete(realm.objects("Cat"));
});
