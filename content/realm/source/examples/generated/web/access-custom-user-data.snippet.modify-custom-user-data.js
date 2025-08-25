// Get a client object for your app's custom user data collection
const mongo = app.currentUser.mongoClient(CLUSTER_NAME);
const collection = mongo.db(DATABASE_NAME).collection(COLLECTION_NAME);

// Log the user's favorite color before we change it
console.log(
  "old favoriteColor: ",
  app.currentUser.customData.favoriteColor
);

// Update the user's custom data document
await collection.updateOne(
  { userId: app.currentUser.id }, // Query for the user object of the logged in user
  { $set: { favoriteColor: "purple" } } // Set the logged in user's favorite color to purple
);
// Refresh the user's local customData property
await app.currentUser.refreshCustomData();

// Log the user's new favorite color
console.log(
  "new favoriteColor: ",
  app.currentUser.customData.favoriteColor
);
