const myObject = realm.write(() => {
    return realm.create( myClass, { myCounter: 0 } );
});
