realm.write(() {
  realm.add(RealmValueCollectionExample(
      // Set the RealmValue as a map of mixed data
      singleAnyValue: RealmValue.from({
    'int': 1,
    // You can nest RealmValues in collections
    'listOfInt': [2, 3, 4],
    'mapOfStrings': {'1': 'first', '2': 'second'},
    // You can also nest collections within collections
    'mapOfMaps': [
      {
        'nestedMap_1': {'1': 1, '2': 2},
        'nestedMap_2': {'3': 3, '4': 4}
      }
    ],
    'listOfMaps': [
      {
        'nestedList_1': [1, 2, 3],
        'nestedList_2': [4, 5, 6]
      }
    ]
  })));
