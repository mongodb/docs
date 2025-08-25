const myObject = realm.write(() => {
    return realm.create( myClass, { nullableCounter: 0 } );
});

const myID = myObject._id

realm.write(() => {
    realm.create( myClass, { _id: myID, nullableCounter: null }, UpdateMode.Modified );
});

realm.write(() => {
    realm.create( myClass, { _id: myID, nullableCounter: 0 }, UpdateMode.Modified );
});
