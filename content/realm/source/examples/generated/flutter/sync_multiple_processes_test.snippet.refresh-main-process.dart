// Add object in one process
realm.write(() {
  realm.add(Person('John'));
});
