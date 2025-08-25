// insert a cat into the database
let aliceCat;
realm.write(() => {
  aliceCat = realm.create("Cat", {
    _id: new BSON.ObjectID(),
    name: "Alice",
    age: 14,
    type: "Calico",
  });
});
// create a listener that logs new changes to the cat
aliceCat.addListener((obj, changes) => {
  changes.changedProperties.forEach((changedProperty) => {
    console.log(
      `${obj.name}'s ${changedProperty} was altered to be ${obj[changedProperty]}`
    ); // This should log "Alice's age was altered to be 15"
  });
});
// update the cat
realm.write(() => {
  aliceCat.age = 15;
});

