realm.write(() {
  realm.addAll([
    Person(ObjectId(), 'Figrin D\'an'),
    Person(ObjectId(), 'Greedo'),
    Person(ObjectId(), 'Toro')
  ]);
});
