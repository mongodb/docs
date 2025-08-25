exports = async function updateCustomUserData(newCustomUserData) {
  const userId = context.user.id;
  const customUserDataCollection = context.services
    .get("mongodb-atlas")
    .db("custom-user-data-database")
    .collection("cpp-custom-user-data");

  const filter = { userId };
  // Replace the existing custom user data document with the new one.
  const update = { $set: newCustomUserData };
  // Insert document if it doesn't already exist
  const options = { upsert: true };

  const res = await customUserDataCollection.updateOne(filter, update, options);
  return res;
};
