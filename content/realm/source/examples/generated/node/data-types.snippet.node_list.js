const PetOwnerSchema = {
  name: "PetOwner",
  primaryKey: "_id",
  properties: {
    _id: "objectId",
    person: "Person",
    pets: {
      type: "list",
      objectType: "string", // this could also be a Realm object:
      // objectType: "Pet",
      optional: false, //null values are not allowed
    },
  },
};
