realm.write(() {
  realm.addAll([
    Person(ObjectId(), 'Luke'),
    Person(ObjectId(), 'Leia'),
    Person(ObjectId(), 'Han'),
    Person(ObjectId(), 'Chewbacca')
  ]);
});

final alphabetizedPeople =
    realm.query<Person>('TRUEPREDICATE SORT(name ASC)');
for (var person in alphabetizedPeople) {
  print(person.name);
}
// prints 'Chewbacca', 'Han', 'Leia', 'Luke'
