var config = {
  schema: [Cat], // predefined schema
  sync: {
    user: app.currentUser,
    partitionValue: "MyPartitionValue",
  },
};
// Open a realm with a configuration object that has a SyncConfiguration
// A SyncConfiguration requires both a logged-in user and a partition value
let realm = await Realm.open(config);


// start a write transaction
let darukCat;
realm.write(() => {
  // get a cat from the database to update
  darukCat = realm.objects("Cat").filtered("name = 'Daruk")[0];
  // change the cat's name
  darukCat.name = "Daruk Goron";
}); // when the transaction completes, the cat's name is updated in the database
// and synced to the connected Realm App

