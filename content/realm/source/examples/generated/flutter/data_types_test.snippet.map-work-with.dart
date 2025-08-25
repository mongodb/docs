final realm = Realm(Configuration.local([MapExample.schema]));

// Pass native Dart Maps to the object to create RealmMaps
final mapExample = MapExample(
  map: {
    'first': 1,
    'second': 2,
    'third': 3,
  },
  nullableMap: {
    'first': null,
    'second': 2,
    'third': null,
  },
);
// Add RealmObject to the database
realm.write(() => realm.add(mapExample));

// Once you add maps, they are of type RealmMap
RealmMap map = mapExample.map;

// Modify RealmMaps in write transactions
realm.write(() {
  // Update value by key with .update() or [value] = newValue
  mapExample.nullableMap['second'] = null;
  mapExample.map.update('first', (value) => 5);
  mapExample.nullableMap.update('fourth', (v) => 4, ifAbsent: () => null);

  // Add a new map entry with .addEntries()
  const newMap = {'fourth': 4};
  mapExample.map.addEntries(newMap.entries);
});

// Check a RealmMap with .containsKey() or .containsValue()
if (mapExample.map.containsKey('first')) {
  print('Map contains key "first"');
} else if (mapExample.map.containsValue(null)) {
  print('Map contains null value');
} else {
  print('These aren\'t the maps you\'re looking for');
}

// Get a RealmMap by property name with dynamic.getMap()
final getPrimitiveMap = mapExample.dynamic.getMap('map');

// Check the number of elements in a RealmMap with RealmMap.length
print(
    'Map contains ${getPrimitiveMap.length} elements'); // Prints 'Map contains 4 elements'

// Query RealmMaps using Realm Query Language
final results = realm.query<MapExample>('map.first == \$0', [5]);
