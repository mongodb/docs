// :snippet-start: write-custom-user-data
exports = async function writeCustomUserData(newCustomUserData) {
  const userId = context.user.id;
  const customUserDataCollection = context.services
    .get("mongodb-atlas")
    .db("custom-user-data-database")
    .collection("custom-user-data");

  const filter = { userId };
  // Replace the existing custom user data document with the new one
  const update = { $set: newCustomUserData };
  // Insert document if it doesn't already exist
  const options = { upsert: true };

  const res = await customUserDataCollection.updateOne(filter, update, options);
  return res;
};
// :snippet-end:

// :snippet-start: delete-custom-user-data
exports = async function deleteCustomUserData() {
  const userId = context.user.id;
  const customUserDataCollection = context.services
    .get("mongodb-atlas")
    .db("custom-user-data-database")
    .collection("custom-user-data");

  const filter = { userId };

  const res = await customUserDataCollection.deleteOne(filter);
  return res;
};
// :snippet-end: