import Realm from "realm";
const Cat = {
  name: "Cat",
  properties: {
    _id: "objectId",
    name: "string",
    age: "int",
    type: "string",
  },
};
// open a local realm with the 'Cat' schema
const realm = await Realm.open({
  schema: [Cat],
});
