const { UUID } = Realm.BSON;
const ProfileSchema = {
  name: "Profile",
  primaryKey: "_id",
  properties: {
    _id: "uuid",
    name: "string",
  },
};

const realm = await Realm.open({
  path: "realm-files/data-type-realm",
  schema: [ProfileSchema],
});

realm.write(() => {
  realm.create("Profile", {
    name: "John Doe.",
    _id: new UUID(), // create a _id with a randomly generated UUID
  });
  realm.create("Profile", {
    name: "Tim Doe.",
    _id: new UUID("882dd631-bc6e-4e0e-a9e8-f07b685fec8c"), // create a _id with a specific UUID value
  });
});
