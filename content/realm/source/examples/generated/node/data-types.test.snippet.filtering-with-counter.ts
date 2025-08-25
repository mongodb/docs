const belowThreshold = realm.write(() => {
    return realm.create( myClass, { myCounter: 0 } );
});

const atThreshold = realm.write(() => {
    return realm.create( myClass, { myCounter: 1 } );
});

const aboveThreshold = realm.write(() => {
    return realm.create( myClass, { myCounter: 2 } );
});

const allObjects = realm.objects('myClass');

let filteredObjects = allObjects.filtered('counter >= $0', atThreshold.myCounter.value);
