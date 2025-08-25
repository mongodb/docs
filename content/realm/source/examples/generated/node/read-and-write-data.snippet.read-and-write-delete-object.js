realm.write(() => {
  // Delete the dog from the realm.
  realm.delete(dog);
  // Discard the reference.
  dog = null;
});
