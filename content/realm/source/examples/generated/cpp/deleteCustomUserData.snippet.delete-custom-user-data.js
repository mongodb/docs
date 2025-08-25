exports = async function deleteCustomUserData() {
  const userId = context.user.id;
  const customUserDataCollection = context.services
    .get("mongodb-atlas")
    .db("custom-user-data-database")
    .collection("cpp-custom-user-data");

  const filter = { userId };

  const res = await customUserDataCollection.deleteOne(filter);
  return res;
};
