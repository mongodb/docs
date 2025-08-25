realm.write(() {
  realm.addAll([
    Person(ObjectId(), 'Luke'),
    Person(ObjectId(), 'Luke'),
    Person(ObjectId(), 'Luke'),
    Person(ObjectId(), 'Luke')
  ]);
});

final limitedPeopleResults =
    realm.query<Person>('name == \$0 LIMIT(2)', ['Luke']);

// prints `2`
print(limitedPeopleResults.length);
