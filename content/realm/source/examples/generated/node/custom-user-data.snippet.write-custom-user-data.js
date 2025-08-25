// A user must be logged in to use a mongoClient
const user = app.currentUser;
const mongo = user.mongoClient("mongodb-atlas");
const collection = mongo.db("custom-user-data-database").collection("custom-user-data");

// Query for the user object of the logged in user
const filter = { userId: user.id};
// Set the logged in user's favorite color to pink
const update = { $set: { favoriteColor: "pink" }};
// Insert document if it doesn't already exist
const options = { upsert: true };

const result = await collection.updateOne(filter, update, options);
