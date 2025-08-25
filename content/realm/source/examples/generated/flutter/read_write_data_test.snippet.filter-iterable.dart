final listOfNames = ['Luke', 'Leia'];
final matchingRealmObjects =
    realm.query<Person>('name IN \$0', [listOfNames]);
